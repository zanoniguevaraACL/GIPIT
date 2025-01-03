"use server";
import OpenAI from "openai";

// Configuración del cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.API_KEY_OPENAI,
});

// Comunicación con chatGPT para obtener una respuesta de valor para RH
export async function chatGPTCandidateResponse(textoCV: string) {
  try {
    if (!textoCV) {
      return {
        error: "Es obligatorio contar con la transcripción del curriculum",
      };
    }

    const prompt = `
Convierte el contenido de un CV proporcionado en un formato HTML limpio y bien estructurado, siguiendo las directrices especificadas a continuación.

- Utiliza etiquetas HTML adecuadas para mejorar la presentación:
  - Usa '<h2>' para los títulos principales, tales como "Resumen General", "Experiencia Laboral", "Formación Profesional", etc.
  - Usa '<p>' para datos o descripciones detalladas.
  - Emplea listas no ordenadas ('<ul>' y '<li>') para enumerar elementos, por ejemplo, en secciones como "Habilidades" o "Proyectos".
- Excluye cualquier estructura global del HTML innecesaria para el contenido renderizado:
  - No añadas etiquetas como '<!DOCTYPE html>', '<html>', '<head>', o '<body>'.
  - Evita las etiquetas que no aportan al contenido principal (como 'meta' o 'charset').
- Asegúrate de que el resultado sea semántico, fácil de entender y fácilmente integrable en cualquier editor de texto o UI.

# Output Format

El resultado deberá ser solo el contenido necesario del currículum en HTML plano. A continuación el formato esperado:

- Cada sección debe estar contenida en un '<div>' con una clase identica 'cv-section'.
- Usa etiquetas '<h2>' para cada encabezado principal.
- Usa listas '<ul>' y '<li>' para enumeraciones.
- Incluye detalles en párrafos '<p>'.
- **Debes** omitir cualquier etiqueta no esencial para la presentación del contenido como '<html>', '<head>', o etiquetas de metadatos.

# Ejemplo

**Input**: 
CV proporcionado con los siguientes datos:  
${textoCV};

Con el CV proporcionado, intenta llevarlo a la siguiente estructura:
- '<div class="cv-container">' como contenedor principal.
- <h2>Resumen General</h2>
- <p>Resumen detallado del candidato.</p>
- <h2>Experiencia Laboral</h2>
- <p>Descripción de la experiencia laboral del candidato.</p>
- <h2>Formación Profesional</h2>
- <p>Detalles de la formación académica del candidato.</p>
  
**Output (HTML esperado)**:
'<div class="cv-container"> 
    <div class="cv-section">
      <h2>Resumen General</h2>
      <p>Ingeniero de software con más de 5 años de experiencia en desarrollo web.</p>
    </div>
    <div class="cv-section">
      <h2>Experiencia Laboral</h2>
      <ul>
        <li>Desarrollador Frontend en XYZ (2018-2021): Implementación de interfaces de usuario en React y Angular.</li>
      </ul>
    </div>
    <div class="cv-section">
      <h2>Formación Profesional</h2>
      <p>Detalles de la formación académica del candidato.</p>
    </div>
    <div class="cv-section">
      <h2>Referencias</h2>
      ...
    </div>
</div>
'

# Notas 
- Mantén el HTML fácil de leer y semántico, lo que mejorará la comprensión tanto humana como por parte de motores de búsqueda.
- No uses caracteres especiales que no pertenezcan al contenido, como símbolos de escape o etiquetas extrínsecas.
- Asegúrate de que cada sección principal esté contenida en un <div> con su propia clase fija, no la modifiques.
  `;

    //solicitud a la API de OpenAI
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 16000, //16000, // Cantidad de palabras en la respuesta
    });

    // Respuesta al prompt
    const content = completion.choices[0].message.content;

    return content;
  } catch (error) {
    console.error("Error obteniendo respuesta de cv estandar:", error);
    return { error: "Failed to generate content." };
  }
}

