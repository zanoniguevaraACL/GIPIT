import { fetchCompanyDetails } from "@/app/actions/fetchCompanies";
import Button from "@/components/atoms/Button";
import Accordion from "@/components/molecules/Accordion";
import Image from "next/image";

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
  //const searchParams = await props.searchParams;
  //const query = searchParams?.query || "";

  return (
    <div className="company-details-container">
      <div className="company-details-header">
        <div className="flex-row gap-16 center-aligned">
        <Image src={'/'} alt="company image" width={10} height={10} />
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
