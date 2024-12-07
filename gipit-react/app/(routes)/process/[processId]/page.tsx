"use client";
import { useAppContext } from "@/contexts/AppContext";
import EmptyState from "@/components/molecules/EmptyState";
import { IconUserScan } from "@tabler/icons-react";
import { redirect, usePathname } from "next/navigation";

export default function Page() {
  // Accede al valor de `showCandidates` y la función `setShowCandidates`
  // const { showCandidates, candidatesTabs = [] } = useAppContext(); // Valor predeterminado [] showCandidates en desuso

  const { candidatesTabs = [] } = useAppContext(); // Valor predeterminado []

  const actualRoute = usePathname();

  if (candidatesTabs.length > 0) {
    redirect(`${actualRoute}/${candidatesTabs[0].id}`); // Redirige al primer candidato disponible
  }

  return (
    <EmptyState
      icon={<IconUserScan />}
      title="Aún no hay candidatos para mostrar"
      subheading="Podrás ver los candidatos cuando sean filtrados por ACL"
    />
  );
}
