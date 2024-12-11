"use server";
import { createCandidateAction } from "./createCandidateAction";
import { processDocumentAction } from "./processDocumentAction";
import {
  chatGPTCandidateResponse,
  compatibilityResponse,
} from "./chatGPTCandidateResponse";
import { checkJob } from "./processDocumentAction";
import { getText } from "./processDocumentAction";
import { fetchProcessDetails } from "./fetchProcessDetails";
import { DocumentResponse } from "./processDocumentAction";

interface CompatibilityResponse {
  evaluacion?: {
    coincidencias?: {
      habilidades?: string;
      soft_skills?: string;
    };
    faltas?: string[];
    puntuacion_general?: number;
  };
  preguntas_rrhh?: string[];
}

export const handleCreateCandidate = async (
  formData: FormData,
  actualRoute: string
) => {
  // Extrae el process_id de la URL
  const routeSegments = actualRoute.split("/");
  const processId = parseInt(routeSegments[2], 10); // el proceso se encuentra en la tercera parte de la URL

  // Verifica si se obtuvo correctamente el process_id
  if (!processId) {
    return {
      message:
        "No se encontró el process_id, no se puede asociar el candidato al proceso.",
      route: actualRoute,
      statusCode: 500,
    };
  }

  // Obtener vacante
  let vacante;
  try {
    vacante = await fetchProcessDetails(processId);
    console.log("Vacante==== :", vacante);
    if (!vacante || !vacante.jobOfferDescription) {
      return {
        message: "No se pudo obtener la descripción de la vacante.",
        route: actualRoute,
        statusCode: 500,
      };
    }
  } catch (error) {
    console.error("Error al obtener los detalles del proceso:", error);
    return {
      message: "Error al obtener los detalles del proceso.",
      route: actualRoute,
      statusCode: 500,
    };
  }

  // Procesa el archivo antes de llamar a `createCandidateAction`
  const file = formData.get("cv"); // Obtén el archivo del FormData

  if (!file || !(file instanceof File)) {
    return {
      message: "Archivo no proporcionado o inválido",
      route: actualRoute,
      statusCode: 500,
    };
  }
  console.log("Archivo recibido:", file);

  // Llama al procesamiento del archivo
  const documentResponse: DocumentResponse | null = await processDocumentAction(
    file
  );

  console.log("Respuesta de processDocumentAction:", documentResponse);
  console.log(documentResponse?.id);

  console.log(documentResponse?.status);

  if (!documentResponse || documentResponse.status === "ERROR") {
    return {
      message: "Error al procesar el archivo o ID de transcripción no válido.",
      route: actualRoute,
      statusCode: 500,
    };
  }

  function cleanGeneratedHtml(generatedText: string) {
    return generatedText
      .replace(/^```html\n/, "") // Elimina la etiqueta de apertura
      .replace(/\n```$/, ""); // Elimina la etiqueta de cierre
  }

  // Esperar hasta que el estado no sea 'PENDING'
  let respuestaJob: DocumentResponse | null = documentResponse;
  while (respuestaJob?.status === "PENDING") {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5 segundos antes de verificar de nuevo
    respuestaJob = await checkJob(documentResponse?.id);
    if (!respuestaJob) {
      console.error("No se pudo obtener una respuesta válida del trabajo.");
      return {
        message: "Error al verificar el estado del documento.",
        route: actualRoute,
        statusCode: 500,
      };
    }
    console.log("Verificando estado del documento:", respuestaJob);
  }

  if (respuestaJob?.status === "ERROR") {
    return {
      message: `Error al procesar el documento: ${respuestaJob?.error_message}`,
      route: actualRoute,
      statusCode: 500,
    };
  }

  let resultadoTextoHTML: { text: string } | null = null;
  let resultadoEstandarizado: string | null = null;
  let resultadoCompatibilidad: CompatibilityResponse | null = null;
  let cleanedHtml: string | null = null;
  let compatibilidadTexto: string | null = null;
  if (respuestaJob?.status === "SUCCESS") {
    // Comunicación para obtener la transcripción en texto
    const textoHTMLResult = await getText(respuestaJob?.id);
    if (
      typeof textoHTMLResult === "object" &&
      textoHTMLResult !== null &&
      "text" in textoHTMLResult
    ) {
      resultadoTextoHTML = textoHTMLResult as { text: string };
    }

    //Comunicación con chatGPT para obtener respuesta de valor para RH
    if (resultadoTextoHTML?.text) {
      const estandarizadoResult = await chatGPTCandidateResponse(
        resultadoTextoHTML.text
      );
      if (typeof estandarizadoResult === "string") {
        resultadoEstandarizado = estandarizadoResult;
      }
    } else {
      console.error(
        "resultadoTextoHTML.text es undefined, no se puede continuar."
      );
      return {
        message: "No se pudo obtener el texto del CV.",
        route: actualRoute,
        statusCode: 500,
      };
    }

    // Compatibilidad del candidato con la vacante
    const compatibilidadResult = await compatibilityResponse(
      resultadoTextoHTML?.text,
      vacante.jobOfferDescription
    );
    if (typeof compatibilidadResult === "string") {
      compatibilidadTexto = compatibilidadResult
        .replace(/^```json\n/, "")
        .replace(/\n```$/, "");
    } else if (
      compatibilidadResult &&
      typeof compatibilidadResult === "object" &&
      "error" in compatibilidadResult
    ) {
      console.error(
        "Error en la respuesta de compatibilidad:",
        compatibilidadResult.error
      );
      return {
        message: "Error en la compatibilidad con la vacante.",
        route: actualRoute,
        statusCode: 500,
      };
    } else {
      console.error(
        "No se pudo obtener una respuesta de compatibilidad válida."
      );
      return {
        message: "No se pudo obtener la compatibilidad del candidato.",
        route: actualRoute,
        statusCode: 500,
      };
    }

    if (compatibilidadTexto) {
      try {
        resultadoCompatibilidad = JSON.parse(compatibilidadTexto);
      } catch (error) {
        console.error("Error al analizar JSON de compatibilidad:", error);
        return {
          message: "Error al analizar la respuesta de compatibilidad.",
          route: actualRoute,
          statusCode: 500,
        };
      }
    }
    console.log(
      "Comparación del CV con la vacante ===>",
      resultadoCompatibilidad
    );

    if (resultadoEstandarizado) {
      cleanedHtml = cleanGeneratedHtml(resultadoEstandarizado);
    } else {
      console.error("Resultado estandarizado es nulo.");
      return {
        message: "Error al limpiar el HTML generado.",
        route: actualRoute,
        statusCode: 500,
      };
    }
  }

  // **Se recupera respuestas del json devuelto por chatGPT**
  const interviewQuestions = JSON.stringify(
    resultadoCompatibilidad?.preguntas_rrhh || 0
  ).toString();

  // Preparar los datos para la creación del candidato y la asociación con el proceso
  if (cleanedHtml) {
    formData.append("jsongpt_text", cleanedHtml);
  } else {
    console.error("cleanedHtml es nulo.");
    return {
      message: "No se pudo agregar el texto procesado.",
      route: actualRoute,
      statusCode: 500,
    };
  }
  formData.append("process_id", processId.toString());
  formData.append(
    "technical_skills",
    resultadoCompatibilidad?.evaluacion?.coincidencias?.habilidades || ""
  );
  formData.append(
    "client_comments",
    Array.isArray(resultadoCompatibilidad?.evaluacion?.faltas)
      ? resultadoCompatibilidad.evaluacion.faltas.join(", ")
      : ""
  );
  formData.append(
    "match_percent",
    (resultadoCompatibilidad?.evaluacion?.puntuacion_general || 0).toString()
  );
  formData.append("interview_questions", interviewQuestions);
  const softSkills =
    resultadoCompatibilidad?.evaluacion?.coincidencias?.soft_skills ?? "";
  formData.append("soft_skills", softSkills);

  // Agrega candidatos a la base de datos
  const createResponse = await createCandidateAction(formData, processId);
  // Id del usuario para redirigir a editar ese candidato
  const idUser = createResponse?.result?.candidate?.id;
  // Ruta del edición del usuario
  const routeToRedirect = `/${routeSegments[1]}/${routeSegments[2]}/${idUser}/edit-candidate`;

  return {
    message: createResponse.message,
    route: routeToRedirect,
    statusCode: 200,
  };
};
