"use server";


interface Process {
  id: number;
  job_offer: string;
  status: string;
  opened_at: string | null;
  closed_at: string | null;
  pre_filtered: boolean;
  candidate_process: { candidates: { id: number } }[];
  job_offer_description: string | null;
}

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
      batch: data.batch.map((process: Process) => ({
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

export const fetchProcessDetails = async (id: number): Promise<{
  id: number;
  name: string;
  stage: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: number;
  status: string;
  candidatesIds: number[];
  jobOffer: string | null;
} | null> => {
  try {
    const response = await fetch(`http://localhost:3001/api/process/${id}`);

    if (!response.ok) {
      throw new Error('Error fetching process details');
    }

    const process = await response.json();

    return {
      id: process.id,
      name: process.job_offer,
      stage: process.status ?? '',
      startAt: process.opened_at ? new Date(process.opened_at).toLocaleDateString() : '',
      endAt: process.closed_at ? new Date(process.closed_at).toLocaleDateString() : null,
      preFiltered: process.pre_filtered ? 1 : 0,
      candidates: process.candidate_process?.length || 0,
      status: process.status ?? '',
      candidatesIds: process.candidate_process?.map((cp: { candidates: { id: number } }) => cp.candidates.id) || [],
      jobOffer: process.job_offer_description ?? '',
    };
  } catch (error) {
    console.error('Error fetching process details:', error);
    return null;
  }
};

export const fetchProcessCandidates = async (processId: number): Promise<{
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  jsongptText: string;
}[] | null> => {
  try {
    const response = await fetch(`http://localhost:3001/api/process/${processId}`);

    if (!response.ok) {
      throw new Error(`Error fetching process details: ${response.statusText}`);
    }

    const process = await response.json();

    if (!process.candidate_process || process.candidate_process.length === 0) {
      console.warn('No candidates found for this process');
      return [];
    }

    return process.candidate_process.map((cp: { candidates: { id: number; name: string; email: string; phone: string; address: string; jsongpt_text: string } }) => ({
      id: cp.candidates.id,
      name: cp.candidates.name,
      email: cp.candidates.email,
      phone: cp.candidates.phone,
      address: cp.candidates.address,
      jsongptText: cp.candidates.jsongpt_text || 'No additional comments',
    }));
  } catch (error) {
    console.error('Error fetching process details:', error);
    return null;
  }
};
