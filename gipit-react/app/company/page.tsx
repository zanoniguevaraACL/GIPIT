"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFirstCompany } from "../actions/fetchCompanies";

const Page = () => {
  const router = useRouter();
  const [firstIndex, setFirstIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const index = await fetchFirstCompany();
      setFirstIndex(index);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (firstIndex !== null) {
      if (firstIndex > 0) {
        router.push(`/company/${firstIndex}`);
      }
    }
  }, [firstIndex, router]);

  if (firstIndex === null) {
    return <h1>Loading...</h1>;
  } else if (firstIndex > 0) {
    return <h1>redirecting</h1>;
  } else {
    return <h1>crea tu compañia</h1>;
  }
};

export default Page;