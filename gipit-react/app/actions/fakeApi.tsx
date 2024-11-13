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

  const response = 2;
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

export const fetchProcess = async (page: number) => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("actual page: ", page); // Usaremos la página para traer los 15 registros correspondientes

  // Datos simulados para las distintas páginas
  const dataPage1 = [
    {
      id: 1,
      name: "Administrador de Bases de Datos",
      stage: "Oferta",
      startAt: "30/11/2024",
      endAt: "24/02/2025",
      preFiltered: 13,
      candidates: 7,
      state: "cerrado",
    },
    {
      id: 2,
      name: "Gerente de Proyecto",
      stage: "Evaluación Técnica",
      startAt: "07/01/2024",
      endAt: "10/04/2024",
      preFiltered: 14,
      candidates: 8,
      state: "cerrado",
    },
    {
      id: 3,
      name: "Asistente de Marketing",
      stage: "Entrevistas",
      startAt: "17/08/2024",
      endAt: "25/11/2024",
      preFiltered: 9,
      candidates: 8,
      state: "cerrado",
    },
    {
      id: 4,
      name: "Gerente de Proyecto",
      stage: "Entrevistas",
      startAt: "11/08/2024",
      endAt: null,
      preFiltered: 9,
      candidates: 8,
      state: "activo",
    },
    {
      id: 5,
      name: "Consultor de TI",
      stage: "Contratado",
      startAt: "27/11/2024",
      endAt: null,
      preFiltered: 9,
      candidates: 2,
      state: "activo",
    },
    {
      id: 6,
      name: "Arquitecto de Software",
      stage: "Contratado",
      startAt: "24/05/2024",
      endAt: null,
      preFiltered: 8,
      candidates: 6,
      state: "activo",
    },
    {
      id: 7,
      name: "Desarrollador Frontend",
      stage: "Evaluación Técnica",
      startAt: "29/11/2024",
      endAt: "19/12/2024",
      preFiltered: 5,
      candidates: 8,
      state: "cerrado",
    },
    {
      id: 8,
      name: "Desarrollador Frontend",
      stage: "Entrevistas",
      startAt: "17/05/2024",
      endAt: null,
      preFiltered: 19,
      candidates: 7,
      state: "activo",
    },
    {
      id: 9,
      name: "Analista de Datos",
      stage: "Preselección",
      startAt: "01/07/2024",
      endAt: "08/10/2024",
      preFiltered: 12,
      candidates: 1,
      state: "cerrado",
    },
    {
      id: 10,
      name: "Administrador de Bases de Datos",
      stage: "Oferta",
      startAt: "30/03/2024",
      endAt: null,
      preFiltered: 18,
      candidates: 8,
      state: "activo",
    },
    {
      id: 11,
      name: "Administrador de Bases de Datos",
      stage: "Evaluación Técnica",
      startAt: "10/08/2024",
      endAt: null,
      preFiltered: 15,
      candidates: 8,
      state: "activo",
    },
    {
      id: 12,
      name: "Analista Financiero",
      stage: "Oferta",
      startAt: "14/07/2024",
      endAt: null,
      preFiltered: 11,
      candidates: 7,
      state: "activo",
    },
    {
      id: 13,
      name: "Ingeniero de Machine Learning",
      stage: "Oferta",
      startAt: "02/03/2024",
      endAt: "27/04/2024",
      preFiltered: 15,
      candidates: 10,
      state: "cerrado",
    },
    {
      id: 14,
      name: "Desarrollador Backend",
      stage: "Preselección",
      startAt: "09/09/2024",
      endAt: null,
      preFiltered: 19,
      candidates: 2,
      state: "activo",
    },
    // Agrega hasta 15 registros en total para page 1
  ];

  const dataPage2 = [
    {
      id: 15,
      name: "Consultor en Ciberseguridad",
      stage: "Entrevistas",
      startAt: "05/12/2024",
      endAt: null,
      preFiltered: 10,
      candidates: 4,
      state: "activo",
    },
    {
      id: 16,
      name: "Ingeniero de Datos",
      stage: "Oferta",
      startAt: "15/03/2024",
      endAt: "28/04/2024",
      preFiltered: 18,
      candidates: 7,
      state: "cerrado",
    },
    // Agrega otros registros específicos para page 2
  ];

  // Seleccionar el batch en función de la página
  const batch = page === 1 ? dataPage1 : dataPage2;

  const response = {
    total: 60, // Simulación de un total de 60 registros en la base de datos
    batch, // Devolvemos el batch seleccionado
  };

  return response;
};

