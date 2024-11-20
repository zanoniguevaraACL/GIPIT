"use server";

export const updateManagement = async (formData: FormData, managementId: string, companyId: string) => {
  try {
    // Convierte managementId y companyId a números enteros
    const managementIdInt = parseInt(managementId, 10);
    const companyIdInt = parseInt(companyId, 10);

    if (isNaN(managementIdInt) || isNaN(companyIdInt)) {
      throw new Error("Invalid managementId or companyId. They must be numbers.");
    }

    // Extrae los datos del formulario
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    // Crea el objeto JSON con los datos que se van a actualizar
    const payload: { name?: string; description?: string } = {};
    if (name) payload.name = name;
    if (description) payload.description = description;

    // Realiza la solicitud PUT a tu backend con JSON
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/management/${managementIdInt}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Muestra el texto de la respuesta si hay un error
      const errorText = await response.text();
      throw new Error(`Error updating management: ${errorText}`);
    }

    return {
      message: "Management updated successfully",
      route: `/company/${companyId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error updating management: ${error.message}`,
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