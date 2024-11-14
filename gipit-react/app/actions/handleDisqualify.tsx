"use server";

import { serverAction } from "./fakeApi";

export const handleDisqualify = async (
  formData: FormData,
  actualRoute: string
) => {
  const res = await serverAction(formData);
  const routeToRedirect = "/" + actualRoute.split("/").slice(1, 4).join("/");
  return { message: res.message, route: routeToRedirect };
};
