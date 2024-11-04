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
    { id: 8, name: "Cencosud" },
    { id: 9, name: "BCI Seguros" },
    { id: 10, name: "Walmart" },
    { id: 11, name: "Cencosud" },
    { id: 111, name: "BCI Seguros" },
    { id: 1111, name: "Walmart" },
    { id: 11111, name: "Cencosud" },
    { id: 111111, name: "BCI Seguros" },
    { id: 1111111, name: "Walmart" },
    { id: 222, name: "Cencosud" },
    { id: 2222, name: "BCI Seguros" },
    { id: 22222, name: "Walmart" },
    { id: 333, name: "Cencosud" },
    { id: 33333, name: "BCI Seguros" },
    { id: 333333, name: "Walmart" },
    { id: 444, name: "Cencosud" },
    { id: 4444, name: "BCI Seguros" },
    { id: 44444, name: "Walmart" },
  ];
  return response;
};

export const fetchCDetails = async (id: number) => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = {
    id: id,
    name: "Cencosud",
    jefaturas: [
      {
        id: 1,
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
        id: 2,
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
