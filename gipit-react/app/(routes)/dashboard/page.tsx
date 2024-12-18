import React from 'react';
import { IconUsers, IconFolderCheck, IconFolder, IconClock } from '@tabler/icons-react';
import { fetchDashboardStats } from '@/app/actions/fetchDashboardStats';
import DashboardCard from '../../../components/molecules/DashboardCard';
import "./dashboard.css";
import { fetchInvoiceDetails } from "@/app/actions/fakeApi";
import { IconReceipt } from "@tabler/icons-react";
import Button from '@/components/atoms/Button';
import "./invoices.css";


async function DashboardPage() {
  const stats = await fetchDashboardStats();
  const invoiceDetails = await fetchInvoiceDetails(1);
  const visibleDetails = invoiceDetails.details.slice(0, 3);
  const remainingDetails = invoiceDetails.details.slice(3);
  const remainingCount = remainingDetails.length;
  const totalRemainingUF = remainingDetails.reduce(
    (sum, detail) => sum + detail.total,
    0
  );

  const averageRate = remainingDetails.length
    ? (
        remainingDetails.reduce(
          (sum, detail) => sum + detail.total / detail.hours,
          0
        ) / remainingCount
      ).toFixed(2)
    : "0.0";


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
        <p className="header-title">Resumen de procesos</p>
        <div className="rates-dashboard">
          <DashboardCard datos={dashboardCards.card1} />
          <DashboardCard datos={dashboardCards.card2} />
          <DashboardCard datos={dashboardCards.card3} />
          <DashboardCard datos={dashboardCards.card4} />
        </div>
      </div>

      <div className="dashboard-container">
        <div className="header-container">
          <h4 className="header-title">Facturación</h4>
          <Button 
            text="Revisar las Facturas"
            href="/invoices"
            type="secondary"
          />
        </div>

        <div className="row">
          <div className="col-3">
            <div className="dashboard-card-container">
              <div className="text-container">
                <h2 className="azulcolor">{invoiceDetails.total} UF</h2>
                <h3>Pendiente por facturar</h3>
                <small>Hace 3 días</small>
              </div>
              <div className="icon-container">
                <IconReceipt size={24} />
              </div>
            </div>
          </div>

          <div className="col-9">
            <div className="billing-card">
              <table>
                <tbody>
                  {visibleDetails.map((detail) => (
                    <tr key={detail.id}>
                      <td>{detail.name}</td>
                      <td>{(detail.total / detail.hours).toFixed(2)} UF/h</td>
                      <td>{detail.total} UF</td>
                    </tr>
                  ))}
                  {remainingCount > 0 && (
                    <tr>
                      <td>+ {remainingCount} profesionales</td>
                      <td>~ {averageRate} UF/h</td>
                      <td>{totalRemainingUF} UF</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;