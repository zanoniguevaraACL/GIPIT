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
import { fetchEvaluations } from "@/app/actions/fakeApi";

interface Evaluation {
  id: number;
  date: string;
  stack: number;
  comunicacion: number;
  motivacion: number;
  cumplimiento: number;
  promedio: number;
  proyecction: string;
  acciones: string;
  clientComment: string;
  benefit: string;
}

interface Column<T> {
  name: string;
  key: keyof T; // Clave que referencia la propiedad del objeto T
  width: number; // Ancho de la columna
}

interface ResponseData<T> {
  total: number;
  columns: Column<T>[];
  batch: T[];
}

interface ProcessedEvaluations {
  labels: string[];
  stacks: number[];
  comunicacion: number[];
  motivacion: number[];
  cumplimiento: number[];
  promedio: number[];
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
  params: {
    proId: string;
  };
}) {
  const { proId } = props.params;
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

  const registros = await fetchEvaluations(page);
  const registrosForDashboard = await fetchEvaluations(1); // este siempre se trae los ultimos registros para mostrar en el chart porque si no la paginacion cambia el chart

  const processLastEvaluations = (
    evaluations: Evaluation[]
  ): ProcessedEvaluations => {
    // Tomar las últimas 6 evaluaciones
    const lastSixEvaluations = evaluations.slice(-6);

    // Construir el objeto con los arrays correspondientes
    return {
      labels: lastSixEvaluations.map((evaluation) => evaluation.date), // Fechas de las evaluaciones
      stacks: lastSixEvaluations.map((evaluation) => evaluation.stack), // Valores de stack
      comunicacion: lastSixEvaluations.map(
        (evaluation) => evaluation.comunicacion
      ), // Valores de comunicación
      motivacion: lastSixEvaluations.map((evaluation) => evaluation.motivacion), // Valores de motivación
      cumplimiento: lastSixEvaluations.map(
        (evaluation) => evaluation.cumplimiento
      ), // Valores de cumplimiento
      promedio: lastSixEvaluations.map((evaluation) => evaluation.promedio), // Valores de promedio
    };
  };
  const ultimosResultados = processLastEvaluations(registrosForDashboard.batch);

  const dashboardData = {
    card1: {
      title: "Promedio de evaluación",
      hasChart: true,
      chartData: {
        labels: ultimosResultados.labels,
        values: ultimosResultados.promedio,
      },
      icon: <IconAward />,
    },
    card2: {
      title: "Dominio del stack tecnológico",
      hasChart: false,
      chartData: {
        values: ultimosResultados.stacks,
      },
      icon: <IconStack3 />,
    },
    card3: {
      title: "Habilidades de comunicación",
      hasChart: false,
      chartData: {
        values: ultimosResultados.comunicacion,
      },
      icon: <IconMessage2Share />,
    },
    card4: {
      title: "Responsabilidad y cumplimiento",
      hasChart: false,
      chartData: {
        values: ultimosResultados.cumplimiento,
      },
      icon: <IconCircleDashedCheck />,
    },
    card5: {
      title: "Proactividad y motivación",
      hasChart: false,
      chartData: {
        values: ultimosResultados.motivacion,
      },
      icon: <IconFlame />,
    },
  };

  const dataGridData: ResponseData<Evaluation> = {
    columns: [
      { name: "Fecha", key: "date", width: 1.1 },
      { name: "Stack", key: "stack", width: 1 },
      { name: "Comunicación", key: "comunicacion", width: 1 },
      { name: "Motivación", key: "motivacion", width: 1 },
      { name: "Cumplimiento", key: "cumplimiento", width: 1 },
      { name: "Promedio", key: "promedio", width: 1 },
    ],
    total: registros.total,
    batch: registros.batch,
  };

  return (
    <div className="max-container">
      <div className="pro-details-container">
        {/* Header */}
        <div className="pro-header">
          <div className="pro-avatar">PG</div>
          <div>
            <div className="flex-row gap-12 name-n-mail-container">
              <h4>Pedro García Romero</h4>
              <p className="text-14">(pedro@cencosud.cl)</p>
            </div>
            <p className="text-12 position">
              Jefe de proyectos en Operaciones, Cencosud
            </p>
          </div>
          <div className="pro-buttons-container">
            <Button
              text="Detalles del Profesional"
              href={`/pros/${proId}/edit-pro`}
              type="tertiary"
            />
            <Button
              text="Nueva Evaluación"
              href={`/pros/${proId}/new-evaluation`}
              type="primary"
            />
          </div>
        </div>
        <br></br>
        {/* Dashboard */}
        <p className="section-title text-14">Evaluación profesional</p>
        <div className="pro-rates-dashboard">
          <DashboardCard datos={dashboardData.card1} />
          <DashboardCard datos={dashboardData.card2} />
          <DashboardCard datos={dashboardData.card3} />
          <DashboardCard datos={dashboardData.card4} />
          <DashboardCard datos={dashboardData.card5} />
        </div>
        {/* Historial */}
        <p className="section-title text-14">Historial de evaluaciones</p>
        <DataGrid data={dataGridData} baseUrl={`/pros/${proId}`} />
      </div>
    </div>
  );
}