// Comunicación con chatGPT para obtener una respuesta de valor para RH
export async function compatibilityResponse(
  textoCV: string,
  textoVacante: string
) {
  try {
    if (!textoCV) {
      return { error: "Los parametros son requeridos" };
    }

    const promptComp = `
Analiza detalladamente la compatibilidad entre un currículum vitae (CV) y una oferta laboral. Además, proporciona 20 preguntas que un entrevistador de Recursos Humanos (RRHH) pueda hacerle al candidato para explorar su ajuste a la oferta laboral. Para ello, ten en cuenta los principales apartados esenciales del CV y la oferta laboral, comparándolos punto por punto para establecer el grado de correspondencia, la respuesta tiene que ser únicamente un JSON sin texto adicional 

Este es el Curriculum:
 ${textoCV}
 
Y esta es la oferta laboral:
 ${textoVacante}

# Pasos

1. **Identificar Secciones Principales**: Identifica los apartados clave tanto del CV como de la oferta laboral. Estos pueden incluir experiencia laboral, habilidades técnicas y personales (habilidades blandas), educación, y otros aspectos relevantes.
2. **Comparar Secciones Coincidentes**: Realiza una comparación detallada de cada apartado. Observa las coincidencias entre los requisitos y la experiencia, habilidades, y otros detalles reflejados en el CV.
3. **Evaluar Compatibilidad**: Evalúa qué tan bien se alinean las capacidades y experiencias del candidato con los requerimientos del puesto.
4. **Generar Conclusión**: Determina el grado de compatibilidad general entre el CV y la oferta laboral.
5. **Generar Preguntas de RRHH**: Proporciona 20 posibles preguntas que un entrevistador de RRHH pueda preguntar al candidato durante la entrevista, enfocándose en comprender la adecuación a los requisitos del puesto y otras cualidades relevantes.
6. **Extrae los años de experiencia**:
   - Si se mencionan los años de experiencia, utilízalos.
   - Si no, calcula los años sumando los períodos laborales encontrados en la sección "Experiencia Laboral".


# Formato de Salida (Devuelve únicamente un JSON sin texto adicional)
Proporciona una evaluación en JSON que detalle las coincidencias específicas, las potenciales áreas de desarrollo y una puntuación general (de 0 a 100) para la compatibilidad.
No utilices espacios ni tildes en los key del json.

Adicionalmente, proporciona las 20 preguntas generadas.

# Ejemplo

**Entrada**: 
- **Oferta laboral**: Ingeniero de Software, requiere experiencia en Java, conocimiento en SQL, 3 años de experiencia mínima, inglés avanzado.
- **CV**: Experiencia en Java (5 años), conocimiento en SQL y Python, inglés avanzado.

**Formato Salida**
- Devuelve únicamente un JSON sin texto adicional
{
  "evaluacion": {
    "coincidencias": {
      "experiencia": "Cumple y supera la experiencia requerida en Java (5 años vs 3 años)",
      "habilidades": "Coincide el conocimiento en SQL; tiene habilidades adicionales en Python",
      "idiomas": "Coincide el nivel avanzado de inglés",
      "soft_skills": "Trabajo en distintos equipos, tiene buen manejo de la comunicación y las metodologías agiles"
    },
    "faltas": [],
    "puntuacion_general": 95
    "total_experiencia": 5
  },
  "preguntas_rrhh": [
    "¿Por qué decidiste aplicar a esta oferta laboral de Ingeniero de Software?",
    "¿Qué parte de tus conocimientos en Java crees que se alinea mejor con este puesto?",
    "¿Cómo describirías tu experiencia con SQL y cómo te has formado en este lenguaje?",
    "¿Podrías explicar alguna situación en la que usaste Python de manera ventajosa?",
    "¿Cuál es tu nivel actual de inglés y cómo lo has utilizado profesionalmente?",
    "¿Cuáles son las tres habilidades técnicas que consideras que te hacen el mejor candidato para este cargo?",
    "¿Hay habilidades técnicas que requiera el puesto que crees que necesitas desarrollar más?",
    "¿Podrías compartir un proyecto anterior donde trabajaste dentro de un equipo y utilizaste Java?",
    "¿Cómo te mantienes actualizado en las últimas tecnologías y metodologías de desarrollo de software?",
    "¿Cuál es la mayor mejora que has implementado en un proyecto de software?",
    "¿Cómo abordarías una situación en la que tus conocimientos técnicos actuales no son suficientes para cumplir con un requerimiento?",
    "¿Qué rol prefieres asumir al trabajar con un equipo de desarrollo?",
    "¿Cómo manejarías el aprender una nueva tecnología que no dominas actualmente para este puesto?",
    "¿Hay alguna habilidad o experiencia en tu CV que no esté relacionada directamente con el rol pero consideras importante?",
    "¿Cómo gestionarías tener más responsabilidad que la esperada inicialmente en este puesto?",
    "¿Qué importancia das al trabajo colaborativo y cómo lo usarías en este puesto?",
    "¿Podrías contar una ocasión donde tu conocimiento en inglés fue clave para resolver un problema?",
    "¿Qué esperas aprender o desarrollar en este puesto que te permitiría avanzar en tu carrera?",
    "¿Qué motivación principal tienes para trabajar en una empresa que tiene estos requisitos tecnológicos?",
    "¿Existen áreas de mejora en tus habilidades técnicas que consideras relevantes para este rol?"
  ]
}

# Notas
- No devuelvas ningún texto adicional, solo el JSON estructurado como se especifica.
- Tener en cuenta posibles sinónimos o diferentes formas de expresar habilidades o responsabilidades.
- Considerar que algunas habilidades no exactas podrían ser transferibles y valorar adecuadamente dicho contexto.
- Las preguntas de RRHH deben centrarse en la identificación de fortalezas y áreas de oportunidad del candidato en relación con la oferta laboral.
  `;

    //solicitud a la API de OpenAI
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [{ role: "user", content: promptComp }],
      max_tokens: 16000, //16000, // Cantidad de palabras en la respuesta
    });

    // Respuesta al prompt
    const content = completion.choices[0].message.content;

    return content;
  } catch (error) {
    console.error("Error en la compatibilidad con el candidato:", error);
    return { error: "Failed to generate content." };
  }
}


