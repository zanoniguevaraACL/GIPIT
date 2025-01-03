export const fetchProfessionalsBySelectedCompany = async (companyId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/candidate_management?company_id=${companyId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );
  
      if (!response.ok) {
        throw new Error('Error al obtener los profesionales');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };
  