

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

// "use client";
// import { IconChevronDown, IconUserShield } from "@tabler/icons-react";
// import Button from "../atoms/Button";
// import "./accordion.css";
// import { useState, useEffect } from "react";

// interface Integrante {
//   name: string;
//   email: string;
//   role: string;
// }

// interface Jefatura {
//   name: string;
//   id: number;
//   integrantes?: Integrante[];
// }

// interface CompanyDetails {
//   id: number;
//   name: string;
//   jefaturas?: Jefatura[];
// }

// function Accordion({ details }: { details: CompanyDetails }) {
//   const [expanded, setExpanded] = useState<number>(0);
//   const [jefaturas, setJefaturas] = useState<Jefatura[]>(details.jefaturas || []);

//   // Función para actualizar los integrantes cuando se agregue un nuevo user-management
//   const fetchUpdatedUserManagements = async (managementId: number) => {
//     try {
//       const response = await fetch(`/api/user-managements/${managementId}`);
//       if (!response.ok) {
//         throw new Error("Error fetching updated user-managements");
//       }
//       const updatedIntegrantes = await response.json();
//       setJefaturas((prevJefaturas) =>
//         prevJefaturas.map((jef) =>
//           jef.id === managementId ? { ...jef, integrantes: updatedIntegrantes } : jef
//         )
//       );
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // Efecto que se ejecuta cuando se agregan nuevos user-managements
//   useEffect(() => {
//     // Aquí puedes configurar algún tipo de suscripción o polling
//     // para actualizar la lista de integrantes en tiempo real.
//     // Este ejemplo es solo un placeholder y debe ser implementado según tus necesidades.
//   }, []);

//   return (
//     <div>
//       {jefaturas.length > 0 ? (
//         jefaturas.map((jef, index: number) => {
//           return (
//             <div
//               key={index}
//               className={`management-container ${
//                 expanded === index ? "expanded" : ""
//               }`}
//             >
//               <div
//                 className="management-name-container"
//                 onClick={() => setExpanded(index)}
//               >
//                 <h3>{jef.name}</h3>
//                 <IconChevronDown className="management-chevron" />
//               </div>
//               <div className="users-container">
//                 {Array.isArray(jef.integrantes) && jef.integrantes.length > 0 ? (
//                   jef.integrantes.map((integ, i: number) => (
//                     <div key={i} className="management-user-row">
//                       <IconUserShield />
//                       <p>{integ.name}</p>
//                       <p>{integ.email}</p>
//                       <p>{integ.role}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No hay integrantes disponibles</p>
//                 )}
//                 <div className="buttons-row">
//                   <Button
//                     text="Editar Jefatura"
//                     href={`/company/${details.id}/${jef.id}/edit-management`}
//                     type="secondary"
//                   />
//                   <Button
//                     text="Nuevo Miembro"
//                     href={`/company/${details.id}/${jef.id}/new-user`}
//                     type="secondary"
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p>No hay jefaturas disponibles</p>
//       )}
//     </div>
//   );
// }

// export default Accordion;

// "use client";
// import { IconChevronDown, IconUserShield } from "@tabler/icons-react";
// import Button from "../atoms/Button";
// import "./accordion.css";
// import { useState, useEffect } from "react";

// interface Integrante {
//   name: string;
//   email: string;
//   role: string;
// }

// interface Jefatura {
//   name: string;
//   id: number;
//   integrantes?: Integrante[];
// }

// interface CompanyDetails {
//   id: number;
//   name: string;
//   jefaturas?: Jefatura[];
// }

// function Accordion({ details }: { details: CompanyDetails }) {
//   const [expanded, setExpanded] = useState<number>(0);
//   const [jefaturas, setJefaturas] = useState<Jefatura[]>(details.jefaturas || []);

//   // Función para obtener los datos actualizados de los user-managements
//   const fetchUpdatedData = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/user-management/8", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("user managers por aqui : "+ JSON.stringify(response))
//       if (!response.ok) {
//         throw new Error("Error fetching updated managements");
//       }
//       const updatedJefaturas = await response.json();
//       setJefaturas(updatedJefaturas);
//     } catch (error) {
//       console.error("Error fetching updated data:", error);
//     }
//   };

//   // Efecto que se ejecuta al montar el componente y cada vez que details.id cambie
//   useEffect(() => {
//     fetchUpdatedData();
//   }, [details.id]);

//   return (
//     <div>
//       {jefaturas.length > 0 ? (
//         jefaturas.map((jef, index: number) => {
//           return (
//             <div
//               key={index}
//               className={`management-container ${
//                 expanded === index ? "expanded" : ""
//               }`}
//             >
//               <div
//                 className="management-name-container"
//                 onClick={() => setExpanded(index)}
//               >
//                 <h3>{jef.name}</h3>
//                 <IconChevronDown className="management-chevron" />
//               </div>
//               <div className="users-container">
//                 {Array.isArray(jef.integrantes) && jef.integrantes.length > 0 ? (
//                   jef.integrantes.map((integ, i: number) => (
//                     <div key={i} className="management-user-row">
//                       <IconUserShield />
//                       <p>{integ.name}</p>
//                       <p>{integ.email}</p>
//                       <p>{integ.role}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No hay integrantes disponibles</p>
//                 )}
//                 <div className="buttons-row">
//                   <Button
//                     text="Editar Jefatura"
//                     href={`/company/${details.id}/${jef.id}/edit-management`}
//                     type="secondary"
//                   />
//                   <Button
//                     text="Nuevo Miembro"
//                     href={`/company/${details.id}/${jef.id}/new-user`}
//                     type="secondary"
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <p>No hay jefaturas disponibles</p>
//       )}
//     </div>
//   );
// }

// export default Accordion;
