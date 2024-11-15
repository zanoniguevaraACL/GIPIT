"use server";

// fetchProcessCount.ts
export const fetchProcessCount = async (pageSize: number = 15) => {
  try {
    const response = await fetch('http://localhost:3001/api/process_count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching process count');
    }

    const data = await response.json();
    const totalProcesses = data.totalProcesses;

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalProcesses / pageSize);

    return {
      totalProcesses,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching process count:', error);
    return {
      totalProcesses: 0,
      totalPages: 0,
    };
  }
};



export const fetchProcess = async (page: number) => {
  try {
    // Ensure the page number is valid
    if (page < 1) {
      throw new Error("Page number must be greater than 0.");
    }

    // Fetch processes from the backend API with the page query parameter
    const response = await fetch(`http://localhost:3001/api/process?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is not OK, throw an error
    if (!response.ok) {
      throw new Error('Error fetching processes');
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the total number of processes and the current batch of processes
    return {
      total: data.total,
      batch: data.batch.map((process: any) => ({
        id: process.id,
        name: process.job_offer, 
        stage: process.status,
        startAt: process.opened_at ? new Date(process.opened_at).toLocaleDateString() : '', 
        endAt: process.closed_at ? new Date(process.closed_at).toLocaleDateString() : null, 
        preFiltered: process.pre_filtered ? 1 : 0, 
        candidates: process.candidate_process ? process.candidate_process.length : 0,
        state: process.status,
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
