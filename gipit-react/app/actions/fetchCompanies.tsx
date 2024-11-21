"use server";
import { fetchFirstC} from "./fakeApi";

export const fetchFirstCompany = async () => {
  const res = await fetchFirstC();
  return res;
};

 export const fetchAllCompanies = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Error fetching companies");
    }

    const companiesList = await response.json();
    return companiesList;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};



export const fetchCompanyDetails = async (id: number) => {
  try {
    
    const companyResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/company/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    });

    if (!companyResponse.ok) {
      throw new Error("Error fetching company name");
    }

    const companyData = await companyResponse.json();

    
    const managementResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/management?company_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    });

    if (!managementResponse.ok) {
      throw new Error("Error fetching managements");
    }

    const jefaturas = await managementResponse.json();

   
    const companyDetails = {
      id: id,
      name: companyData.name, 
      jefaturas: jefaturas, 
      logo: companyData.logo,
    };

    return companyDetails;
  } catch (error) {
    console.error("Error:", error);
    return {
      id: id,
      name: "Nombre no disponible",
      jefaturas: [],
      logo:'/logopordefault.png'
    };
  }
};