export const fetchProcessDetails = async (id: number) => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(id);

  const response = {
    id: 15,
    name: "Consultor en Ciberseguridad",
    stage: "Entrevistas",
    startAt: "05/12/2024",
    endAt: null,
    preFiltered: 10,
    candidates: 4,
    status: "activo",
    candidatesIds: [4, 2, 3],
  };

  return response;
};

export const fetchProcessCandidates = async (ids: number[]) => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(ids);

  const response = [
    {
      name: "Alfredo Espinosa Rodríguez",
      id: "1", // Cambia los IDs a strings si `paramToCheck` devuelve un string
      selected: true,
      match: 98,
    },
    {
      name: "Leonardo Marchant Rodríguez",
      id: "2",
      selected: false,
      match: 32,
    },
    {
      name: "Mariamelia Rodríguez Rodríguez",
      id: "4",
      selected: false,
      match: 97,
    },
  ];

  return response;
};

export const fetchCandidateDetails = async (id: number) => {
  // Simula un retraso de 2 segundos
  console.log("resolviendo id ", id);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // este endpoint busca el candidato por el ID y además el comentario asociado y trae el % de compatibilidad.
  // IMPORTANTE: El % de compatibilidad solo se genera una vez, porque en distintos llamados GPT puede dar % diferentes.
  const response = {
    name: "Alfredo Espinosa Rodríguez",
    match: 98,
    totalExperience: 6,
    sumary:
      "Figma ipsum component variant main layer. Pixel team rotate draft slice scale asset stroke. Text pen rectangle bold opacity object slice ipsum asset figma. Underline team arrow hand line layout inspect team component auto. Scale draft edit main main create. Subtract slice effect list variant. Bullet group bullet ellipse style bullet. Edit rotate team main scrolling scale thumbnail. Main stroke rectangle overflow layer mask slice rotate duplicate. Component layout plugin hand union editor layer ellipse bullet mask. Layer layer create frame ellipse group. Flatten edit reesizing duplicate vertical export boolean boolean. Stroke pixel content asset blur opacity ellipse union.",
    techSkills:
      "Figma ipsum component variant main layer. Pixel team rotate draft slice scale asset stroke. Text pen rectangle bold opacity object slice ipsum asset figma. Underline team arrow hand line layout inspect team component auto. Scale draft edit main main create. Subtract slice effect list variant. Bullet group bullet ellipse style bullet. Edit rotate team main scrolling scale thumbnail. Main stroke rectangle overflow layer mask slice rotate duplicate. Component layout plugin hand union editor layer ellipse bullet mask. Layer layer create frame ellipse group. Flatten edit reesizing duplicate vertical export boolean boolean. Stroke pixel content asset blur opacity ellipse union.",
    softSkills:
      "Figma ipsum component variant main layer. Pixel team rotate draft slice scale asset stroke. Text pen rectangle bold opacity object slice ipsum asset figma. Underline team arrow hand line layout inspect team component auto. Scale draft edit main main create. Subtract slice effect list variant. Bullet group bullet ellipse style bullet. Edit rotate team main scrolling scale thumbnail. Main stroke rectangle overflow layer mask slice rotate duplicate. Component layout plugin hand union editor layer ellipse bullet mask. Layer layer create frame ellipse group. Flatten edit reesizing duplicate vertical export boolean boolean. Stroke pixel content asset blur opacity ellipse union.",
    clientNote: {
      tech: 7,
      soft: 8,
      comment:
        "El candidato es muy bueno para el frontend y maneja muchos frameworks, pero es un poco más débil para el backend",
    },
  };

  return response;
};
