"use server";

type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  jsongpt_text: string;
};

type ProcessData = {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date | null;
  pre_filtered: number;
  candidates: Candidate[]; 
  state: string;
};

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

export const fetchProcess = async (page: number) => {
  try {
    if (page < 1) {
      throw new Error("El número de página debe ser mayor que 0.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Error al obtener los procesos');
    }

    const data = await response.json();
    // console.log("DATA FETCHPROCESS--> :", data.batch)

    return {
      total: data.total,
      batch: data.batch.map((process: ProcessData) => ({
        id: process.id,
        name: process.name,
        startAt: process.startAt ? process.startAt: '',
        endAt: process.endAt ? process.endAt: null,
        preFiltered: process.pre_filtered ? 1 : 0,
        candidates: process.candidates ? process.candidates.length : 0,
        state: process.state,
      })),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener los procesos: ${error.message || "Error desconocido"}`);
    } else {
      throw new Error("Error desconocido al obtener los procesos");
    }
  }
};

export const fetchProcessDetails = async (id: number): Promise<Proceso | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', 
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del proceso");
    }

    const proceso = await response.json();

    const candidateProcess = Array.isArray(proceso.candidate_process) ? proceso.candidate_process : [];

    const candidatesIds = candidateProcess.map((candidate: { id: number }) => candidate.id);

    return {
      id: proceso.processId,
      name: proceso.jobOffer,
      startAt: proceso.openedAt ? new Date(proceso.openedAt).toLocaleDateString() : '',
      endAt: proceso.closedAt ? new Date(proceso.closedAt).toLocaleDateString() : null,
      preFiltered: proceso.preFiltered ? 1 : 0,
      candidates: candidateProcess.length || 0,
      status: proceso.status ?? '',
      candidatesIds: candidatesIds,
      jobOffer: proceso.jobOfferDescription ?? '',
      stage: proceso.stage ?? 'Desconocido',
      isInternal: proceso.isInternal ?? false,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener los detalles del proceso: ${error.message || "Error desconocido"}`);
    } else {
      throw new Error("Error desconocido al obtener los detalles del proceso");
    }
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/process/${processId}`);

    if (!response.ok) {
      throw new Error(`Error al obtener los detalles del proceso: ${response.statusText}`);
    }

    const proceso = await response.json();

    if (!proceso.candidate_process || proceso.candidate_process.length === 0) {
      return [];
    }

    return proceso.candidate_process.map((cp: { candidates: { id: number; name: string; email: string; phone: string; address: string; jsongpt_text: string } }) => ({
      id: cp.candidates.id,
      name: cp.candidates.name,
      email: cp.candidates.email,
      phone: cp.candidates.phone,
      address: cp.candidates.address,
      jsongptText: cp.candidates.jsongpt_text || 'No hay comentarios adicionales',
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener los candidatos del proceso: ${error.message || "Error desconocido"}`);
    } else {
      throw new Error("Error desconocido al obtener los candidatos del proceso");
    }
  }
};
