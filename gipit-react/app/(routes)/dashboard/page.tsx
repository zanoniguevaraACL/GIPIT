export const dynamic = 'force-dynamic';
import React from 'react';
import { IconUsers, IconFolderCheck, IconFolder, IconClock, IconReceipt } from '@tabler/icons-react';
import { fetchDashboardStats } from '@/app/actions/fetchDashboardStats';
import { fetchAllPreInvoices } from "@/app/actions/fetchInvoices";
import { fetchInvoiceDetails } from "@/app/actions/fetchInvoiceDetails";
import DashboardCard from '../../../components/molecules/DashboardCard';
import Button from '@/components/atoms/Button';
import "./dashboard.css";
import "./invoices.css"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/authOptions';


interface PreInvoiceItem {
  id: string;
  candidate_id: string;
  rate: string;
  total: string;
}

interface Candidate {
  id: string;
  name: string;
}

interface ProfessionalDetail {
  id: string;
  name: string;
  rate: number;
  total: number;
}

interface Invoice {
  id: number;
  estimated_date: string;
  expiration_date: string;
  total_value: string;
  status: string;
}

async function DashboardPage() {
  const stats = await fetchDashboardStats();
  const invoicesList = await fetchAllPreInvoices(1);
  const session = await getServerSession(authOptions);
  
  // Obtenemos solo las facturas pendientes
  const pendingInvoices = invoicesList.filter((invoice: Invoice) => invoice.status === 'pendiente');
  
  // Procesamos los datos de todas las facturas pendientes
  let allProfessionalDetails: ProfessionalDetail[] = [];
  let totalPendingValue = 0;
  let oldestInvoiceDate = new Date();
  
  // Procesamos cada factura pendiente
  await Promise.all(pendingInvoices.map(async (invoice: Invoice) => {
    const { preInvoice, candidates } = await fetchInvoiceDetails(invoice.id);
    
    // Actualizamos el total pendiente
    const invoiceTotal = preInvoice.pre_invoice_items.reduce((sum: number, item: PreInvoiceItem) => {
      // Aseguramos que el total sea un número válido
      const itemTotal = parseFloat(item.total);
      return !isNaN(itemTotal) ? sum + itemTotal : sum;
    }, 0);

    totalPendingValue += invoiceTotal;
    
    // Actualizamos la fecha más antigua
    const invoiceDate = new Date(preInvoice.estimated_date);
    if (invoiceDate < oldestInvoiceDate) {
      oldestInvoiceDate = invoiceDate;
    }
    
    // Agregamos los detalles de profesionales
    const invoiceProfessionals = preInvoice.pre_invoice_items.map((item: PreInvoiceItem) => {
      const candidate = candidates.find((c: Candidate) => c.id === item.candidate_id);
      return {
        id: item.id,
        name: candidate ? candidate.name : "Sin nombre",
        rate: parseFloat(item.rate),
        total: parseFloat(item.total)
      };
    });
    
    allProfessionalDetails = [...allProfessionalDetails, ...invoiceProfessionals];
  }));
  
  // Calculamos días desde la factura más antigua
  const daysSinceOldestInvoice = Math.floor(
    (new Date().getTime() - oldestInvoiceDate.getTime()) / 
    (1000 * 3600 * 24)
  );
  
  // Ordenamos los profesionales por total y tomamos los primeros 3
  allProfessionalDetails.sort((a, b) => b.total - a.total);
  const visibleDetails = allProfessionalDetails.slice(0, 3);
  const remainingDetails = allProfessionalDetails.slice(3);
  const remainingCount = remainingDetails.length;
  
  // Calculamos totales para los profesionales restantes
  const totalRemainingUF = remainingDetails.reduce(
    (sum: number, detail: ProfessionalDetail) => sum + detail.total,
    0
  );

  const averageRate = remainingDetails.length
    ? (remainingDetails.reduce(
        (sum: number, detail: ProfessionalDetail) => sum + detail.rate,
        0
      ) / remainingCount).toFixed(2)
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
        subtitle: `${stats.cerradostrimestreCount} en el último trimestre`
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
        value: stats.promedioCierre, // Añadido esta línea
        icon: <IconClock size={24} />,
        subtitle: "Promedio de tiempo de cierre de procesos"
      }
    };

  return (
    <div className="inner-page-container">
      <div className="dashboard-header">
        <h1>Hola, {session?.user.name}</h1>
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
              <h2 className="azulcolor">{totalPendingValue.toFixed(2)} UF</h2>
                <h3>Pendiente por facturar</h3>
                <small>Hace {daysSinceOldestInvoice} días</small>
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
                  {visibleDetails.map((detail: ProfessionalDetail) => (
                    <tr key={detail.id}>
                    <td>{detail.name}</td>
                    <td>{detail.rate.toFixed(2)} UF/h</td>
                    <td>{detail.total.toFixed(2)} UF</td>
                  </tr>
                  ))}
                  {remainingCount > 0 && (
                    <tr>
                      <td>+ {remainingCount} profesionales</td>
                      <td>~ {averageRate} UF/h</td>
                      <td>{totalRemainingUF.toFixed(1)} UF</td>
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