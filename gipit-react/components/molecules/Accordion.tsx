
"use client";
import { IconChevronDown, IconUserShield } from "@tabler/icons-react";
import Button from "../atoms/Button";
import "./accordion.css";
import { useState } from "react";

interface Integrante {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Jefatura {
  name: string;
  id: number;
  integrantes?: Integrante[]; // Lista de integrantes
}

interface CompanyDetails {
  id: number;
  name: string;
  jefaturas?: Jefatura[]; // Lista de jefaturas
}

function Accordion({ details }: { details: CompanyDetails }) {
  const [expanded, setExpanded] = useState<number | null>(null); // Jefatura expandida
  const [jefaturas, setJefaturas] = useState<Jefatura[]>(details.jefaturas || []);

  // Función para cargar los integrantes de una jefatura
  const fetchIntegrantes = async (managementId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user-management/${managementId}`);
      if (!response.ok) {
        throw new Error("Error fetching integrantes");
      }

      const integrantes = await response.json();
      setJefaturas((prevJefaturas) =>
        prevJefaturas.map((jef) =>
          jef.id === managementId
            ? {
                ...jef,
                integrantes, // Reemplaza los integrantes por la lista obtenida del backend
              }
            : jef
        )
      );
    } catch (error) {
      console.error("Error fetching integrantes:", error);
    }
  };

  // Cargar integrantes al expandir una jefatura
  const handleExpand = (index: number, managementId: number) => {
    setExpanded((prev) => (prev === index ? null : index)); // Expandir/contraer
    if (!jefaturas[index].integrantes) {
      fetchIntegrantes(managementId); // Cargar integrantes si no están definidos
    }
  };

  return (
    <div>
      {jefaturas.length > 0 ? (
        jefaturas.map((jef, index: number) => (
          <div
            key={index}
            className={`management-container ${expanded === index ? "expanded" : ""}`}
          >
            <div
              className="management-name-container"
              onClick={() => handleExpand(index, jef.id)}
            >
              <h3>{jef.name}</h3>
              <IconChevronDown className="management-chevron" />
            </div>
            <div className="users-container">
              {Array.isArray(jef.integrantes) && jef.integrantes.length > 0 ? (
                jef.integrantes.map((integ) => (
                  <div key={integ.id} className="management-user-row">
                    <IconUserShield />
                    <p>{integ.name}</p>
                    <p>{integ.email}</p>
                    <p>{integ.role}</p>
                  </div>
                ))
              ) : (
                <p>No hay integrantes disponibles</p>
              )}
              <div className="buttons-row">
                <Button
                  text="Editar Jefatura"
                  href={`/company/${details.id}/${jef.id}/edit-management`}
                  type="secondary"
                />
                <Button
                  text="Nuevo Miembro"
                  href={`/company/${details.id}/${jef.id}/new-user`}
                  type="secondary"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay jefaturas disponibles</p>
      )}
    </div>
  );
}

export default Accordion;