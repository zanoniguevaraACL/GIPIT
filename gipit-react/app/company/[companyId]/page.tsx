import { fetchCompanyDetails } from "@/app/actions/fetchCompanies";
import Accordion from "@/components/molecules/Accordion";

interface ParamsCompany {
  params: {
    companyId: string;
  };
}

export default async function Page({ params }: ParamsCompany) {
  const { companyId } = params;
  const companyDetails = await fetchCompanyDetails(parseInt(companyId));

  return (
    <div className="company-details-container">
      <h2>{`Detalles de ${companyDetails.name}`}</h2>
      <Accordion details={companyDetails} />
    </div>
  );
}
