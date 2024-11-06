"use server";
import { InnerTabProps } from "../lib/types";
import { fetchFirstC, fetchAllC, fetchCDetails } from "./fakeApi";

export const fetchFirstCompany = async () => {
  const res = await fetchFirstC();
  return res;
};

// export const fetchAllCompanies = async () => {
//   const res = await fetchAllC();
//   return res;
// };


export const fetchAllCompanies = async (): Promise<InnerTabProps[]> => {
  try {
    const response = await fetch(` http://localhost:3001/api/company`, {
       headers:{
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzA5MjM4ODMsImV4cCI6MTczMDkyNzQ4M30.zstGs5R-CjI62d7qojWSwWQhoSFVgEICkyL1CoPwKu0',
        'Content-Type': 'application/json'
       }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const companies = await response.json();
    console.log(companies)
    return companies.map((company: any) => ({
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

