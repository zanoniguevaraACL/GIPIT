"use server";

export const updateManagement = async (formData: FormData, managementId: string, companyId: string) => {
  try {
    const managementIdInt = parseInt(managementId, 10);
    const companyIdInt = parseInt(companyId, 10);

    if (isNaN(managementIdInt) || isNaN(companyIdInt)) {
      throw new Error("Invalid managementId or companyId. They must be numbers.");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const payload: { name?: string; description?: string } = {};
    if (name) payload.name = name;
    if (description) payload.description = description;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/management/${managementIdInt}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error actualizando jefatura: ${errorText}`);
    }

    return {
      message: "Jefatura actualizada exitosamente",
      route: `/company/${companyId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error actualizando jefatura: ${error.message}`,
        route: `/company/${companyId}`,
      };
    } else {
      return {
        message: "An unknown error occurred",
        route: `/company/${companyId}`,
      };
    }
  }
};