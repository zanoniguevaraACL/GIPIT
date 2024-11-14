"use server";

export const fetchProcess = async (page: number) => {
  try {
    // Fetch processes from the backend with pagination (using page as a query param)
    const response = await fetch(`http://localhost:3001/api/process?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching processes');
    }

    const data = await response.json();

    // Return the data in the required format
    return {
      total: data.total,
      batch: data.batch.map((process: any) => ({
        id: process.id,
        name: process.job_offer, // Map job_offer to 'name'
        stage: process.status, // Map status to 'stage'
        startAt: process.opened_at ? new Date(process.opened_at).toLocaleDateString() : '', // Format start date
        endAt: process.closed_at ? new Date(process.closed_at).toLocaleDateString() : null, // Format end date
        preFiltered: process.pre_filtered ? 1 : 0, // Convert boolean to number
        candidates: process.candidate_process ? process.candidate_process.length : 0, // Count candidates
        state: process.status, // Map status to 'state'
      })),
    };
  } catch (error) {
    console.error('Error fetching process data:', error);
    return {
      total: 0,
      batch: [],
    };
  }
};




export const fetchProcessDetails = async (id: number) => {
    try {
      
      const processResponse = await fetch(`http://localhost:3001/api/process/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store"
      });
  
      if (!processResponse.ok) {
        throw new Error("Error fetching process name");
      }
  
      
  
     
     
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