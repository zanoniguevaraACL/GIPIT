import { fetchAllCompanies } from "@/app/actions/fetchCompanies";
import { InnerTabProps } from "@/app/lib/types";
import InnerListTabs from "@/components/organisms/InnerListTabs";
import "./layout.css";
import SearchBar from "@/components/molecules/SearchBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const companiesList: InnerTabProps[] = await fetchAllCompanies();

  return (
    <>
      <SearchBar
        buttonLink="/company/new-company"
        buttonText="Nuevo Cliente"
        noSearch={true}
      />
      <div className="company-page-container">
        <InnerListTabs tabs={companiesList} paramToCheck="companyId" />
        {children}
      </div>
    </>
  );
}
