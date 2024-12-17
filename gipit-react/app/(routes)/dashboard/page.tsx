import React from 'react';
import StatsCard from '@/components/molecules/StatsCard';
import { IconUsers, IconFolderCheck, IconFolder, IconClock } from '@tabler/icons-react';
import { fetchDashboardStats } from '@/app/actions/fetchDashboardStats';

async function DashboardPage() {
  const stats = await fetchDashboardStats();

  return (
    <div className="inner-page-container">
      <div className="dashboard-header">
        <h1>Hola,</h1>
        <p className="text-14">Simplifica tu gestión de contrataciones y toma decisiones más rápido</p>
      </div>

      <div className="dashboard-stats">
        <h3>Resumen de procesos</h3>
        <div className="stats-grid">
          <div className="stats-row">
            <StatsCard
              title="Procesos Activos"
              value={stats.activosCount}
              subtitle="Hace 2 días"
              icon={<IconFolder size={24} />}
              color="#E1BEE7"
            />
            <StatsCard
              title="Procesos Cerrados"
              value={stats.cerradosCount}
              subtitle="5 en el último trimestre"
              icon={<IconFolderCheck size={24} />}
              color="#FFF9C4"
            />
            <StatsCard
              title="Profesionales Activos"
              value={stats.profesionalesCount}
              subtitle="5 en el último trimestre"
              icon={<IconUsers size={24} />}
              color="#C8E6C9"
            />
          </div>
          <div className="time-stats">
            <StatsCard
              title="Tiempo promedio de cierre"
              value={stats.tiempoCierre}
              subtitle="Promedio de últimos 3 procesos"
              icon={<IconClock size={24} />}
              color="#BBDEFB"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage; 