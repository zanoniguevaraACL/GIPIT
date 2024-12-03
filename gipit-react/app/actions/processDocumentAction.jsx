"use server";
import fetch from 'node-fetch';

export const processDocumentAction = async (file)=> {
  const url = 'https://api.cloud.llamaindex.ai/api/parsing/upload';
  const formData = new FormData();

  // Prompt detallado para el formato HTML
  const prompt = `Dame una transcripcion en HTML identificando titulos, parrafos y listas`;

  formData.append('language', 'es');
  formData.append('disable_ocr', 'false');
  formData.append('annotate_links', 'false');
  formData.append('do_not_unroll_columns', 'false');
  formData.append('do_not_cache', 'false');
  formData.append('parsing_instruction', prompt);
  formData.append('invalidate_cache', 'false');
  formData.append('take_screenshot', 'false');
  formData.append('is_formatting_instruction', 'false');
  formData.append('file', file);


  const headers = {
    'accept': 'application/json',
    'accept-language': 'en,es-US;q=0.9,es-419;q=0.8,es;q=0.7,pt;q=0.6',
    'origin': 'https://cloud.llamaindex.ai',
    'referer': 'https://cloud.llamaindex.ai/',
    'Authorization': `Bearer ${process.env.API_KEY_LLAMA}`
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("Respuesta de la API al cargar archivo:", data);

    // Verificación de propiedades
    if (data && data.id && data.status) {
      return { id: data.id, status: data.status };
    } else {
      console.error('La respuesta de la API no contiene los datos esperados', data);
      return null;
    }
  } catch (error) {
    console.error("Error al procesar el documento:", error);
    return null;
  }
};



export async function getText(jobId) {
  const url = `https://api.cloud.llamaindex.ai/api/v1/parsing/job/${jobId}/result/text`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY_LLAMA}`,
        'redirect': "follow"
      }
    })

    if (!response.ok) {
      console.error(`Error al verificar el estado: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    console.log("Respuesta de la API en la tercera consulta del texto:", data);

    return data; // Retorna el objeto de datos directamente
  }
  catch (error) {
    console.error("Error al intentar recuperar la transcripción");
    return null;
  }

}


export const checkJob = async (jobId) => {
  const url = `https://api.cloud.llamaindex.ai/api/v1/parsing/job/${jobId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY_LLAMA}`,
        'redirect': "follow"
      },
    });

    if (!response.ok) {
      console.error(`Error al verificar el estado: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log("Respuesta de la API al verificar estado:", data);

    return data; // Retorna el objeto de datos directamente
  } catch (error) {
    console.error("Error al verificar el estado del trabajo:", error);
    return null;
  }
};