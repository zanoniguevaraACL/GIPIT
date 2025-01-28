"use server";

export const createUserManagement = async (
  formData: FormData,
  companyId: string,
  managementId: string,
  roleId?: number
): Promise<{ message: string; route: string; statusCode: number }> => {
  try {
    // Solo validar managementId si es Cliente
    let managementIdInt: number | null = null;
    if (roleId === 2 && managementId) {
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

    // Crear la relación users_company solo si es Cliente o Cliente-Gerente
    if (roleId === 6) {
      const companyPayload = {
        user_id: newUserId,
        company_id: parseInt(companyId, 10)
      };

      const companyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-company`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(companyPayload),
        }
      );

      if (!companyResponse.ok) {
        throw new Error(`Error creando la relación usuario-compañía: ${await companyResponse.text()}`);
      }
    }

    // Crear la relación users_management si hay un managementId
    if (managementId) {
      const managementIdToUse = parseInt(managementId, 10);
      if (isNaN(managementIdToUse)) {
        throw new Error("ManagementId inválido. Debe ser un número.");
      }

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
        const errorText = await response.text();
        throw new Error(`Error creando el user-management: ${errorText}`);
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
