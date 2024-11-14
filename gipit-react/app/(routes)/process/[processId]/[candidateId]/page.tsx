import CandidateDetails from "@/components/organisms/CandidateDetails";

export default function Page(props: {
  params: {
    candidateId: string;
    processId: string;
  };
}) {
  const { candidateId, processId } = props.params;
  return (
    <CandidateDetails
      id={parseInt(candidateId)}
      processId={parseInt(processId)}
    />
  );
}
