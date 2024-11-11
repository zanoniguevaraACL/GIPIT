import CandidateDetails from "@/components/organisms/CandidateDetails";

export default function Page(props: {
  params: {
    candidateId: string;
  };
}) {
  const { candidateId } = props.params;
  return <CandidateDetails id={parseInt(candidateId)} />;
}
