import { redirect } from "next/navigation";
import { fetchFirstCompany } from "../../actions/fetchCompanies";

const Page = async () => {
  const firstIndex = await fetchFirstCompany();

  if (firstIndex > 0) {
    redirect(`/company/${firstIndex}`);
  } else {
    return <h1>crea tu compañia</h1>;
  }
};

export default Page;
