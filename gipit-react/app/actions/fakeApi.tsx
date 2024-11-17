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
    description: "esta es la descripcion",
    jefaturas: [
      {
        id: 1,
        name: "Operaciones",
        description: "esta es la descripcion",
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
        description: "esta es la descripcion",
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
    id: 1,
    name: "Consultor en Ciberseguridad",
    stage: "Entrevistas",
    startAt: "05/12/2024",
    endAt: null,
    preFiltered: 10,
    candidates: 4,
    status: "activo",
    candidatesIds: [4, 2, 3],
    jobOffer:
      "Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog. Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog. Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog. Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog. Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog. Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog. Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog. Este trabajo es un lorem ipsum dolor sit amet the quick brown fox jumps over the lazy dog",
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
    email: "pedro@gmail.com",
    phone: "+560000000",
    address: "#301 Martí RM Santiago",
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

export const fetchProfessionals = async (page: number) => {
  // Simula un retraso de 2 segundos
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("actual page: ", page); // Usaremos la página para traer los 15 registros correspondientes

  // Datos simulados para las distintas páginas
  const dataPage1 = [
    {
      id: 1,
      name: "John Doe",
      phone: "+1-555-0101",
      address: "1234 Elm St, Springfield",
      cv: "https://example.com/cv1.pdf",
      company: "Company Name",
      role: "Developer",
      startDate: "2023-01-10",
      endDate: "2024-05-15",
      hourValue: 45,
      status: "activo",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+1-555-0102",
      address: "5678 Oak St, Shelbyville",
      cv: "https://example.com/cv2.pdf",
      company: "Company Name",
      role: "Designer",
      startDate: "2023-02-14",
      endDate: null,
      hourValue: 50,
      status: "activo",
    },
    {
      id: 3,
      name: "Alice Johnson",
      phone: "+1-555-0103",
      address: "910 Maple Ave, Springfield",
      cv: "https://example.com/cv3.pdf",
      company: "Company Name",
      role: "Manager",
      startDate: "2023-03-01",
      endDate: "2024-06-30",
      hourValue: 60,
      status: "desvinculado",
    },
    {
      id: 4,
      name: "Bob Brown",
      phone: "+1-555-0104",
      address: "321 Pine St, Shelbyville",
      cv: "https://example.com/cv4.pdf",
      company: "Company Name",
      role: "Analyst",
      startDate: "2023-04-10",
      endDate: null,
      hourValue: 30,
      status: "activo",
    },
    {
      id: 5,
      name: "Charlie Davis",
      phone: "+1-555-0105",
      address: "789 Cedar St, Springfield",
      cv: "https://example.com/cv5.pdf",
      company: "Company Name",
      role: "Tester",
      startDate: "2023-05-15",
      endDate: "2024-03-20",
      hourValue: 28,
      status: "desvinculado",
    },
    {
      id: 6,
      name: "Diana King",
      phone: "+1-555-0106",
      address: "456 Birch Rd, Springfield",
      cv: "https://example.com/cv6.pdf",
      company: "Company Name",
      role: "Developer",
      startDate: "2023-06-01",
      endDate: null,
      hourValue: 70,
      status: "activo",
    },
    {
      id: 7,
      name: "Eve White",
      phone: "+1-555-0107",
      address: "1010 Walnut St, Shelbyville",
      cv: "https://example.com/cv7.pdf",
      company: "Company Name",
      role: "Designer",
      startDate: "2023-07-20",
      endDate: "2024-01-01",
      hourValue: 40,
      status: "desvinculado",
    },
    {
      id: 8,
      name: "Frank Green",
      phone: "+1-555-0108",
      address: "1111 Poplar Ave, Springfield",
      cv: "https://example.com/cv8.pdf",
      company: "Company Name",
      role: "Manager",
      startDate: "2023-08-01",
      endDate: null,
      hourValue: 65,
      status: "activo",
    },
    {
      id: 9,
      name: "Grace Lee",
      phone: "+1-555-0109",
      address: "2020 Ash St, Shelbyville",
      cv: "https://example.com/cv9.pdf",
      company: "Company Name",
      role: "Analyst",
      startDate: "2023-09-15",
      endDate: null,
      hourValue: 55,
      status: "activo",
    },
    {
      id: 10,
      name: "Henry Scott",
      phone: "+1-555-0110",
      address: "3030 Chestnut Rd, Springfield",
      cv: "https://example.com/cv10.pdf",
      company: "Company Name",
      role: "Tester",
      startDate: "2023-10-01",
      endDate: "2024-02-10",
      hourValue: 50,
      status: "desvinculado",
    },
    {
      id: 11,
      name: "Isabel Young",
      phone: "+1-555-0111",
      address: "4040 Willow St, Shelbyville",
      cv: "https://example.com/cv11.pdf",
      company: "Company Name",
      role: "Developer",
      startDate: "2023-11-15",
      endDate: null,
      hourValue: 47,
      status: "activo",
    },
    {
      id: 12,
      name: "Jack Hill",
      phone: "+1-555-0112",
      address: "5050 Spruce St, Springfield",
      cv: "https://example.com/cv12.pdf",
      company: "Company Name",
      role: "Designer",
      startDate: "2023-12-01",
      endDate: "2024-04-15",
      hourValue: 32,
      status: "activo",
    },
    {
      id: 13,
      name: "Karen Baker",
      phone: "+1-555-0113",
      address: "6060 Beech Rd, Shelbyville",
      cv: "https://example.com/cv13.pdf",
      company: "Company Name",
      role: "Manager",
      startDate: "2023-01-10",
      endDate: null,
      hourValue: 63,
      status: "activo",
    },
    {
      id: 14,
      name: "Liam Carter",
      phone: "+1-555-0114",
      address: "7070 Maple Ave, Springfield",
      cv: "https://example.com/cv14.pdf",
      company: "Company Name",
      role: "Analyst",
      startDate: "2023-02-20",
      endDate: null,
      hourValue: 29,
      status: "desvinculado",
    },
    {
      id: 15,
      name: "Mona Adams",
      phone: "+1-555-0115",
      address: "8080 Cedar St, Shelbyville",
      cv: "https://example.com/cv15.pdf",
      company: "Company Name",
      role: "Tester",
      startDate: "2023-03-15",
      endDate: "2024-05-01",
      hourValue: 41,
      status: "activo",
    },
  ];

  const dataPage2 = [
    {
      id: 16,
      name: "Nathan Evans",
      phone: "+1-555-0116",
      address: "9090 Pine St, Springfield",
      cv: "https://example.com/cv16.pdf",
      company: "Company Name",
      role: "Developer",
      startDate: "2023-04-25",
      endDate: null,
      hourValue: 60,
      status: "desvinculado",
    },
    {
      id: 17,
      name: "Olivia Brown",
      phone: "+1-555-0117",
      address: "1010 Oak Rd, Shelbyville",
      cv: "https://example.com/cv17.pdf",
      company: "Company Name",
      role: "Designer",
      startDate: "2023-05-30",
      endDate: "2024-07-20",
      hourValue: 34,
      status: "activo",
    },
    {
      id: 18,
      name: "Peter Stone",
      phone: "+1-555-0118",
      address: "1111 Elm St, Springfield",
      cv: "https://example.com/cv18.pdf",
      company: "Company Name",
      role: "Manager",
      startDate: "2023-06-10",
      endDate: null,
      hourValue: 54,
      status: "activo",
    },
    {
      id: 19,
      name: "Quinn Harper",
      phone: "+1-555-0119",
      address: "1212 Walnut Ave, Shelbyville",
      cv: "https://example.com/cv19.pdf",
      company: "Company Name",
      role: "Analyst",
      startDate: "2023-07-05",
      endDate: "2024-08-30",
      hourValue: 37,
      status: "activo",
    },
    {
      id: 20,
      name: "Rachel Porter",
      phone: "+1-555-0120",
      address: "1313 Chestnut St, Springfield",
      cv: "https://example.com/cv20.pdf",
      company: "Company Name",
      role: "Tester",
      startDate: "2023-08-01",
      endDate: null,
      hourValue: 52,
      status: "desvinculado",
    },
  ];

  // Seleccionar el batch en función de la página
  const batch = page === 1 ? dataPage1 : dataPage2;

  const response = {
    total: 60, // Simulación de un total de 60 registros en la base de datos
    batch, // Devolvemos el batch seleccionado
  };

  return response;
};
