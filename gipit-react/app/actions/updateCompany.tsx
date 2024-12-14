"use server";
import sharp from "sharp";

export const updateCompany = async (
  formData: FormData,
  companyId: string
): Promise<{ message: string; route: string; statusCode: number }> => {
  try {
    // Extrae los datos del formulario
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;

    // Leer el archivo logo
    const logoFile = formData.get("logo") as File | null;
    let logo = null;

    if (logoFile && logoFile.size > 0) {
      const arrayBuffer = await logoFile.arrayBuffer();

      // Procesar el logo con Sharp
      logo = await sharp(Buffer.from(arrayBuffer))
        .resize(100, 100, {
          fit: "inside", // Mantener la relación de aspecto y ajustar dentro de 100x100
          withoutEnlargement: true, // Evitar agrandar imágenes más pequeñas que 100x100
        })
        .toFormat("png") // Convertir a PNG
        .toBuffer(); // Obtener el binario optimizado
    } else {
      // si no viene logo del form buscamos el antiguo para mantenerlo.
      const response = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/company/${companyId}`
        )
      ).json();
      logo = response.logo;
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
      route: `/company/${companyId}`,
      statusCode: 200,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error actualizando compañia: ${error.message}`,
        route: "/company",
        statusCode: 500,
      };
    } else {
      return {
        message: "Ocurrio un error ",
        route: "/company",
        statusCode: 500,
      };
    }
  }
};
