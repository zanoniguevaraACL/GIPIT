import "./layout.css";
import CandidatesList from "@/components/molecules/CandidatesList";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="process-candidates-container">
      <CandidatesList />
      {children}
    </div>
  );
}
