"use server";

export const createUserManagement = async (
  formData: FormData,
  companyId: string,
  managementId: string,
  roleId?: number
): Promise<{ message: string; route: string; statusCode: number }> => {
  try {
    // Solo validar managementId si es Cliente-Gerente
    let managementIdInt: number | null = null;
    if (roleId === 6) {
      managementIdInt = parseInt(managementId, 10);
      if (isNaN(managementIdInt)) {
        throw new Error("ManagementId inválido. Debe ser un número.");
      }
    }

    const userEmail = formData.get("email") as string;
    const userName = formData.get("name") as string;
    const userPosition = formData.get("position") as string;

    if (!userEmail) {
      throw new Error("Email is required.");
    }

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

    const payload: {
      name: string;
      position: string;
      email: string;
      role_id?: number;
    } = {
      name: userName,
      position: userPosition,
      email: userEmail,
    };

    // Solo agregar role_id si está presente
    if (roleId !== undefined) {
      payload.role_id = roleId;
    }

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
      throw new Error(`Error creando usuario: ${messageText}`);
    } else {
      const newUserData = await newUser.json();
      newUserId = newUserData.id;
    }

    // Solo crear user-management si es Cliente-Gerente o si se proporciona managementId
    if ((roleId === 6 && managementIdInt !== null) || (!roleId && managementId)) {
      const managementIdToUse = managementIdInt || parseInt(managementId, 10);
      const payloadToUserManagement = {
        user_id: newUserId,
        management_id: managementIdToUse,
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
        throw new Error(`Error creando el user-management: ${response.text()}`);
      }
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
        message: "Un error ha ocurrido",
        route: `/company/${companyId}`,
        statusCode: 500,
      };
    }
  }
};
