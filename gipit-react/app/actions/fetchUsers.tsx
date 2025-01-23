interface User {
    id: number;
    name: string;
    email: string;
    position: string;
    roles?: {
        nombre: string;
    };
    users_management?: {
        management: {
            company: {
                name: string;
            };
        };
    }[];
}

export const fetchUsers = async (page: number, query?: string, role?: string, companyId?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (query) params.append('query', query);
    if (role) params.append('role', role);
    if (companyId) params.append('company', companyId);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Error al obtener usuarios");
    }
    
    const data = await response.json();
    
    return {
        batch: data.users.map((user: User) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            position: user.position,
            roleName: user.roles?.nombre || "Sin rol",
            companyName: user.users_management?.[0]?.management?.company?.name || "Sin compañía"
        })),
        total: data.total
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