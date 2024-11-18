"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler, // Plugin necesario para relleno
} from "chart.js";
import { ScriptableContext } from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler // Registra el plugin Filler
);

const LineChart = ({
  datos,
}: {
  datos: { labels?: string[]; values: number[] };
}) => {
  const gradientBackground = (
    ctx: CanvasRenderingContext2D,
    height: number
  ) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(0, 149, 255, 0.8)"); // Color inicial
    gradient.addColorStop(1, "rgba(0, 149, 255, 0)"); // Color final
    return gradient;
  };

  // Datos del gráfico
  const data = {
    labels: datos.labels, // Fechas
    datasets: [
      {
        label: "Promedio",
        data: datos.values, // Valores
        borderColor: "rgba(0, 149, 255, 1)", // Color de la línea
        borderWidth: 2, // Ancho de la línea
        pointRadius: 4,
        pointBackgroundColor: "rgba(0, 149, 255, 1)", // Color de los puntos
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const ctx = chart.ctx as CanvasRenderingContext2D; // Especifica el tipo correcto
          return gradientBackground(ctx, chart.height); // Aplica el degradado
        },
        //backgroundColor: "rgba(0, 149, 255, 1)",
        fill: true, // Habilita el relleno,
        //tension: 0.4,
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    aspectRatio: 5,
    plugins: {
      legend: {
        display: false, // Oculta la leyenda
      },
    },
    scales: {
      y: {
        min: 2,
        max: 7.5,
        grid: {
          display: false, // Oculta líneas horizontales
        },
        ticks: {
          display: false, // Oculta etiquetas en el eje Y
        },
        display: false, // Oculta el eje Y
      },
      x: {
        grid: {
          display: false, // Oculta líneas verticales
        },
        ticks: {
          display: false, // Oculta etiquetas en el eje X
        },
        display: false, // Oculta el eje X
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
