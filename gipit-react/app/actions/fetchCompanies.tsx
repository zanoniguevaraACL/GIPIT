"use server";

import { InnerTabProps } from "../lib/types";
import { fetchFirstC, fetchCDetails } from "./fakeApi";

export const fetchFirstCompany = async () => {
  const res = await fetchFirstC();
  return res;
};

// export const fetchAllCompanies = async () => {
//   const res = await fetchAllC();
//   return res;
// };
type Company = {
  id: number;
  name: string;
};

export const fetchAllCompanies = async (): Promise<InnerTabProps[]> => {
  try {
    const response = await fetch(` ${process.env.NEXT_PUBLIC_API_URL}/company`, {
       headers:{
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        'Content-Type': 'application/json'
       }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const companies = await response.json();
    console.log(companies)
    return companies.map((company: Company) => ({
      id: company.id,
      name: company.name,
    }));

  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchCompanyDetails = async (id: number) => {
  const res = await fetchCDetails(id);
  return res;
};

