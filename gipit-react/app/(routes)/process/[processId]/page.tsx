"use client";
import { useAppContext } from "@/contexts/AppContext";
import EmptyState from "@/components/molecules/EmptyState";
import { IconUserScan } from "@tabler/icons-react";
import { redirect, usePathname } from "next/navigation";

export default function Page() {
  // Accede al valor de `showCandidates` y la función `setShowCandidates`
  const { showCandidates } = useAppContext();
  const actualRoute = usePathname();

  if (showCandidates && showCandidates > 0) {
    redirect(`${actualRoute}/${showCandidates}`);
  }

  return (
    <EmptyState
      icon={<IconUserScan />}
      title="Aún no hay candidatos para mostrar"
      subheading="Podrás ver los candidatos cuando sean filtrados por ACL"
    />
  );
}
