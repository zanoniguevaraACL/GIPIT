"use client";
import "./accordion.css";

interface Integrante {
  name: string;
  email: string;
  role: string;
}

interface Jefatura {
  name: string;
  integrantes: Integrante[];
}

interface CompanyDetails {
  id: number;
  name: string;
  jefaturas: Jefatura[];
}

function Accordion({ details }: { details: CompanyDetails }) {
  console.log(details);

  return (
    <div>
      {details.jefaturas.map((jef, index: number) => {
        return (
          <div key={index} className="management-container">
            <h3>{jef.name}</h3>
            {jef.integrantes.map((integ, i: number) => {
              return (
                <div key={i} className="management-user-row">
                  <p>{integ.name}</p>
                  <p>{integ.email}</p>
                  <p>{integ.role}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
