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
    console.log('Datos recibidos del servidor:', userDetails); // Para debug

    return {
      ...userDetails,
      roles: userDetails.roles || { nombre: "Sin rol" },
      users_company: userDetails.users_company || [],
      users_management: userDetails.users_management || []
    };
  } catch (error) {
    console.error('Error en fetchUserDetails:', error);
    throw error;
  }
}; 