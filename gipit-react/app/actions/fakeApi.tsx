"use server";

export const serverAction = async (formData: FormData) => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = formData.get("name") as string;

  // Retorna un resultado (en este caso solo un log)
  return { message: response };
};

export const fetchFirstC = async () => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = 5;
  return response;
};

export const fetchAllC = async () => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = [
    { id: 5, name: "Cencosud" },
    { id: 6, name: "BCI Seguros" },
    { id: 7, name: "Walmart" },
  ];
  return response;
};

export const fetchCDetails = async (id: number) => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = {
    id: 5,
    name: "Cencosud",
    jefaturas: [
      {
        name: "Operaciones",
        integrantes: [
          {
            name: " Pedro Romero",
            email: "pedro@cencosud.cl",
            role: "Jefe de operaciones",
          },
          {
            name: " laura García",
            email: "laura@cencosud.cl",
            role: "Subgerente de operaciones",
          },
        ],
      },
      {
        name: "Comercial",
        integrantes: [
          {
            name: " María Romero",
            email: "maria@cencosud.cl",
            role: "Jefe Comercial",
          },
        ],
      },
    ],
  };
  return response;
};
