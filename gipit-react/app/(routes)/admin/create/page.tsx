"use client";
import { useState, useEffect } from "react";

import Button from "@/components/atoms/Button";
import "./create.css";
import { fetchRoles } from "@/app/actions/fetchUsers";
import { fetchManagements } from "@/app/actions/fetchData";
import { fetchAllCompanies } from "@/app/actions/fetchCompanies";
import { createUserManagement } from "@/app/actions/createUserManagement";

interface Role {
  id: number;
  nombre: string;
}

interface Company {
  id: number;
  name: string;
}

interface Management {
  id: number;
  name: string;
  company_id: number;
}

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [managementId, setManagementId] = useState<number | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [managements, setManagements] = useState<Management[]>([]);
  const [filteredManagements, setFilteredManagements] = useState<Management[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        console.log("Roles recuperados:", data);
        setRoles(data);
      } catch (error) {
        console.error("Error al recuperar roles:", error);
      }
    };

    const loadCompanies = async () => {
      try {
        const data = await fetchAllCompanies();
        console.log("Compañías recuperadas:", data);
        setCompanies(data);
      } catch (error) {
        console.error("Error al recuperar compañías:", error);
      }
    };

    const loadManagements = async () => {
      try {
        const data = await fetchManagements();
        console.log("Jefaturas recuperadas:", data);
        setManagements(data);
      } catch (error) {
        console.error("Error al recuperar jefaturas:", error);
      }
    };

    loadRoles();
    loadCompanies();
    loadManagements();
  }, []);

  useEffect(() => {
    if (companyId) {
      const filtered = managements.filter(management => management.company_id === companyId);
      setFilteredManagements(filtered);
    } else {
      setFilteredManagements([]);
    }
  }, [companyId, managements]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación de campos según el rol
    if (roleId === null || (roleId === 6 && companyId === null)) {
      console.error("Todos los campos deben ser seleccionados.");
      return;
    }

    // Solo requerir managementId si el rol es Cliente
    if (roleId === 2 && (companyId === null || managementId === null)) {
      console.error("Todos los campos deben ser seleccionados para Cliente-Gerente.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("role_id", roleId.toString());

    // Solo pasar managementId si el rol es Cliente-Gerente
    const result = await createUserManagement(
      formData,
      companyId?.toString() || "",
      managementId?.toString() || "",
      roleId
    );

    if (result.statusCode === 200) {
      window.location.href = "/admin";
    } else {
      console.error("Error al crear el usuario:", result.message);
    }
  };

  return (
    <div className="max-container-create">
      <div className="invoice-form-container-create">
        <div className="header-section-create">
          <h2>Crear Usuario</h2>
        </div>
        <div className="form-content-create">
          <form onSubmit={handleSubmit}>
            <div className="form-grid-create">
              <div className="form-group-create">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-create">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-create">
                <label>Cargo</label>
                <input
                  type="text"
                  placeholder="Cargo"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-create">
                <label>Rol</label>
                <select value={roleId || ""} onChange={(e) => setRoleId(Number(e.target.value))} required>
                  <option value="" disabled>Selecciona un rol</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.nombre}</option>
                  ))}
                </select>
              </div>
              {roleId === 6 && ( // Si el rol es Cliente
                <div className="form-group-create">
                  <label>Compañía</label>
                  <select value={companyId || ""} onChange={(e) => setCompanyId(Number(e.target.value))} required>
                    <option value="" disabled>Selecciona una compañía</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
              )}
              {roleId === 2 && ( // Si el rol es Cliente-Gerente
                <>
                  <div className="form-group-create">
                    <label>Compañía</label>
                    <select value={companyId || ""} onChange={(e) => setCompanyId(Number(e.target.value))} required>
                      <option value="" disabled>Selecciona una compañía</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group-create">
                    <label>Jefatura</label>
                    <select value={managementId || ""} onChange={(e) => setManagementId(Number(e.target.value))} required disabled={!companyId}>
                      <option value="" disabled>Selecciona una jefatura</option>
                      {filteredManagements.map(management => (
                        <option key={management.id} value={management.id}>{management.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="button-container-create">
                <Button text="Cancelar" href="/admin" type="tertiary" />
                <Button text="Crear" type="primary" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 