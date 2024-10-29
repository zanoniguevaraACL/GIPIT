import { fetchAllCompanies } from "@/app/actions/fetchCompanies";
import { InnerTabProps } from "@/app/lib/types";
import InnerListTabs from "@/components/organisms/InnerListTabs";
import "./layout.css";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companiesList: InnerTabProps[] = await fetchAllCompanies();
  return (
    <div className="company-page-container">
      <InnerListTabs tabs={companiesList} />
      {children}
    </div>
  );
}