export async function extraerPeriodosTrabajoCV(textoCV: string | null) {
  try {
    if (!textoCV) {
      return {
        error: "El texto del CV es obligatorio para procesar los períodos laborales.",
      };
    }

    const prompt = `
Analiza el siguiente texto que corresponde al contenido de un CV. Extrae exclusivamente los períodos laborales mencionados en el formato JSON que se especifica a continuación.

El formato esperado debe contener:
- **inicio**: Fecha de inicio del trabajo (formato: "YYYY-MM").
- **fin**: Fecha de fin del trabajo o \`null\` si está en curso.

Si no encuentras información sobre períodos laborales, devuelve un JSON vacío:
[]

Este es el texto del CV:
${textoCV}

Ejemplo de salida válida:
 [
    { "inicio": "2018-01", "fin": "2020-12" },
    { "inicio": "2021-01", "fin": null }
  ]

Notas importantes:
- No incluyas ningún texto adicional fuera del JSON.
- Considera únicamente las fechas claras y verificables.
- Usa el formato ISO "YYYY-MM" para las fechas.
    `;

    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    let response = completion.choices[0]?.message?.content;

    if (response) {
      // Limpia el contenido extra como ```json o ``` si existe
      response = response.replace(/```json\n?/, "").replace(/```$/, "");

      try {
        // Intenta analizar el JSON devuelto por ChatGPT
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
      } catch (error) {
        console.error("Error al analizar el JSON devuelto por ChatGPT:", error);
        return {
          error: "La respuesta de ChatGPT no pudo ser analizada como JSON.",
        };
      }
    } else {
      console.error("La respuesta de ChatGPT es null o no contiene contenido.");
      return {
        error: "La respuesta de ChatGPT no contiene datos válidos.",
      };
    }
  } catch (error) {
    console.error("Error al comunicarse con ChatGPT:", error);
    return { error: "Fallo la comunicación con ChatGPT." };
  }
}