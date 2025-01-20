interface User {
    id: number;
    name: string;
    email: string;
    position: string;
    roles?: {
        nombre: string;
    };
}

export const fetchUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
    if (!response.ok) {
        throw new Error("Error al obtener usuarios");
    }
    
    const data = await response.json();
    
    // Verifica que la respuesta contenga un array de usuarios
    if (!Array.isArray(data.users)) {
        throw new Error("La respuesta no contiene un array de usuarios");
    }

    // Mapea los usuarios para incluir el nombre del rol
    const usersWithRoles = data.users.map((user: User) => ({
        ...user,
        roleName: user.roles?.nombre || "Sin rol"
    }));

    return usersWithRoles;
};