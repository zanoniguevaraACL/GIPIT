"use server";

export const serverAction = async (formData: FormData) => {
  const response = formData.get("name") as string;

  // Retorna un resultado (en este caso solo un log)
  return { message: response, statusCode: 200 };
};

export const fetchFirstC = async () => {
  const response = 6;
  return response;
};

export const fetchAllC = async () => {
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
      id: 18,
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
  console.log(id);

  const response = {
    id: id,
    name: "Desarrollador FullStack",
    stage: "Entrevistas",
    startAt: "05/12/2024",
    endAt: null,
    preFiltered: 10,
    candidates: 4,
    status: "activo",
    candidatesIds: [4, 2, 3],
    jobOffer: "Desarrollador Fullstack",
  };

  return response;
};

export const fetchProcessCandidates = async (ids: number[]) => {
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
  console.log(id);

  // este endpoint busca el candidato por el ID y además el comentario asociado y trae el % de compatibilidad.
  // IMPORTANTE: El % de compatibilidad solo se genera una vez, porque en distintos llamados GPT puede dar % diferentes.
  const response = {
    name: "Alan Donovan Olivares Villarreal",
    match: 98,
    totalExperience: 6,
    email: "alandon201288@gmail.com\n",
    phone: "+560000000",
    address: "Calle Fernando de Alva 11 Interior B-101",
    sumary: `<h2>Resumen General</h2>
<p>
Líder técnico con más de 8 años de experiencia en desarrollos Java,
principalmente en backend, utilizando tecnologías como Spring, SpringBoot,
JPA y bases de datos relacionales. Experiencia usando un marco ágil de
desarrollo con SCRUM. Actualmente enfocado en la coordinación de equipos en
proyectos bancarios, tales como proyectos web, servicios web (REST y SOAP)
y procesos programados.
</p>

<h2>Datos Personales</h2>
<p>
Teléfono: 5545728354<br>
Dirección: Calle Fernando de Alva 11 Interior B-101, Colonia Obrera, Delegación Cuauhtémoc, C.P 06800, Ciudad de México<br>
Correo electrónico: <a href="mailto:alandon201288@gmail.com">alandon201288@gmail.com</a>
</p>

<h2>Formación Profesional</h2>
<ul>
  <li>
      <strong>2007 - 2011:</strong> Universidad Autónoma del Estado de Hidalgo<br>
      Lic. en Sistemas Computacionales<br>
      Titulación: Examen EGEL en Ingeniería de Software (EGEL-ISOFT)
  </li>
</ul>

<h2>Experiencia Laboral</h2>
<ul>
  <li>
    <strong>2020 Agosto - 2021 Octubre: Accendo Banco – Líder Técnico</strong><br>
    Banco enfocado en satisfacer las necesidades a nivel financiero de personas morales.
    <ul>
      <li>Banca Electrónica de Personas Morales: Incorporación de módulos y mejora de experiencia de usuario, facilitando al área de negocio la incorporación de nuevos clientes y aumentando los ingresos en un 20%.</li>
      <li>Sistema de Conciliación de Transacciones de Facilitadores de Pago: Desarrollo desde el análisis hasta el soporte a producción, involucrándose con empresas fintech y aumentando la transaccionalidad del banco.</li>
      <li>Interconexión entre sistemas Bloomberg y TAS: Homologación de inversiones desde el análisis hasta el soporte a producción, logrando renombre para la institución al interactuar con la plataforma Bloomberg.</li>
    </ul>
  </li>
  <li>
    <strong>2017 Septiembre - 2020 Julio: AppWhere – Líder Técnico</strong><br>
    Empresa enfocada en servicios de tecnología a la medida para empresas del sector público y privado.
    <ul>
      <li>Carga Masiva de Inversiones: Proyecto desde la definición hasta el soporte a producción, permitiendo a la institución manejar volumen en inversiones tipo CEDES para personas físicas.</li>
      <li>Proceso de Prevención de Fraudes: Implementación desde cero, revisión de clientes, prospectos y beneficiarios en listas restringidas en procesos en línea y batch.</li>
    </ul>
  </li>
  <li>
    <strong>2016 Abril - 2017 Septiembre: AppWhere – Desarrollador Java Sr.</strong><br>
    Desempeñándose como desarrollador Java, realizando actividades como:
    <ul>
      <li>Soporte a producción y creación de nuevos proyectos en Banca Electrónica, favoreciendo la retención y adquisición de nuevos clientes mediante un módulo de referencias virtuales.</li>
      <li>Desarrollo de servicios web para consulta de información del CRM institucional, mejorando la interconexión entre aplicativos transaccionales.</li>
    </ul>
  </li>
  <li>
    <strong>2014 Enero - 2016 Marzo: INFOTEC – Desarrollador Java Sr.</strong><br>
    Institución gubernamental enfocada en investigación y desarrollo de software a la medida:
    <ul>
      <li>Incorporación de nuevos módulos al proyecto CONALITEG para la selección de libros de texto gratuito a nivel nacional.</li>
      <li>Desarrollo de nuevos módulos en el sistema SIISNE para el registro de personas interesadas en empleos agropecuarios en EU y Canadá.</li>
    </ul>
  </li>
  <li>
    <strong>2014 Abril - 2014 Diciembre: ONU PNUD – Desarrollador Java Jr.</strong><br>
    Programa de las Naciones Unidas para el Desarrollo, asignado a la Secretaría de Relaciones Exteriores:
    <ul>
      <li>Uso de Grails para migración de proyectos de PHP a Java, como el sistema de eventos SAE, mejorando la administración de visitas gubernamentales.</li>
    </ul>
  </li>
  <li>
    <strong>2012 Diciembre - 2014 Marzo: EGLOBAL – Desarrollador Java Jr.</strong><br>
    Empresa enfocada en transaccionalidad a través de TVP y PinPad para bancos:
    <ul>
      <li>Migración del aplicativo de procesamiento de cargos recurrentes BBVA, optimizando los tiempos en un 50%.</li>
    </ul>
  </li>
</ul>

<h2>Habilidades</h2>
<ul>
  <li>Lenguajes y tecnologías: Java, Spring, SpringBoot, EJB, WS SOAP, WS REST, Thymeleaf, Primefaces, Hibernate, MyBatis, Grails</li>
  <li>Bases de datos: Oracle, SQL Server, MySQL</li>
  <li>Servidores de aplicaciones: JBoss, Apache Tomcat, WebLogic, GlassFish</li>
</ul>

<h2>Idiomas</h2>
<ul>
  <li>Inglés</li>
  <li>Español</li>
</ul>

<h2>Cursos</h2>
<ul>
  <li>MySQL en 3CT Centro de Capacitación Tecnológica</li>
  <li>Java básico en 3CT Centro de Capacitación Tecnológica</li>
  <li>Java Swing en 3CT Centro de Capacitación Tecnológica</li>
  <li>Java Servlets en 3CT Centro de Capacitación Tecnológica</li>
  <li>Java JSP en 3CT Centro de Capacitación Tecnológica</li>
  <li>Arquitecto DEVOPS – MITOCODE</li>
  <li>FullStack - MITOCODE</li>
</ul>`,
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

export const fetchPro = async (id: number) => {
  console.log(id);

  const response = {
    name: "Pedro García Romero",
  };

  return response;
};

export const fetchEvaluations = async (page: number) => {
  // esta trae los registros de 10 en 10 !!!

  console.log("actual page: ", page); // Usaremos la página para traer los 10 registros correspondientes

  // Datos simulados para las distintas páginas
  const dataPage1 = [
    {
      id: 1,
      date: "2024-01-01",
      stack: 5.2,
      comunicacion: 6.8,
      motivacion: 5.1,
      cumplimiento: 5.3,
      promedio: 6.8,
      proyecction: "Excellent performance expected.",
      acciones: "Continue with current workflow.",
      clientComment: "Very satisfied with the progress.",
      benefit: "Team bonus approved.",
    },
    {
      id: 2,
      date: "2024-01-15",
      stack: 5.1,
      comunicacion: 5.4,
      motivacion: 6.3,
      cumplimiento: 6.6,
      promedio: 6.7,
      proyecction: "Good, but room for improvement.",
      acciones: "Enhance communication practices.",
      clientComment: "Overall positive, but communication could improve.",
      benefit: "Training provided.",
    },
    {
      id: 3,
      date: "2024-02-01",
      stack: 6.1,
      comunicacion: 5.3,
      motivacion: 6.6,
      cumplimiento: 5.2,
      promedio: 6.4,
      proyecction: "Consistently high performer.",
      acciones: "Maintain consistency.",
      clientComment: "Exceeded expectations.",
      benefit: "Performance bonus awarded.",
    },
    {
      id: 4,
      date: "2024-02-15",
      stack: 5.6,
      comunicacion: 6.0,
      motivacion: 6.4,
      cumplimiento: 5.2,
      promedio: 5.1,
      proyecction: "Needs improvement.",
      acciones: "Provide additional training.",
      clientComment: "Some concerns about deadlines.",
      benefit: "Coaching sessions planned.",
    },
    {
      id: 5,
      date: "2024-03-01",
      stack: 5.9,
      comunicacion: 6.7,
      motivacion: 5.1,
      cumplimiento: 5.6,
      promedio: 6.2,
      proyecction: "Steady growth observed.",
      acciones: "Encourage collaboration.",
      clientComment: "Great progress.",
      benefit: "Team outing scheduled.",
    },
    {
      id: 6,
      date: "2024-03-15",
      stack: 6.3,
      comunicacion: 6.2,
      motivacion: 6.5,
      cumplimiento: 6.0,
      promedio: 6.7,
      proyecction: "Good trajectory.",
      acciones: "Focus on communication skills.",
      clientComment: "Promising results.",
      benefit: "Additional resources allocated.",
    },
    {
      id: 7,
      date: "2024-04-01",
      stack: 6.1,
      comunicacion: 5.8,
      motivacion: 5.4,
      cumplimiento: 6.4,
      promedio: 5.9,
      proyecction: "High performer, consistent.",
      acciones: "Promote leadership opportunities.",
      clientComment: "Excellent execution.",
      benefit: "Leadership training offered.",
    },
    {
      id: 8,
      date: "2024-04-15",
      stack: 5.4,
      comunicacion: 6.1,
      motivacion: 5.5,
      cumplimiento: 5.3,
      promedio: 5.7,
      proyecction: "Needs focused improvement.",
      acciones: "Set clear milestones.",
      clientComment: "Progressing slowly.",
      benefit: "Support program initiated.",
    },
    {
      id: 9,
      date: "2024-05-01",
      stack: 6.4,
      comunicacion: 6.3,
      motivacion: 6.0,
      cumplimiento: 6.1,
      promedio: 6.6,
      proyecction: "Consistent performer.",
      acciones: "Leverage strengths for new projects.",
      clientComment: "Reliable and efficient.",
      benefit: "Recognition in team meetings.",
    },
    {
      id: 10,
      date: "2024-05-15",
      stack: 6.8,
      comunicacion: 5.7,
      motivacion: 6.3,
      cumplimiento: 6.1,
      promedio: 6.2,
      proyecction: "At risk of underperforming.",
      acciones: "Intensive skill-building sessions.",
      clientComment: "Concerns raised about quality.",
      benefit: "Performance improvement plan.",
    },
  ];

  const dataPage2 = [
    {
      id: 16,
      date: "2024-08-15",
      stack: 92,
      comunicacion: 91,
      motivacion: 93,
      cumplimiento: 95,
      promedio: 92.75,
      proyecction: "Exceeds expectations, suitable for advanced tasks.",
      acciones: "Assign challenging projects.",
      clientComment: "Delivered high-quality work ahead of schedule.",
      benefit: "Eligible for project bonuses.",
    },
    {
      id: 17,
      date: "2024-09-01",
      stack: 60,
      comunicacion: 58,
      motivacion: 65,
      cumplimiento: 62,
      promedio: 61.25,
      proyecction: "Requires significant improvement.",
      acciones: "Provide clear KPIs and regular feedback.",
      clientComment: "Concerns about consistency.",
      benefit: "Coaching program assigned.",
    },
    {
      id: 18,
      date: "2024-09-15",
      stack: 88,
      comunicacion: 90,
      motivacion: 87,
      cumplimiento: 89,
      promedio: 88.5,
      proyecction: "Reliable performer with potential for growth.",
      acciones: "Support leadership development.",
      clientComment: "Very responsive and efficient.",
      benefit: "Nominated for employee of the month.",
    },
    {
      id: 19,
      date: "2024-10-01",
      stack: 70,
      comunicacion: 72,
      motivacion: 75,
      cumplimiento: 73,
      promedio: 72.5,
      proyecction: "Steady progress, but needs more consistency.",
      acciones: "Set up bi-weekly mentoring sessions.",
      clientComment: "Improvement visible but not consistent.",
      benefit: "Professional development budget increased.",
    },
    {
      id: 20,
      date: "2024-10-15",
      stack: 96,
      comunicacion: 98,
      motivacion: 95,
      cumplimiento: 97,
      promedio: 96.5,
      proyecction: "Top performer with exceptional potential.",
      acciones: "Promote to key leadership role.",
      clientComment: "Flawless execution, highly recommended.",
      benefit: "Promotion approved.",
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

export const fetchEval = async (id: number) => {
  console.log(id);

  const response = {
    id: 1,
    date: "2024-01-05",
    stack: 5.2,
    comunicacion: 6.8,
    motivacion: 5.1,
    cumplimiento: 5.3,
    promedio: 6.8,
    proyecction: "Excellent performance expected.",
    acciones: "Continue with current workflow.",
    clientComment: "Very satisfied with the progress.",
    benefit: "Team bonus approved.",
  };

  return response;
};

export const fetchAllInvoices = async (id: number) => {
  console.log(id);

  const response = [
    {
      id: 1,
      cantidad: 5,
      total: 5600.0,
      date: "2024-12-16",
      expiration: "2025-01-05",
      status: "pendiente",
    },
    {
      id: 2,
      cantidad: 5,
      total: 5600.0,
      date: "2024-12-16",
      expiration: "2025-01-05",
      status: "pendiente",
    },
    {
      id: 3,
      cantidad: 5,
      total: 5600.0,
      date: "2024-12-16",
      expiration: "2025-01-05",
      status: "pagado",
    },
    {
      id: 4,
      cantidad: 5,
      total: 5600.0,
      date: "2024-12-16",
      expiration: "2025-01-05",
      status: "pendiente",
    },
  ];

  return response;
};

export const fetchInvoiceDetails = async (id: number) => {
  console.log(id);

  const response = {
    total: 9360.0,
    date: "2024-12-16",
    expiration: "2025-02-05",
    status: "pending",
    details: [
      {
        id: 1,
        name: "Luis Martínez",
        service: "Desarrollador Backend",
        rate: 35,
        hours: 100,
        subtotal: 3500,
        vat: 700,
        total: 4200,
        description: "Servicio de desarrollo backend para proyecto web",
      },
      {
        id: 2,
        name: "Ana González",
        service: "Diseñadora UX/UI",
        rate: 45,
        hours: 80,
        subtotal: 3600,
        vat: 720,
        total: 4320,
        description: "Diseño y prototipado de interfaz para app móvil",
      },
      {
        id: 3,
        name: "Carlos Rojas",
        service: "Consultor SEO",
        rate: 50,
        hours: 60,
        subtotal: 3000,
        vat: 600,
        total: 3600,
        description: "Optimización SEO y análisis de palabras clave",
      },
      {
        id: 4,
        name: "Sofía Ramírez",
        service: "Analista de Datos",
        rate: 40,
        hours: 120,
        subtotal: 4800,
        vat: 960,
        total: 5760,
        description: "Análisis de datos para mejorar estrategias de negocio",
      },
    ],
  };

  return response;
};
