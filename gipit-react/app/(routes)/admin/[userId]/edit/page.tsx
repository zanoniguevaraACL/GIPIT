"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import './editUser.css';

interface Role {
  id: number;
  nombre: string;
}

interface UserData {
  name: string;
  email: string;
  position: string;
  role_id: number | null;
  role_name: string;
  is_active: boolean;
}

interface Management {
  id: number;
  name: string;
  company_id: number;
}

interface Company {
  id: number;
  name: string;
}

function EditUserPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    position: "",
    role_id: null,
    role_name: "",
    is_active: true,
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [managements, setManagements] = useState<Management[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedManagementId, setSelectedManagementId] = useState<string | null>(null);
  const [filteredManagements, setFilteredManagements] = useState<Management[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);
        const data = await response.json();
        console.log("Datos del usuario cargados:", data);
        setUserData(data);

        // Obtener el nombre de la compañía y la jefatura según las relaciones
        let companyName = "No disponible";
        let managementName = "No disponible";

        if (data.role_id === 2) { // Cliente
          if (data.users_management && data.users_management.length > 0) {
            companyName = data.users_management[0]?.management?.company?.name || "No disponible";
            managementName = data.users_management[0]?.management?.name || "No disponible";
            setSelectedCompanyId(data.users_management[0]?.management?.company?.id.toString() || null);
            setSelectedManagementId(data.users_management[0]?.management?.id.toString() || null);
          }
        } else if (data.role_id === 6) { // Cliente-Gerente
          if (data.users_company && data.users_company.length > 0) {
            companyName = data.users_company[0]?.company?.name || "No disponible";
            setSelectedCompanyId(data.users_company[0]?.company?.id.toString() || null);
          }
          if (data.users_management && data.users_management.length > 0) {
            managementName = data.users_management[0]?.management?.name || "No disponible";
            setSelectedManagementId(data.users_management[0]?.management?.id.toString() || null);
          }
        }

        console.log("Compañía actual:", companyName);
        console.log("Jefatura actual:", managementName);
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles`);
        const data = await response.json();
        console.log("Roles cargados:", data);
        setRoles(data);
      } catch (error) {
        console.error("Error al cargar roles:", error);
      }
    };

    fetchUserData();
    fetchRoles();
  }, [userId]);

  useEffect(() => {
    const filterRoles = () => {
      if (!roles.length) {
        console.log("No hay roles disponibles");
        return;
      }

      console.log("Rol actual:", userData.role_name);
      console.log("Roles disponibles:", roles);

      // Verificar si el usuario actual es cliente o cliente-gerente
      const isClientRole = roles.find(role => 
        role.id === userData.role_id && 
        (role.nombre === 'client' || role.nombre === 'Cliente-Gerente')
      );

      console.log("¿Es rol de cliente?:", isClientRole);

      if (isClientRole) {
        // Si es cliente o cliente-gerente, solo mostrar estos roles
        const filteredRoles = roles.filter(role => 
          role.nombre === 'client' || role.nombre === 'Cliente-Gerente'
        );
        console.log("Mostrando roles de cliente:", filteredRoles);
        setAvailableRoles(filteredRoles);
      } else {
        // Si no es cliente ni cliente-gerente, mostrar todos los roles excepto cliente y cliente-gerente
        const filteredRoles = roles.filter(role => 
          role.nombre !== 'client' && role.nombre !== 'Cliente-Gerente'
        );
        console.log("Mostrando roles no cliente:", filteredRoles);
        setAvailableRoles(filteredRoles);
      }
    };

    if (roles.length > 0) {
      filterRoles();
    }
  }, [roles, userData.role_id]);

  // Efecto para cargar compañías y jefaturas
  useEffect(() => {
    const loadCompaniesAndManagements = async () => {
      try {
        const companiesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`);
        const companiesData = await companiesResponse.json();
        setCompanies(companiesData);

        const managementsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/management`);
        const managementsData = await managementsResponse.json();
        setManagements(managementsData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    loadCompaniesAndManagements();
  }, []);

  // Efecto para filtrar jefaturas cuando se selecciona una compañía
  useEffect(() => {
    if (selectedCompanyId) {
      const filtered = managements.filter(management => 
        management.company_id === parseInt(selectedCompanyId)
      );
      setFilteredManagements(filtered);
    } else {
      setFilteredManagements([]);
    }
  }, [selectedCompanyId, managements]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const dataToSend = {
      ...userData,
      company_id: selectedCompanyId,
      management_id: selectedManagementId
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      console.error("Error al actualizar el usuario");
    }
  };

  return (
    <div className="max-container-adedit">
      <div className="invoice-form-container-adedit">
        <div className="header-section-adedit">
          <h2>Editar Usuario</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-adedit">
            <div className="form-group-adedit">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group-adedit">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group-adedit">
              <label>Cargo</label>
              <input
                type="text"
                placeholder="Cargo"
                value={userData.position}
                onChange={(e) => setUserData({ ...userData, position: e.target.value })}
                required
              />
            </div>
            <div className="form-group-adedit">
              <label>Rol</label>
              <select
                value={userData.role_id || ""}
                onChange={(e) => {
                  const selectedRoleId = Number(e.target.value);
                  const selectedRole = roles.find(role => role.id === selectedRoleId);
                  if (selectedRole) {
                    setUserData({ 
                      ...userData, 
                      role_id: selectedRoleId,
                      role_name: selectedRole.nombre
                    });
                  } 
                }}
                required
              >
                <option value="" disabled>Selecciona un rol</option>
                {availableRoles.map(role => (
                  <option key={role.id} value={role.id}>{role.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group-adedit">
              <label>Estado</label>
              <select
                value={userData.is_active ? "activo" : "inactivo"}
                onChange={(e) => setUserData({ ...userData, is_active: e.target.value === "activo" })}
                required
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            {userData.role_id === 6 && ( // Cliente-gerente
              <div className="form-group-adedit">
                <label>Compañía</label>
                <select 
                  value={selectedCompanyId || ""} 
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  required
                  disabled
                >
                  <option value="">Seleccione una compañía</option>
                  {Array.isArray(companies) && companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {userData.role_id === 2 && ( // Cliente
              <>
                <div className="form-group-adedit">
                  <label>Compañía</label>
                  <select 
                    value={selectedCompanyId || ""} 
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    required
                    disabled
                  >
                    <option value="">Seleccione una compañía</option>
                    {Array.isArray(companies) && companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group-adedit">
                  <label>Jefatura</label>
                  <select 
                    value={selectedManagementId || ""} 
                    onChange={(e) => setSelectedManagementId(e.target.value)}
                    required
                    disabled={!selectedCompanyId}
                  >
                    <option value="">Seleccione una jefatura</option>
                    {filteredManagements.map((management) => (
                      <option key={management.id} value={management.id}>
                        {management.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="button-container-adedit">
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserPage;