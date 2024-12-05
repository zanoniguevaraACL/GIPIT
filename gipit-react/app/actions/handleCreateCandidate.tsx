"use server";
import { createCandidateAction } from "./createCandidateAction";
import { processDocumentAction } from "./processDocumentAction";
import { chatGPTCandidateResponse, compatibilityResponse }  from "./chatGPTCandidateResponse";
import { checkJob } from "./processDocumentAction";
import { getText } from './processDocumentAction';
import { fetchProcessDetails } from "./fetchProcessDetails";

type DocumentResponse = {
  id: string;
  status: 'PENDING' | 'SUCCESS' | 'ERROR';
  error_message?: string;
};

// type ChatGPTResponse = {
//   text: string;
// };

// type CompatibilityResponse = {
//   evaluacion?: {
//     coincidencias?: {
//       habilidades?: string;
//       soft_skills?: string;
//     };
//     faltas?: string[];
//     puntuacion_general?: number;
//   };
//   preguntas_rrhh?: string[];
// };

export const handleCreateCandidate = async (
  formData: FormData,
  actualRoute: string
) => {
	// Extrae el process_id de la URL
	const routeSegments = actualRoute.split('/');
	const processId = parseInt(routeSegments[2], 10); // el proceso se encuentra en la tercera parte de la URL


	// Verifica si se obtuvo correctamente el process_id
	if (!processId) {
		return { message: "No se encontró el process_id, no se puede asociar el candidato al proceso.", route: actualRoute };
	}

	// Obtener vacante
  let vacante;
  try {
    vacante = await fetchProcessDetails(processId);
		console.log("Vacante==== :", vacante);
    if (!vacante || !vacante.jobOfferDescription) {
      return { message: "No se pudo obtener la descripción de la vacante.", route: actualRoute };
    }
  } catch (error) {
    console.error("Error al obtener los detalles del proceso:", error);
    return { message: "Error al obtener los detalles del proceso.", route: actualRoute };
  }

	// Procesa el archivo antes de llamar a `createCandidateAction`
	const file = formData.get("cv"); // Obtén el archivo del FormData

	if (!file || !(file instanceof File)) {
		return { message: "Archivo no proporcionado o inválido", route: actualRoute };
	}
	console.log("Archivo recibido:", file);

	// Llama al procesamiento del archivo
	const documentResponse = await processDocumentAction(file);

	console.log("Respuesta de processDocumentAction:", documentResponse);
	console.log(documentResponse?.id);
	
	console.log(documentResponse?.status);

  if (!documentResponse || documentResponse.status === 'ERROR') {
    return {
      message: "Error al procesar el archivo o ID de transcripción no válido.",
      route: actualRoute,
    };
  }

	function cleanGeneratedHtml(generatedText: any) {
		return generatedText
			.replace(/^```html\n/, '')  // Elimina la etiqueta de apertura
			.replace(/\n```$/, '');     // Elimina la etiqueta de cierre
	}

	  // Esperar hasta que el estado no sea 'PENDING'
		let respuestaJob: DocumentResponse = documentResponse;
		while (respuestaJob?.status === 'PENDING') {
			await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de verificar de nuevo
			respuestaJob = await checkJob(documentResponse?.id);
			console.log("Verificando estado del documento:", respuestaJob);
		}

		if (respuestaJob?.status === 'ERROR') {
			return {
				message: `Error al procesar el documento: ${respuestaJob?.error_message}`,
				route: actualRoute,
			};
		}

		
	let resultadoTextoHTML: any;
	let resultadoEstandarizado: any;
	let resultadoCompatibilidad: any;
	let cleanedHtml: any;
	let compatibilidadTexto: any;
	if (respuestaJob?.status === 'SUCCESS') {
		// Comunicación para obtener la transcripción en texto
		resultadoTextoHTML = await getText(respuestaJob?.id);

		//Comunicación con chatGPT para obtener respuesta de valor para RH
		resultadoEstandarizado = await chatGPTCandidateResponse(resultadoTextoHTML?.text);

    // Compatibilidad del candidato con la vacante
		compatibilidadTexto = await compatibilityResponse(resultadoTextoHTML?.text, vacante.jobOfferDescription);

    // Limpiar y analizar el JSON generado
    compatibilidadTexto = compatibilidadTexto.replace(/^```json\n/, "").replace(/\n```$/, "");

    try {
      resultadoCompatibilidad = JSON.parse(compatibilidadTexto);
    } catch (error) {
      console.error("Error al analizar JSON de compatibilidad:", error);
      return { message: "Error al analizar la respuesta de compatibilidad.", route: actualRoute };
    }
		console.log("Comparación del CV con la vacante ===>", resultadoCompatibilidad);

		cleanedHtml = cleanGeneratedHtml(resultadoEstandarizado);
	}

  // **Se recupera respuestas del json devuelto por chatGPT**
	const interviewQuestions = JSON.stringify(resultadoCompatibilidad?.preguntas_rrhh || 0).toString();

  // Preparar los datos para la creación del candidato y la asociación con el proceso
	formData.append("jsongpt_text", cleanedHtml);
	formData.append("process_id", processId.toString());
	formData.append("technical_skills", resultadoCompatibilidad?.evaluacion?.coincidencias?.habilidades || '');
	formData.append("client_comments", Array.isArray(resultadoCompatibilidad?.evaluacion?.faltas) ? resultadoCompatibilidad.evaluacion.faltas.join(', ') : '');	formData.append("match_percent", (resultadoCompatibilidad?.evaluacion?.puntuacion_general || 0).toString());
	formData.append("interview_questions", interviewQuestions);
	formData.append("soft_skills", resultadoCompatibilidad?.evaluacion?.coincidencias?.soft_skills);

	// Agrega candidatos a la base de datos
  const createResponse = await createCandidateAction(formData, processId);
	// Id del usuario para redirigir a editar ese candidato
	const idUser = createResponse?.result?.candidate?.id;
	// Ruta del edición del usuario
	const routeToRedirect = `/${routeSegments[1]}/${routeSegments[2]}/${idUser}/edit-candidate`;

  return { message: createResponse.message, route: routeToRedirect };
};
