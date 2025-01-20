"use client";
import { useEffect, useState } from "react";
import DataGrid from "@/components/molecules/DataGrid";
import { fetchUsers } from "@/app/actions/fetchUsers";
import { Column } from "@/app/lib/types";
import './admin.css';
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

interface User {
    id: number;
    name: string;
    email: string;
    position: string;
    roleName: string;
}

function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadUsers();
    }, []);

    const columns: Column<User>[] = [
        { name: "Nombre", key: "name", width: 2 },
        { name: "Email", key: "email", width: 2 },
        { name: "Cargo", key: "position", width: 1.5 },
        { name: "Rol", key: "roleName", width: 1.5 },
    ];

    const filteredUsers = users.filter(user => {
        const selectedRole = searchParams.get('role');
        const searchQuery = searchParams.get('query')?.toLowerCase() || '';
        const matchesRole = selectedRole ? user.roleName === selectedRole : true;
        const matchesName = user.name.toLowerCase().includes(searchQuery);
        return matchesRole && matchesName;
    });

    const dataGridData = {
        columns,
        total: filteredUsers.length,
        batch: filteredUsers,
    };

    const roleOptions = [
        { value: "", label: "Todos los roles" },
        { value: "admin", label: "Admin" },
        { value: "user", label: "Usuario" },
        // Agrega más roles según sea necesario
    ];

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-header-content">
                    <Button text="Crear Usuario" href="/admin/create" type="primary" />
                </div>
            </div>
            <SearchBar 
                roleOptions={roleOptions}
                defaultRole=""
                onSearch={(term) => console.log("Buscando:", term)}
            />
            <DataGrid data={dataGridData} baseUrl="/admin" />
        </div>
    );
}

export default AdminPage;   