"use server";

export const handleCreateManagement = async (formData: FormData, companyId: string) => {
  try {
    // Extrae los datos del formulario
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    // Convierte companyId a un número entero
    const companyIdInt = parseInt(companyId, 10);

    if (isNaN(companyIdInt)) {
      throw new Error("Invalid companyId. It must be a number.");
    }

    // Crea el objeto JSON con los datos de la jefatura
    const payload = {
      name,
      description,
      company_id: companyIdInt, // Ahora es un número, no una cadena
    };

    // Realiza la solicitud POST a tu backend con JSON
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/management`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Muestra el texto de la respuesta si hay un error
      const errorText = await response.text();
      throw new Error(`Error creating management: ${errorText}`);
    }

    return {
      message: "Management created successfully",
      route: `/company/${companyId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error creating management: ${error.message}`,
        route: `/company/${companyId}`,
      };
    } else {
      console.error("Unknown error:", error);
      return {
        message: "An unknown error occurred",
        route: `/company/${companyId}`,
      };
    }
  }
};
