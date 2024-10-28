"use client";
import { useRouter } from "next/navigation";
import { fetchFirstCompany } from "../actions/fetchCompanies";

const Page = async () => {
  const router = useRouter();
  const firstIndex = await fetchFirstCompany();
  if (firstIndex > 0) {
    router.push(`/company/${firstIndex}`);
    return <h1>redirecting</h1>;
  } else {
    return <h1>crea tu compañia</h1>;
  }
};

export default Page;
