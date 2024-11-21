"use server";

export const createUserManagement = async (
  formData: FormData,
  managementId: string
) => {
  try {
    // Convierte managementId a un número entero
    const managementIdInt = parseInt(managementId, 10);
    if (isNaN(managementIdInt)) {
      throw new Error("Invalid managementId. It must be a number.");
    }

    // Extrae los datos del formulario
    const email = formData.get("email") as string;

    // Valida que el correo electrónico esté presente
    if (!email) {
      throw new Error("Email is required.");
    }

    // Verifica si el usuario existe en la base de datos
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
      throw new Error("User not found. Make sure the email is correct.");
    }

    const user = await userResponse.json();
    const userId = user.id;

    // Crea el objeto JSON con los datos del user-management
    const payload = {
      user_id: userId, // Relaciona con el user
      management_id: managementIdInt, // Relaciona con el management
    };

    // Realiza la solicitud POST a tu backend con JSON
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user-management`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating user-management: ${errorText}`);
    }

    return {
      message: "User-management created successfully",
      route: `/management/${managementId}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error creating user-management: ${error.message}`,
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
