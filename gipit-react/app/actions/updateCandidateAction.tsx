"use server";

export const updateCandidateAction = async (
  id: string,
  formData: FormData
) => {
  //CODIGO PARA CHEQUEAR LO QUE LLEGA DEL FORM PARA EDITAR 
  // Crear un objeto para almacenar los datos de formData
  // const dataObj: { [key: string]: any } = {};
  // formData.forEach((value, key) => {
  //   dataObj[key] = value;
  // });

  // Imprimir el contenido de formData
  // console.log("Contenido de formData =====:", dataObj);


  // Convertir FormData a un objeto JSON
  const data = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    jsongpt_text: formData.get("sumary") as string, // Asegúrate de que el campo esté correctamente mapeado
  };

  try {
    // Llamada al endpoint de tu backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, message: "Candidato actualizado con éxito", result };
  } catch (error) {
    console.error("Error al actualizar el candidato:", error);
    return { success: false, message: "Error al actualizar el candidato." };
  }
};