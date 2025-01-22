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
    companyName: string;
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
    const query = searchParams.get('query') || '';
    const role = searchParams.get('role') || '';

    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await fetchUsers(page, query, role);
                setUsers(userData.batch);
                setTotalUsers(userData.total);
                const roleData = await fetchRoles();
                setRoles(roleData);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        loadData();
    }, [page, query, role]);

    const handleSearch = (term: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('query', term);
        newSearchParams.set('page', '1');
        window.history.replaceState({}, '', `${window.location.pathname}?${newSearchParams}`);
    };

    const columns: Column<User>[] = [
        { name: "Nombre", key: "name", width: 2 },
        { name: "Email", key: "email", width: 2 },
        { name: "Cargo", key: "position", width: 1.5 },
        { name: "Rol", key: "roleName", width: 1.5 },
        { name: "Compañía", key: "companyName", width: 1.5 },
    ];

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
                onSearch={handleSearch}
            />
            <DataGrid data={{ columns, total: totalUsers, batch: users }} baseUrl="/admin" />
        </div>
    );
}

export default AdminPage;   