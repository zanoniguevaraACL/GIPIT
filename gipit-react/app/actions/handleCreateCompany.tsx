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
    const response = await fetch("http://localhost:3001/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Muestra el texto de la respuesta si hay un error
      const errorText = await response.text();
      throw new Error(`Error creating company: ${errorText}`);
    }
    

    return {
      
      message: "Company created successfully",
      route: "/company",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error creating company: ${error.message}`,
        route: "/company",
      };
    } else {
      console.error("Unknown error:", error);
      return {
        message: "An unknown error occurred",
        route: "/company",
      };
    }
  }
};
