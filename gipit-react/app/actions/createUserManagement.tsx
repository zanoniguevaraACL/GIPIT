"use server";

export const createUserManagement = async (
  formData: FormData,
  managementId: string
) => {
  try {
    // Convierte managementId a un número entero
    const managementIdInt = parseInt(managementId, 10);
    if (isNaN(managementIdInt)) {
      throw new Error("ManagementId inválido. Debe ser un número.");
    }

    // Extrae los datos del formulario
    const email = formData.get("email") as string;

    // Valida que el correo electrónico esté presente
    if (!email) {
      throw new Error("Email is required.");
    }

    
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/byEmail/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!userResponse.ok) {
      throw new Error("Usuario no encontrado. Asegúrese que el correo es correcto.");
    }

    const user = await userResponse.json();
    const userId = user.id;

    
    const payload = {
      user_id: userId, 
      management_id: managementIdInt, 
    };

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user-management`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creando user-management: ${errorText}`);
    }

    return {
      message: "User-management creado exitosamente",
      route: `/management/${managementId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error creando user-management: ${error.message}`,
        route: `/management/${managementId}`,
      };
    } else {
      console.error("Unknown error:", error);
      return {
        message: "An unknown error occurred",
        route: `/management/${managementId}`,
      };
    }
  }
};
