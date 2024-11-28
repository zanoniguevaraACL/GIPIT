"use server";

export const handleCreateManagement = async (formData: FormData, companyId: string) => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const companyIdInt = parseInt(companyId, 10);

    if (isNaN(companyIdInt)) {
      throw new Error("Invalid companyId. It must be a number.");
    }

    const payload = {
      name,
      description,
      company_id: companyIdInt,
    };

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
      throw new Error(`Error creando jefatura: ${errorText}`);
    }

    return {
      message: "Jefatura creada exitosamente",
      route: `/company/${companyId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error creando jefatura: ${error.message}`,
        route: `/company/${companyId}`,
      };
    } else {
      return {
        message: "Un error ha ocurrido",
        route: `/company/${companyId}`,
      };
    }
  }
};
