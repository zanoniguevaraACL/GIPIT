'use client'
import {Suspense} from "react";
import CandidateDetails from "@/components/organisms/CandidateDetails";
import Loader from "@/components/atoms/Loader";

export default function Page(props: {
  params: {
    candidateId: string;
    processId: string;
  };
}) {
  const { candidateId, processId } = props.params;
  return (
    <Suspense fallback={<Loader />}>
    <CandidateDetails
      id={parseInt(candidateId)}
      processId={parseInt(processId)}
    />
    </Suspense>
  );
}
