export const fetchCompanies = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener las compañías");
    }
  
    return await response.json();
  };
  
  export const fetchManagements = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/management`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener las jefaturas");
    }
  
    return await response.json();
  }; 