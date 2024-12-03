"use server";
import { updateCandidateAction } from "./updateCandidateAction";

export const handleEditCandidate = async (
  formData: FormData,
  actualRoute: string
) => {
  // Obtener el ID del candidato y el proceso de la ruta actual
	const processId = actualRoute.split("/")[2];
	const candidateId = actualRoute.split("/")[3];
  
  // Llamar a la acción de actualización
  const res = await updateCandidateAction(candidateId, formData);

  return { message: res.message, route: `/process/${processId}/${candidateId}` };
};