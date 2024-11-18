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
      candidatesIds: process.candidatesIds, 
      jobOffer: process.job_offer_description, 
    };
  } catch (error) {
    console.error('Error fetching process details:', error);
    return null;
  }
};


// fetchProcessCandidates.ts
// fetchProcessCandidates.ts
// actions/fetchProcess.ts

export const fetchProcessCandidates = async (processId: number): Promise<any> => {
  try {
    // Fetch process data by processId, including candidates
    const response = await fetch(`http://localhost:3001/api/process/${processId}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching process details: ${response.statusText}`);
    }
    
    const process = await response.json();
    
    // Check if there are any candidates associated with the process
    if (!process.candidate_process || process.candidate_process.length === 0) {
      console.warn('No candidates found for this process');
      return [];
    }

    // Extract the relevant candidate data
    const candidates = process.candidate_process.map((cp: any) => ({
      id: cp.candidates.id,
      name: cp.candidates.name,
      email: cp.candidates.email,
      phone: cp.candidates.phone,
      address: cp.candidates.address,
      jsongptText: cp.candidates.jsongpt_text || 'No additional comments',
    }));

    return candidates;
  } catch (error) {
    console.error('Error fetching process details:', error);
    return null;
  }
};





