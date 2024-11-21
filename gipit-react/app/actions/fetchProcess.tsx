"use server";

export const fetchProcess = async (page: number) => {
  try {
    if (page < 1) {
      throw new Error("Page number must be greater than 0.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/process?page=${page}`, {
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
      batch: data.batch.map((process) => ({
        id: process.id,
        name: process.job_offer, 

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
// Define the Proceso type inside the file
type Proceso = {
  id: number;
  name: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: number;
  status: string;
  candidatesIds: number[];
  jobOffer: string | null;
  stage: string;
  isInternal: boolean;
};

export const fetchProcessDetails = async (id: number): Promise<Proceso | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/process/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error("Error fetching process details");
    }

    const proceso = await response.json(); // Retrieve the proceso object from the response

    // Ensure `candidate_process` is an array
    const candidateProcess = Array.isArray(proceso.candidate_process) ? proceso.candidate_process : [];

    // If no candidates are found, log a warning
    if (candidateProcess.length === 0) {
      console.warn('No candidates found in the process data');
    }

    // Extract the candidate IDs
    const candidatesIds = candidateProcess.map((candidate: { id: number }) => candidate.id);

    return {
      id: proceso.processId, // Assuming this is the correct field
      name: proceso.jobOffer, // Assuming this is the correct field
      startAt: proceso.openedAt ? new Date(proceso.openedAt).toLocaleDateString() : '',
      endAt: proceso.closedAt ? new Date(proceso.closedAt).toLocaleDateString() : null,
      preFiltered: proceso.preFiltered ? 1 : 0,
      candidates: candidateProcess.length || 0,
      status: proceso.status ?? '',
      candidatesIds: candidatesIds,
      jobOffer: proceso.jobOfferDescription ?? '', // Assuming this is the correct field
      stage: proceso.stage ?? 'Unknown', // Default value for missing stage
      isInternal: proceso.isInternal ?? false, // Default value for missing isInternal
    };
  } catch (error) {
    console.error('Error fetching process details:', error);
    return null; // Return null in case of any error
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/process/${processId}`);

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
