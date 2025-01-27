interface CompanyData {
  company: {
    id: number;
    name: string;
  };
}

interface ManagementData {
  management: {
    id: number;
    name: string;
    company: {
      id: number;
      name: string;
    };
  };
}

export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Error al obtener los detalles del usuario');
    }

    const userDetails = await response.json();

    // Extraer información de company y management
    const companyInfo = userDetails.users_company?.map((uc: CompanyData) => ({
      companyId: uc.company?.id,
      companyName: uc.company?.name
    })) || [];

    const managementInfo = userDetails.users_management?.map((um: ManagementData) => ({
      managementId: um.management?.id,
      managementName: um.management?.name,
      companyId: um.management?.company?.id,
      companyName: um.management?.company?.name
    })) || [];

    return {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      position: userDetails.position,
      is_active: userDetails.is_active,
      roles: userDetails.roles || { nombre: "Sin rol" },
      companies: companyInfo,
      managements: managementInfo
    };
  } catch (error) {
    console.error('Error en fetchUserDetails:', error);
    throw error;
  }
}; 