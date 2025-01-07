"use client";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import EmptyState from "@/components/molecules/EmptyState";
import { IconUserScan } from "@tabler/icons-react";
import { redirect, usePathname, useParams } from "next/navigation";


export default function Page() {
  // Accede al valor de `showCandidates` y la función `setShowCandidates`
  // const { showCandidates, candidatesTabs = [] } = useAppContext(); // Valor predeterminado [] showCandidates en desuso
  const { candidatesTabs = [], isLoadingCandidates, refreshCandidates } = useAppContext(); // Valor predeterminado [
  const actualRoute = usePathname();
  const { processId } = useParams(); // Obtiene el processId de la URL


  useEffect(() => {
    refreshCandidates(Number(processId), "entrevistas");
  }, [refreshCandidates, processId]);


  if (isLoadingCandidates) {
    return <p>Cargando candidatos...</p>;
  }

  if (candidatesTabs.length > 0) {
    redirect(`${actualRoute}/${candidatesTabs[0].id}`);
    return null;
  }

  if (candidatesTabs.length === 0) {
    return (
      <EmptyState
        icon={<IconUserScan />}
        title="Aún no hay candidatos para mostrar"
        subheading="Podrás ver los candidatos cuando sean filtrados por ACL"
      />
    );
  }

  return null; // Evita renderizar nada mientras se redirige
}
