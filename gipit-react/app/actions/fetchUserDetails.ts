export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los detalles del usuario');
    }

    const userDetails = await response.json();

    return {
      ...userDetails,
      role: userDetails.roles?.nombre || "Sin rol",
    };
  } catch (error) {
    console.error('Error en fetchUserDetails:', error);
    throw error;
  }
}; 