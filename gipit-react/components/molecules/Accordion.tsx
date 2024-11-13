

"use client";
import { IconChevronDown, IconUserShield } from "@tabler/icons-react";
import Button from "../atoms/Button";
import "./accordion.css";
import { useState } from "react";

interface Integrante {
  name: string;
  email: string;
  role: string;
}

interface Jefatura {
  name: string;
  id: number;
  integrantes?: Integrante[]; // Hacemos integrantes opcional
}

interface CompanyDetails {
  id: number;
  name: string;
  jefaturas?: Jefatura[]; // Hacemos jefaturas opcional
}

function Accordion({ details }: { details: CompanyDetails }) {
  const [expanded, setExpanded] = useState<number>(0);

  // Aseguramos que jefaturas sea un array vacío si no está definido
  const jefaturas = details.jefaturas || [];

  return (
    <div>
      {jefaturas.length > 0 ? (
        jefaturas.map((jef, index: number) => {
          return (
            <div
              key={index}
              className={`management-container ${
                expanded === index ? "expanded" : ""
              }`}
            >
              <div
                className="management-name-container"
                onClick={() => setExpanded(index)}
              >
                <h3>{jef.name}</h3>
                <IconChevronDown className="management-chevron" />
              </div>
              <div className="users-container">
                {Array.isArray(jef.integrantes) ? (
                  jef.integrantes.map((integ, i: number) => {
                    return (
                      <div key={i} className="management-user-row">
                        <IconUserShield />
                        <p>{integ.name}</p>
                        <p>{integ.email}</p>
                        <p>{integ.role}</p>
                      </div>
                    );
                  })
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
          );
        })
      ) : (
        <p>No hay jefaturas disponibles</p>
      )}
    </div>
  );
}

export default Accordion;
