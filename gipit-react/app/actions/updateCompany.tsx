// "use server";

// export const updateCompany = async (formData: FormData, companyId: string) => {
//   try {
//     // Extrae los datos del formulario
//     const name = formData.get("name") as string;
//     const description = formData.get("description") as string;
//     const logo = formData.get("logo") as string;

//     // Crea el objeto JSON con los datos a actualizar
//     const payload = {
//       name,
//       description,
//       logo,
//     };

//     // Realiza la solicitud PUT a tu backend con JSON
//     const response = await fetch(`http://localhost:3001/api/company/${companyId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       // Muestra el texto de la respuesta si hay un error
//       const errorText = await response.text();
//       throw new Error(`Error updating company: ${errorText}`);
//     }

//     return {
//       message: "Company updated successfully",
//       route: "/company",
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error:", error.message);
//       return {
//         message: `Error updating company: ${error.message}`,
//         route: "/company",
//       };
//     } else {
//       console.error("Unknown error:", error);
//       return {
//         message: "An unknown error occurred",
//         route: "/company",
//       };
//     }
//   }
// };

// // Función de envoltura para usar con `onSubmit`
// export const handleUpdateCompany = (companyId: string) => {
//   return (formData: FormData) => updateCompany(formData, companyId);
// };

"use server";

export const updateCompany = async (formData: FormData, companyId: string) => {
  try {
    // Extrae los datos del formulario
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const logoFile = formData.get("logo");

    // Asegúrate de que el logo sea un string o null
    const logo = typeof logoFile === "string" ? logoFile : null;

    // Construye el objeto payload dinámicamente
    const payload: { [key: string]: string | null } = {};
    if (name) payload.name = name;
    if (description) payload.description = description;
    if (logo) payload.logo = logo;

    // Realiza la solicitud PUT a tu backend con JSON
    const response = await fetch(`http://localhost:3001/api/company/${companyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Muestra el texto de la respuesta si hay un error
      const errorText = await response.text();
      throw new Error(`Error updating company: ${errorText}`);
    }

    return {
      message: "Company updated successfully",
      route: "/company",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return {
        message: `Error updating company: ${error.message}`,
        route: "/company",
      };
    } else {
      console.error("Unknown error:", error);
      return {
        message: "An unknown error occurred",
        route: "/company",
      };
    }
  }
};
