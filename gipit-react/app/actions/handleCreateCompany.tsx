"use server";

import { serverAction } from "./fakeApi";

export const handleCreateCompany = async (formData: FormData) => {
  const res = await serverAction(formData);
  return { message: res.message, route: "/dashboard" };
};
