// import Modal from "@/components/molecules/Modal";
// import { FormInputsRow } from "@/app/lib/types";

// import { fetchCDetails } from "@/app/actions/fakeApi";
// import { updateManagement } from "@/app/actions/updateManagement";

// async function Page({
//   params,
// }: {
//   params: { companyId: string; managementId: string };
// }) {
//   const { companyId, managementId } = params;
//   const routeToRedirect = `/company/${companyId}`;

//   const previousValues = await fetchCDetails(parseInt(companyId));

//   let managementIndex = 0;

//   previousValues.jefaturas.forEach((jef, index) => {
//     if (jef.id == parseInt(managementId)) {
//       managementIndex = index;
//     }
//   });

//   const fields: FormInputsRow = [
//     { label: "Logo", type: "file", name: "logo" },
//     {
//       label: "Nombre",
//       placeholder: "Nombre de la empresa",
//       type: "text",
//       name: "name",
//       defaultValue: previousValues.jefaturas[managementIndex].name,
//     },
//     {
//       label: "Descripción",
//       name: "description",
//       placeholder: "Alguna nota relacionada al cliente",
//       type: "textarea",
//       defaultValue: previousValues.jefaturas[managementIndex].description,
//     },
//     [
//       { type: "cancel", value: "Cancelar", href: routeToRedirect },
//       { type: "submit", value: "Guardar" },
//     ],
//   ];

//   return <Modal rows={fields} onSubmit={updateManagement} />;
// }

// export default Page;

"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { updateManagement } from "@/app/actions/updateManagement";
import { fetchCDetails } from "@/app/actions/fakeApi";

async function Page({
  params,
}: {
  params: { companyId: string; managementId: string };
}) {
  // Extrae y convierte los IDs a números enteros
  const companyId = parseInt(params.companyId, 10);
  const managementId = parseInt(params.managementId, 10);

  // Verifica si los IDs son números válidos
  if (isNaN(companyId) || isNaN(managementId)) {
    throw new Error("Invalid managementId or companyId. They must be numbers.");
  }

  const routeToRedirect = `/company/${companyId}`;

  const previousValues = await fetchCDetails(companyId);

  let managementIndex = 0;
  previousValues.jefaturas.forEach((jef, index) => {
    if (jef.id === managementId) {
      managementIndex = index;
    }
  });

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre de la jefatura",
      type: "text",
      name: "name",
      defaultValue: previousValues.jefaturas[managementIndex].name,
    },
    {
      label: "Descripción",
      name: "description",
      placeholder: "Alguna nota relacionada a la jefatura",
      type: "textarea",
      defaultValue: previousValues.jefaturas[managementIndex].description,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar" },
    ],
  ];

  // Ajusta la llamada a onSubmit para pasar todos los argumentos necesarios
  return (
    <Modal
      rows={fields}
      onSubmit={(formData) => updateManagement(formData, managementId.toString(), companyId.toString())}
    />
  );
}

export default Page;
