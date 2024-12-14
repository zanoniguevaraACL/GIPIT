"use server";

export const updateUser = async (
  formData: FormData,
  userId: number,
  companyId: number
): Promise<{ message: string; route: string; statusCode: number }> => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    const payload: { name?: string; role?: string; email?: string } = {};
    if (name) payload.name = name;
    if (email) payload.email = email;
    if (role) payload.role = role;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error actualizando usuario: ${errorText}`);
    }

    return {
      message: "Usuario actualizado exitosamente",
      route: `/company/${companyId}`,
      statusCode: 200,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error actualizando usuario: ${error.message}`,
        route: `/company/${companyId}`,
        statusCode: 500,
      };
    } else {
      return {
        message: "Error desconocido actualizando usuario",
        route: `/company/${companyId}`,
        statusCode: 500,
      };
    }
  }
};
