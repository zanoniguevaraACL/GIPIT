"use client";
import { redirect, usePathname } from "next/navigation";
import "./layout.css";
import CandidatesList from "@/components/molecules/CandidatesList";
import { useAppContext } from "@/contexts/AppContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Accede al valor de `showCandidates` y la función `setShowCandidates`
  const { showCandidates } = useAppContext();
  const actualRoute = usePathname();

  if (!showCandidates || showCandidates < 0) {
    redirect("/" + actualRoute.split("/")[1] + "/" + actualRoute.split("/")[2]);
  }
  return (
    <div className="process-candidates-container">
      <CandidatesList />
      {children}
    </div>
  );
}
