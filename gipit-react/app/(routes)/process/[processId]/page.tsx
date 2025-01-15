"use client";
import { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import EmptyState from "@/components/molecules/EmptyState";
import { IconUserScan } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const { candidatesTabs = [], isLoadingCandidates } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Solo redirigir si no estamos ya en una ruta de candidato
    if (candidatesTabs.length > 0 && candidatesTabs[0].id && !pathname.includes('/candidate/')) {
      const timeoutId = setTimeout(() => {
        router.push(`${pathname}/${candidatesTabs[0].id}`);
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [candidatesTabs, pathname, router]);

  if (isLoadingCandidates) {
    return <p>Cargando candidatos...</p>;
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

  return null;
}