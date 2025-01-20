interface User {
    id: number;
    name: string;
    email: string;
    position: string;
    roles?: {
        nombre: string;
    };
}

export const fetchUsers = async (page: number, query?: string, role?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (query) params.append('query', query);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Error al obtener usuarios");
    }
    
    const data = await response.json();
    
    return {
        total: data.total,
        batch: data.users.map((user: User) => ({
            ...user,
            roleName: user.roles?.nombre || "Sin rol"
        })),
    };
};

export const fetchRoles = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles`);
    if (!response.ok) {
        throw new Error('Error al obtener roles');
    }
    const data = await response.json();
    return data;
};