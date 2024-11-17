"use server";





export const fetchProcess = async (page: number) => {
  try {
    if (page < 1) {
      throw new Error("Page number must be greater than 0.");
    }

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

//modificar
// fetchProcessDetails.ts
export const fetchProcessDetails = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:3001/api/process/${id}`);
    
    if (!response.ok) {
      throw new Error('Error fetching process details');
    }
    
    const process = await response.json();

    return {
      id: process.id,
      name: process.job_offer,
      stage: process.status,
      startAt: process.opened_at ? new Date(process.opened_at).toLocaleDateString() : '',
      endAt: process.closed_at ? new Date(process.closed_at).toLocaleDateString() : null,
      preFiltered: process.pre_filtered ? 1 : 0,
      candidates: process.candidate_process?.length || 0,
      status: process.status,
      candidatesIds: process.candidatesIds, // from the response (candidates in the process)
      jobOffer: process.job_offer_description, // assuming this field exists
    };
  } catch (error) {
    console.error('Error fetching process details:', error);
    return null;
  }
};


// fetchProcessCandidates.ts
// fetchProcessCandidates.ts

export const fetchProcessCandidates = async (ids: number[]): Promise<any[]> => {
  try {
    // Ensure that `ids` is a valid array and has at least one element
    if (!Array.isArray(ids) || ids.length === 0) {
      console.warn('No candidate IDs provided, skipping candidate fetch.');
      return []; // Return an empty array if no IDs are provided
    }

    // Join the IDs to pass as a query string parameter
    const response = await fetch(`http://localhost:3001/api/candidates?ids=${ids.join(',')}`);
    
    if (!response.ok) {
      throw new Error('Error fetching candidates');
    }

    const candidates = await response.json();

    return candidates.map((candidate: any) => ({
      name: candidate.name,
      id: candidate.id.toString(),  // Adjust the ID format as needed
      selected: candidate.selected,
      match: candidate.match || 0,  // assuming match is a field in the candidate data
    }));
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return []; // Return an empty array if an error occurs
  }
};


