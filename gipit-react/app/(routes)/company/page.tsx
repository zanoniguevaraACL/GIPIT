export const dynamic = "force-dynamic"; // No pre-rendering
import { redirect } from "next/navigation";
import { fetchFirstCompany } from "../../actions/fetchCompanies";

const Page = async () => {
  const firstCompany = await (await fetchFirstCompany()).json();

  if (firstCompany) {
    redirect(`/company/${firstCompany.id}`);
  } else {
    return <h1>crea tu compañia {firstCompany.id}</h1>;
  }
};

export default Page;
