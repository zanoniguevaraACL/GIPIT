"use client";
import { IconChevronDown, IconUserShield } from "@tabler/icons-react";
import Button from "../atoms/Button";
import "./accordion.css";
import { useState } from "react";
import { CompanyDetails } from "@/app/lib/types";

function Accordion({ details }: { details: CompanyDetails }) {
  const [expanded, setExpanded] = useState<number>(0); // Jefatura expandida

  return (
    <div>
      {details.jefaturas ? (
        details.jefaturas.map((jef, index: number) => (
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
              {Array.isArray(jef.integrantes) && jef.integrantes.length > 0 ? (
                jef.integrantes.map((integ) => (
                  <div key={integ.id} className="management-user-row">
                    <IconUserShield />
                    <p>{integ.name}</p>
                    <p>{integ.email}</p>
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
