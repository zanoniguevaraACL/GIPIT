"use client";
import { useEffect, useState } from "react";
import DataGrid from "@/components/molecules/DataGrid";
import { fetchUsers, fetchRoles } from "@/app/actions/fetchUsers";
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

interface Role {
    id: number;
    nombre: string;
}

function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [roles, setRoles] = useState<Role[]>([]);
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [userData, rolesData] = await Promise.all([
                    fetchUsers(page),
                    fetchRoles()
                ]);
                setUsers(userData.batch);
                setTotalUsers(userData.total);
                setRoles(rolesData);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        loadData();
    }, [page]);

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
        total: totalUsers,
        batch: filteredUsers,
    };

    const roleOptions = [
        { value: "", label: "Todos los roles" },
        ...roles.map(role => ({
            value: role.nombre,
            label: role.nombre
        }))
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