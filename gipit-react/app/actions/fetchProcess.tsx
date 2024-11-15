"use server";

export const fetchProcess = async (page: number) => {
  try {
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


export const fetchProcessDetails = async (id: number) => {

  try {
    const response = await fetch(`http://localhost:3001/api/process/${id}`);

    if (!response.ok) {
      throw new Error('Error fetching process details');
    }

    const processData = await response.json();

    const candidatesIds = processData.candidate_process
      ? processData.candidate_process.map((cp: any) => cp.candidates.id) 
      : [];

    return {
      ...processData,
      candidatesIds, 
    };
  } catch (error) {
    console.error('Error fetching process details:', error);
    throw error; 
  }
};




export const fetchProcessCandidates = async (candidatesIds: number[]) => {

  try {
    const response = await fetch(`http://localhost:3001/api/candidates?ids=${candidatesIds.join(',')}`);

    if (!response.ok) {
      throw new Error('Error fetching candidates');
    }

    const candidatesData = await response.json();
    
    return candidatesData;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error; 
  }
};



