"use server";
import { fetchFirstC, fetchAllC, fetchCDetails } from "./fakeApi";

export const fetchFirstCompany = async () => {
  const res = await fetchFirstC();
  return res;
};

export const fetchAllCompanies = async () => {
  const res = await fetchAllC();
  return res;
};

export const fetchCompanyDetails = async (id: number) => {
  const res = await fetchCDetails(id);
  return res;
};
