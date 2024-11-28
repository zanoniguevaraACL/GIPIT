"use server";



export const handleCreateCompany = async (formData: FormData) => {
  try {
    // Extrae los datos del formulario
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    // Nota: Si necesitas manejar el logo, asegúrate de enviarlo en un formato que el backend pueda procesar

    // Crea el objeto JSON con los datos
    const payload = {
      name,
      description,
    };

    // Realiza la solicitud POST a tu backend con JSON
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Muestra el texto de la respuesta si hay un error
      const errorText = await response.text();
      throw new Error(`Error creando compañia: ${errorText}`);
    }
    

    return {
      
      message: "Compañia creada exitosamente",
      route: "/company",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error creando compañia: ${error.message}`,
        route: "/company",
      };
    } else {
      return {
        message: "An unknown error occurred",
        route: "/company",
      };
    }
  }
};
