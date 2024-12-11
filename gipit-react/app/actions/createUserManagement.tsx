"use server";

export const createUserManagement = async (
  formData: FormData,
  companyId: string,
  managementId: string
): Promise<{ message: string; route: string; statusCode: number }> => {
  try {
    // Convierte managementId a un número entero
    const managementIdInt = parseInt(managementId, 10);
    if (isNaN(managementIdInt)) {
      throw new Error("ManagementId inválido. Debe ser un número.");
    }

    // Extrae los datos del formulario
    const userEmail = formData.get("email") as string;
    const userName = formData.get("name") as string;
    const userRole = formData.get("role") as string;

    // Valida que el correo electrónico esté presente
    if (!userEmail) {
      throw new Error("Email is required.");
    }

    // Valida que no exista un user creado con ese correo
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/byEmail/${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (userResponse.ok) {
      throw new Error("Un Usuario ya existe con este correo electrónico");
    }

    const payload = {
      name: userName,
      role: userRole,
      email: userEmail,
    };

    const newUser = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    let newUserId: number = 0;
    if (!newUser.ok) {
      const messageText = await newUser.text();
      throw new Error(`Error creando user-management: ${messageText}`);
    } else {
      const newUserData = await newUser.json();
      newUserId = newUserData.id;
    }

    console.log("nuevo id ->> " + newUserId);
    const payloadToUserManagement = {
      user_id: newUserId,
      management_id: managementIdInt,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-management`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadToUserManagement),
      }
    );

    if (!response.ok) {
      throw new Error(`Error creando el nuevo usuario: ${response.text()}`);
    }

    return {
      message: "Usuario creado correctamente",
      route: `/company/${companyId}`,
      statusCode: 200,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error creando el usuario: ${error.message}`,
        route: `/company/${companyId}`,
        statusCode: 500,
      };
    } else {
      return {
        message: "An unknown error occurred",
        route: `/company/${companyId}`,
        statusCode: 500,
      };
    }
  }
};
