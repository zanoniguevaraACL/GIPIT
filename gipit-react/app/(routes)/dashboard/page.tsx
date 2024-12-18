import React from 'react';
import { IconUsers, IconFolderCheck, IconFolder, IconClock } from '@tabler/icons-react';
import { fetchDashboardStats } from '@/app/actions/fetchDashboardStats';
import DashboardCard from '../../../components/molecules/DashboardCard';
import "./dashboard.css";

async function DashboardPage() {
  const stats = await fetchDashboardStats();

  const fechaFin = new Date();
  const fechaInicio = new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 3);

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', { 
      day: 'numeric',
      month: 'short'
    });
  };

  const subtituloCerrados = `${stats.cerradosUltimoTrimestre} procesos desde ${formatearFecha(fechaInicio)} hasta ${formatearFecha(fechaFin)}`;

  const dashboardCards = {
    card1: {
      title: "Procesos Activos",
      hasChart: false,
      chartData: {
        values: [stats.activosCount]
      },
      icon: <IconFolder size={24} />,
      subtitle: `Hace ${stats.diasDesdeUltimoProcesoActivo} días`
    },
    card2: {
      title: "Procesos Cerrados",
      hasChart: false,
      chartData: {
        values: [stats.cerradosCount]
      },
      icon: <IconFolderCheck size={24} />,
      subtitle: String(stats.cerradostrimestreCount)+" en el último trimestre"
    },
    card3: {
      title: "Profesionales Activos",
      hasChart: false,
      chartData: {
        values: [stats.profesionalesCount]
      },
      icon: <IconUsers size={24} />,
      subtitle: "Por revisar"
    },
    card4: {
      title: "Tiempo promedio de cierre",
      hasChart: true,
      chartData: {
        labels: stats.historicoTiempos.labels,
        values: stats.historicoTiempos.values
      },
      icon: <IconClock size={24} />,
      subtitle: "Promedio de tiempo de cierre de procesos"
    }
  };

  return (
    <div className="inner-page-container">
      <div className="dashboard-header">
        <h1>Hola,</h1>
        <p className="text-14">Simplifica tu gestión de contrataciones y toma decisiones más rápido</p>
      </div>

      <div className="dashboard-stats">
        <p className="section-title text-14">Resumen de procesos</p>
        <div className="rates-dashboard">
          <DashboardCard datos={dashboardCards.card1} />
          <DashboardCard datos={dashboardCards.card2} />
          <DashboardCard datos={dashboardCards.card3} />
          <DashboardCard datos={dashboardCards.card4} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage; 