import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { handleDisqualify } from "@/app/actions/handleDisqualify";

async function Page({ params }: { params: { processId: string } }) {
  const { processId } = params;
  const routeToRedirect = `/process/${processId}`;
  // esta ruta es la del cancel
  // pero ademas de eso:
  // este componente cuando haga el submit va a redirigir a la pantalla parsing-doc (un loading...)
  // y cuando esté listo el parseo del cv va a enviar al edit-candidate para ver lo parseado y guardar

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre del Profesional",
      type: "text",
      name: "name",
    },
    {
      label: "Teléfono",
      placeholder: "+56 000 00000",
      type: "text",
      name: "phone",
    },
    {
      label: "Correo electrónico",
      placeholder: "correo@server.com",
      type: "email",
      name: "email",
    },
    {
      label: "Dirección",
      placeholder: "# Calle, Ciudad, País",
      type: "text",
      name: "address",
    },
    {
      label: "CV",
      placeholder: "Subir CV",
      type: "file",
      name: "cv",
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar Nota" },
    ],
  ];

  return (
    <Modal rows={fields} onSubmit={handleDisqualify} title="Nuevo Candidato" />
  );
}

export default Page;