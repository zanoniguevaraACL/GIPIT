"use client";
import { redirect, usePathname } from "next/navigation";
import "./layout.css";
import CandidatesList from "@/components/molecules/CandidatesList";
import { useAppContext } from "@/contexts/AppContext";
import EmptyState from "@/components/molecules/EmptyState";
import { IconUserScan } from "@tabler/icons-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Accede al valor de `showCandidates` y la función `setShowCandidates`
  const { showCandidates, candidatesTabs = [] } = useAppContext();
  const actualRoute = usePathname();

  if (!showCandidates || showCandidates < 0) {
    redirect("/" + actualRoute.split("/")[1] + "/" + actualRoute.split("/")[2]);
  }

  // Si no hay candidatos en la sección actual
  if (candidatesTabs.length === 0) {
    return (
      <EmptyState
        icon={<IconUserScan />}
        title="Aún no hay candidatos para mostrar"
        subheading="Podrás ver los candidatos cuando sean filtrados por ACL"
      />
    );
  }

  return (
    <div className="process-candidates-container">
      <CandidatesList />
      {children}
    </div>
  );
}
