"use server";

import sharp from "sharp";

export const handleCreateCompany = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    // Leer el archivo logo
    const logoFile = formData.get("logo") as File | null;
    let logoBuffer = null;

    if (logoFile) {
      const arrayBuffer = await logoFile.arrayBuffer();

      // Procesar el logo con Sharp
      logoBuffer = await sharp(Buffer.from(arrayBuffer))
        .resize(100, 100) // Redimensionar a un máximo de 800x800
        .toFormat("png") // Convertir a PNG
        .toBuffer(); // Obtener el binario optimizado
    }

    // Crear el payload con el logo optimizado
    const payload = {
      name,
      description,
      logo: logoBuffer ? Array.from(logoBuffer) : null, // Convertir el Buffer a un array para serializar
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/company`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creando compañia: ${errorText}`);
    }

    return {
      message: "Compañia creada exitosamente",
      route: "/company",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: `Error creando compañia: ${error.message}`,
        route: "/company",
      };
    } else {
      return {
        message: "Ocurrió un error desconocido",
        route: "/company",
      };
    }
  }
};
