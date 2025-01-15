"use client";

import React, { useEffect, useState } from 'react';
import { IconCalendar } from "@tabler/icons-react";
import Button from "@/components/atoms/Button";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import './new-invoice.css';
import { fetchProfessionalsBySelectedCompany } from "@/app/actions/fetchProfessionalsByCompany";
import AddProfessionalModal from "@/components/molecules/AddProfessionalModal";
import ConfirmationModal from "@/components/molecules/ConfirmationModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Client {
  name: string;
  value: number;
}

interface Professional { 
  id: number;
  name: string;
  hourValue: number;
  hoursWorked?: number;
  subtotal?: number;
  vat?: number;
  total?: number;
  notes?: string;
}

const months = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' }
];

interface InvoiceData {
  total_value: number;
  description: string;
  status: string;
  professionals: {
    id: number;
    hoursWorked: number | undefined;
    notes: string | undefined;
    subtotal: number;
    vat: number;
    hourValue: number;
    total: number;
  }[];
  period: string;
  estimated_date: string;
  expiration_date: string;
  company_id: number | null;
}

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [isAddProfessionalModalOpen, setIsAddProfessionalModalOpen] = useState(false);
  const [addedProfessionals, setAddedProfessionals] = useState<Professional[]>([]);
  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('2024-12-24');
  const [expirationDate, setExpirationDate] = useState<string>('2024-12-24');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clientsList = await fetchListCompanies();
        const formattedClients = clientsList.map(client => ({
          name: client.name,
          value: client.id
        }));
        setClients(formattedClients);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    };

    loadClients();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const fetchProfessionals = async () => {
        const data = await fetchProfessionalsBySelectedCompany(selectedCompany);
        if (data && Array.isArray(data)) {
          const formattedProfessionals = data.map(prof => ({
            id: prof.candidates.id,
            name: prof.candidates.name.trim(),
            hourValue: prof.rate || 0
          }));
          setProfessionals(formattedProfessionals);
        } else {
          console.error("Datos de profesionales no válidos:", data);
        }
      };

      fetchProfessionals();
    }
  }, [selectedCompany]);

  const handleAddProfessional = () => {
    setIsAddProfessionalModalOpen(true);
  };

  const handleCloseAddProfessionalModal = () => {
    setIsAddProfessionalModalOpen(false);
  };

  const handleSaveProfessional = (professional: Professional) => {
    const hoursWorked = professional.hoursWorked || 0;
    const subtotal = hoursWorked * professional.hourValue;
    const vatAmount = (subtotal * (professional.vat || 0)) / 100;
    const total = subtotal + vatAmount;

    const professionalWithRate = {
      ...professional,
      hoursWorked,
      subtotal: subtotal,
      total: total,
      vat: professional.vat || 0
    };

    setAddedProfessionals(prev => [...prev, professionalWithRate]);
    setProfessionals(prev => prev.filter(pro => pro.id !== professional.id));
    handleCloseAddProfessionalModal();
  };

  const handleHoursChange = (id: number, hours: number) => {
    setAddedProfessionals(prevPros => 
      prevPros.map(pro => {
        if (pro.id === id) {
          const subtotal = calculateSubtotal(pro.hourValue, hours);
          const vatAmount = (subtotal * (pro.vat || 0)) / 100;
          const total = subtotal + vatAmount;
          return { 
            ...pro, 
            hoursWorked: hours, 
            subtotal: subtotal, 
            total: total
          };
        }
        return pro;
      })
    );
  };

  const handleNotesChange = (id: number, notes: string) => {
    setAddedProfessionals(prevPros => 
      prevPros.map(pro => 
        pro.id === id ? { ...pro, notes } : pro
      )
    );
  };

  const calculateSubtotal = (hourValue: number, hours: number): number => {
    const baseSubtotal = hourValue * hours;
    return baseSubtotal;
  };

  const calculateTotal = () => {
    return addedProfessionals.reduce((total, pro) => {
      return total + (pro.total || 0);
    }, 0);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = Number(event.target.value);
    console.log("ID de la compañía seleccionada:", companyId);
    setSelectedCompany(companyId);
  };

  const handleSaveInvoice = async () => {
    if (addedProfessionals.length === 0) {
      toast.error("Debes agregar al menos un profesional antes de guardar la factura.");
      return;
    }

    const preparedInvoiceData: InvoiceData = {
        total_value: calculateTotal(),
        description: "Descripción de la compañia " + selectedCompany,
        status: "pendiente",
        professionals: addedProfessionals.map(pro => {
            const subtotal = pro.subtotal || 0;
            const vat = pro.vat || 0;
            const total = subtotal + (subtotal * (vat / 100));
            console.log(`Subtotal: ${subtotal}, VAT: ${vat}, Total: ${total}`);
            
            return {
                id: pro.id,
                hoursWorked: pro.hoursWorked,
                notes: pro.notes,
                subtotal: subtotal,
                vat: vat,
                hourValue: pro.hourValue,
                total: total,
            };
        }),
        period: `${startMonth} - ${endMonth}`,
        estimated_date: issueDate,
        expiration_date: expirationDate,
        company_id: selectedCompany,
    };
    setInvoiceData(preparedInvoiceData);
    setIsModalOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la factura');
      }

      const result = await response.json();
      console.log('Factura creada con éxito:', result);
      window.location.href = `/invoices/${result.id}`;
    } catch (error) {
      console.error('Error al crear la factura:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-container">
      <ToastContainer />
      <div className="invoice-form-container">
        <div className="header-section">
          <h2>Nueva Factura</h2>
          <div className="button-container">
            <Button text="Cancelar" href="/invoices" type="tertiary" />
            <Button text="Guardar Factura" type="primary" onClick={handleSaveInvoice} />
          </div>
        </div>
        <div className="form-content">
          <form>
            <div className="form-grid">
              <div className="form-group">
                <label>CLIENTE</label>
                <select 
                  value={selectedCompany || ""}
                  onChange={handleCompanyChange}
                  disabled={selectedCompany !== null}
                >
                  <option value="" disabled>
                    Selecciona una compañía
                  </option>
                  {clients.map(client => (
                    <option key={client.value} value={client.value}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>EMISIÓN</label>
                <div className="date-input">
                  <input 
                    type="date" 
                    value={issueDate} 
                    onChange={(e) => setIssueDate(e.target.value)} 
                  />
                  <IconCalendar size={20} />
                </div>
              </div>

              <div className="form-group">
                <label>VENCIMIENTO</label>
                <div className="date-input">
                  <input 
                    type="date" 
                    value={expirationDate} 
                    onChange={(e) => setExpirationDate(e.target.value)} 
                  />
                  <IconCalendar size={20} />
                </div>
              </div>

              <div className="form-group">
                <label>PERIODO A FACTURAR</label>
                <div className="month-selection">
                  <select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
                    <option value="">Mes de inicio</option>
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>

                  <select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
                    <option value="">Mes de fin</option>
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
          
          <div className="section-divider"></div>
          <div className="professionals-section">
            <div className="professionals-table">
              <table>
                <thead>
                  <tr>
                    <th>Profesionales a Facturar</th>
                    <th>Valor Hora</th>
                    <th>Horas Trabajadas</th>
                    <th>Subtotal</th>
                    <th>VAT</th>
                    <th>Total</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {addedProfessionals.map((pro) => (
                    <tr key={pro.id}>
                      <td>{pro.name}</td>
                      <td>{pro.hourValue}</td>
                      <td>
                        <input 
                          type="number" 
                          value={pro.hoursWorked || 0}
                          onChange={(e) => handleHoursChange(pro.id, parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td>{pro.subtotal ? pro.subtotal.toFixed(2) : '0.00'} UF</td>
                      <td>{pro.vat ? pro.vat.toFixed(2) : '0.00'} %</td>
                      <td>{pro.total ? pro.total.toFixed(2) : '0.00'} UF</td>
                      <td>
                        <input 
                          type="text"
                          value={pro.notes || ''}
                          onChange={(e) => handleNotesChange(pro.id, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="button-container">
              <Button
                text="Agregar Profesional"
                type="secondary"
                onClick={handleAddProfessional}
              />
            </div>
          </div>

          <div className="total-container">
            <div className="total-info">
              <h3>Total a pagar</h3>
              <h1>{calculateTotal().toFixed(2)} UF</h1>
            </div>
          </div>
        </div>
      </div>

      <AddProfessionalModal 
        isOpen={isAddProfessionalModalOpen}
        onClose={handleCloseAddProfessionalModal}
        onSave={handleSaveProfessional}
        availableProfessionals={professionals}
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
        message="¿Estás seguro de que deseas guardar esta factura?"
      />
    </div>
  );
}