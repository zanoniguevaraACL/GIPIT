"use server";
import sharp from "sharp";

export const updateCompany = async (formData: FormData, companyId: string) => {
  try {
    // Extrae los datos del formulario
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;

    // Leer el archivo logo
    const logoFile = formData.get("logo") as File | null;
    let logo = null;

    if (logoFile) {
      const arrayBuffer = await logoFile.arrayBuffer();

      // Procesar el logo con Sharp
      logo = await sharp(Buffer.from(arrayBuffer))
        .resize(100, 100) // Redimensionar a un máximo de 800x800
        .toFormat("png") // Convertir a PNG
        .toBuffer(); // Obtener el binario optimizado
    }

    // Construye el objeto payload dinámicamente
    const payload: { [key: string]: string | Buffer | null } = {};
    if (name) payload.name = name;
    if (description) payload.description = description;
    if (logo) payload.logo = logo;

    // Realiza la solicitud PUT a tu backend con JSON
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // Muestra el texto de la respuesta si hay un error
      const errorText = await response.text();
      throw new Error(`Error updating company: ${errorText}`);
    }

    return {
      message: "Compañia actualizada correctamente",
      route: "/company",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error actualizando compañia: ${error.message}`,
        route: "/company",
      };
    } else {
      return {
        message: "Ocurrio un error ",
        route: "/company",
      };
    }
  }
};
