"use server";

export const handleCreateCompany = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const logo = null;  

    const payload = { name, description, logo };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
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
        message: "Ocurrió un error desconocido",
        route: "/company",
      };
    }
  }
};
