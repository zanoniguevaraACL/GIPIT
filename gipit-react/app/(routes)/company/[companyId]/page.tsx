import { fetchCompanyDetails } from "@/app/actions/fetchCompanies";
import Button from "@/components/atoms/Button";
import Accordion from "@/components/molecules/Accordion";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
  params: {
    companyId: string;
  };
}) {
  const { companyId } = props.params;
  const companyDetails = await fetchCompanyDetails(parseInt(companyId));

  let logoUrl: string = "";
  if (companyDetails.logo) {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(companyDetails.logo.data))
    );
    logoUrl = `data:image/png;base64,${base64String}`; // Cambia el MIME type si no es PNG
  }

  return (
    <div className="company-details-container">
      <div className="company-details-header">
        <div className="flex-row gap-16 center-aligned">
          <img src={logoUrl} alt="company image" className="company-logo" />
          <h3>{companyDetails.name}</h3>
        </div>
        <div className="flex-row gap-16">
          <Button
            text="Editar Cliente"
            type="secondary"
            href={`/company/${companyId}/edit-company`}
          />
          <Button
            type="secondary"
            text="Nueva Jefatura"
            href={`/company/${companyId}/new-management`}
          />
        </div>
      </div>

      <Accordion details={companyDetails} />
    </div>
  );
}
