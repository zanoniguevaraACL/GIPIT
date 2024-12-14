"use client";
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";
import { useState, useEffect } from "react";
import { userSchema } from "@/app/lib/validationSchemas";
import Loader from "@/components/atoms/Loader";
import { updateUser } from "@/app/actions/updateUser";

function Page({ params }: { params: { companyId: string; userId: string } }) {
  const { companyId, userId } = params;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    position: "",
  });

  const routeToRedirect = `/company/${companyId}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error("error al recuperar información del usuario");
        }
        const data = await response.json();
        setUserData({
          name: data.name || "",
          email: data.email || "",
          position: data.position || "",
        });
      } catch (error) {
        console.error("error al recuperar información del usuario: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const fields: FormInputsRow = [
    {
      label: "Nombre",
      placeholder: "Nombre",
      type: "text",
      name: "name",
      defaultValue: userData.name,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Correo electrónico del usuario",
      type: "email",
      defaultValue: userData.email,
    },
    {
      label: "Cargo",
      name: "position",
      placeholder: "Cargo",
      type: "text",
      defaultValue: userData.position,
    },
    [
      { type: "cancel", value: "Cancelar", href: routeToRedirect },
      { type: "submit", value: "Guardar" },
    ],
  ];

  if (loading) return <Loader />;

  return (
    <Modal
      rows={fields}
      onSubmit={(formData) =>
        updateUser(formData, parseInt(userId), parseInt(companyId))
      }
      validationSchema={userSchema}
    />
  );
}

export default Page;
