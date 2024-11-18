import LineChart from "@/components/atoms/LineChart";
import "./dashboardCard.css";
import { ReactElement } from "react";

function DashboardCard({
  datos,
}: {
  datos: {
    title: string;
    hasChart: boolean;
    chartData: { labels?: string[]; values: number[] };
    icon: ReactElement;
  };
}) {
  const chartData = datos.chartData;

  const lastValue: number = datos.chartData.values.at(-1) ?? 0;
  const penultimateValue: number = datos.chartData.values.at(-2) ?? -1;

  const variation: number =
    Math.round((lastValue - penultimateValue) * 100) / 100;

  let expression = "";
  let color = "var(--light-secondary)";
  if (penultimateValue > -1) {
    if (variation > 0) {
      expression = `+ ${variation} respecto a la evaluación anterior`;
      color = "#0095FF";
    } else if (variation < 0) {
      expression = `${variation} respecto a la evaluación anterior`;
      color = "#E04E29";
    } else {
      expression = `Igual a la evaluación anterior`;
      color = "#0095FF";
    }
  } else {
    expression = "No hay evaluaciones anteriores";
  }

  return (
    <div className="dashboard-card-container">
      {datos.hasChart && (
        <div className="chart-container">
          <LineChart datos={chartData} />
        </div>
      )}
      <div className="text-container">
        <h2>{datos.chartData.values.at(-1)}</h2>
        <h4>{datos.title}</h4>
        <p className="text-12 subheading" style={{ color: color }}>
          {expression}
        </p>
      </div>
      <div className="icon-container" style={{ color: color }}>
        <div className="overlay-color" style={{ backgroundColor: color }}></div>
        {datos.icon}
      </div>
    </div>
  );
}

export default DashboardCard;
