import "./proId.css";
import Button from "@/components/atoms/Button";
import DashboardCard from "../../../../components/molecules/DashboardCard";
import {
  IconAward,
  IconCircleDashedCheck,
  IconFlame,
  IconMessage2Share,
  IconStack3,
} from "@tabler/icons-react";
import DataGrid from "@/components/molecules/DataGrid";
import { fetchProfessionalDetails } from "@/app/actions/fetchProfessionalDetails";

// Define la interfaz para los elementos de evaluación
interface EvaluationItem {
  date: string;
  eval_stack: number;
  eval_comunicacion: number;
  eval_motivacion: number;
  eval_cumplimiento: number;
}

type DashboardData = Record<
  string,
  {
    title: string;
    hasChart: boolean;
    chartData: {
      labels?: string[];
      values: number[];
    };
    icon: JSX.Element;
  }
>;
const dashboardData: DashboardData = {
  card1: {
    title: "Promedio de evaluación",
    hasChart: true,
    chartData: {  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
      values: [5, 6, 7, 4, 5] }, // Los valores del gráfico },
    icon: <IconAward />,
  },
  card2: {
    title: "Dominio del stack tecnológico",
    hasChart: false,
    chartData: { values: [] },
    icon: <IconStack3 />,
  },
  card3: {
    title: "Habilidades de comunicación",
    hasChart: false,
    chartData: { values: [] },
    icon: <IconMessage2Share />,
  },
  card4: {
    title: "Responsabilidad y cumplimiento",
    hasChart: false,
    chartData: { values: [] },
    icon: <IconCircleDashedCheck />,
  },
  card5: {
    title: "Proactividad y motivación",
    hasChart: false,
    chartData: { values: [] },
    icon: <IconFlame />,
  },
};

interface Column<T> {
  name: string;
  key: keyof T;
  width: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataGridData<T = any> {
  columns: Column<T>[];
  total: number;
  batch: T[];
}


export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
  params: { proId: string };
}) {
  const { proId } = props.params;

  if (!proId) return <p>Error: El ID del profesional no está disponible.</p>;

  let professionalDetails;
  try {
    professionalDetails = await fetchProfessionalDetails(proId);
  } catch (error) {
    console.error("Error fetching professional details:", error);
    return <p>Error cargando los detalles del profesional.</p>;
  }

  const evaluationData: EvaluationItem[] =
    professionalDetails?.post_sales_activities || [];

  // Cálculo de promedios
  const eval_motivacionPromedio =
    evaluationData.reduce(
      (sum, evalItem) => sum + (evalItem.eval_motivacion || 0),
      0
    ) / evaluationData.length || 0;

  const eval_comunicacionPromedio =
    evaluationData.reduce(
      (sum, evalItem) => sum + (evalItem.eval_comunicacion || 0),
      0
    ) / evaluationData.length || 0;

  const eval_cumplimientoPromedio =
    evaluationData.reduce(
      (sum, evalItem) => sum + (evalItem.eval_cumplimiento || 0),
      0
    ) / evaluationData.length || 0;

  const eval_stackPromedio =
    evaluationData.reduce(
      (sum, evalItem) => sum + (evalItem.eval_stack || 0),
      0
    ) / evaluationData.length || 0;

  // Asignación de promedios a los datos de las tarjetas
  dashboardData.card1.chartData = {
    labels: evaluationData.map((item) => 
      item.date ? new Date(item.date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) : "Fecha inválida"
    ),
    values: evaluationData.map((item) => {
      // Calculamos el promedio de cada registro para las cuatro categorías
      const promedioIndividual =
        (item.eval_stack + item.eval_comunicacion + item.eval_motivacion + item.eval_cumplimiento) /
        4;
  
      // Redondeamos y lo devolvemos
      return parseFloat(promedioIndividual.toFixed(1));
    }),
  };

  dashboardData.card2.chartData.values = [eval_stackPromedio];
  dashboardData.card3.chartData.values = [eval_comunicacionPromedio];
  dashboardData.card4.chartData.values = [eval_cumplimientoPromedio];
  dashboardData.card5.chartData.values = [eval_motivacionPromedio];

  // Datos de la tabla de evaluación
  const dataGridData: DataGridData = {
    columns: [
      { name: "Fecha", key: "date", width: 1.1 },
      { name: "Stack", key: "stack", width: 1 },
      { name: "Comunicación", key: "comunicacion", width: 1 },
      { name: "Motivación", key: "motivacion", width: 1 },
      { name: "Cumplimiento", key: "cumplimiento", width: 1 },
      { name: "Promedio", key: "promedio", width: 1 },
    ],
    total: evaluationData.length,
    batch: evaluationData.map((item) => ({
      date: item.date
        ? new Date(item.date).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Fecha inválida",
      stack: item.eval_stack,
      comunicacion: item.eval_comunicacion,
      motivacion: item.eval_motivacion,
      cumplimiento: item.eval_cumplimiento,
      promedio: (
        (item.eval_comunicacion +
          item.eval_motivacion +
          item.eval_cumplimiento +
          item.eval_stack) /
        4
      ).toFixed(1),
    })),
  };

  return (
    <div className="max-container">
      <div className="pro-details-container">
        <div className="pro-header">
          <div className="pro-avatar">
            {professionalDetails?.avatar ? (
              <img src={professionalDetails.avatar} alt="Avatar" />
            ) : (
              "PG"
            )}
          </div>
          <div>
            <h4>{professionalDetails?.candidates.name || "Nombre no disponible"}</h4>
            <p>{professionalDetails?.candidates.email || "(correo@ejemplo.com)"}</p>
            <p>{professionalDetails?.position || "Posición no disponible"}</p>
          </div>
          <div className="pro-buttons-container">
            <Button text="Detalles del Profesional" href={`/candidates/${proId}/edit-pro`} type="tertiary" />
            <Button text="Nueva Evaluación" href={`/candidates/${proId}/new-evaluation`} type="primary" />
          </div>
        </div>
        <p className="section-title text-14">Evaluación profesional</p>
        <div className="pro-rates-dashboard">
          {Object.keys(dashboardData).map((key) => (
            <DashboardCard key={key} datos={dashboardData[key]} />
          ))}
        </div>
        <p className="section-title text-14">Historial de evaluaciones</p>
        <DataGrid data={dataGridData} baseUrl={`/candidate/`} />
      </div>
    </div>
  );
}
