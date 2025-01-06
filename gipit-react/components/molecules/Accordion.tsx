"use client";
import { IconChevronDown, IconEdit, IconUserShield } from "@tabler/icons-react";
import Button from "../atoms/Button";
import "./accordion.css";
import { useState } from "react";
import { CompanyDetails } from "@/app/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Accordion({ details }: { details: CompanyDetails }) {
  const [expanded, setExpanded] = useState<number>(0); // Jefatura expandida
  const actualRoute = usePathname();

  return (
    <div>
      <p className="text-12 jefaturas-details-card">JEFATURAS</p>
      {details?.jefaturas?.map((jef, index: number) => (
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
            <h4>{jef.name}</h4>
            <IconChevronDown className="management-chevron" />
          </div>
          <div className="users-container">
            {Array.isArray(jef.integrantes) && jef.integrantes.length > 0 ? (
              jef.integrantes.map((integ) => (
                <Link
                  href={`${actualRoute}/edit-user/${integ.user_id}`}
                  key={integ.user_id}
                  className="management-user-row"
                >
                  <div>
                    <IconUserShield />
                  </div>
                  <p className="text-14">{integ.name}</p>
                  <p className="text-14">{integ.email}</p>
                  <p className="text-14">{integ.position}</p>
                  <div className="icon-edit">
                    <IconEdit />
                  </div>
                </Link>
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
      ))}
    </div>
  );
}

export default Accordion;
