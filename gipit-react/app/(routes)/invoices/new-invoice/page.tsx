"use client";

import React, { useEffect, useState } from 'react';
import { IconCalendar } from "@tabler/icons-react";
import Button from "@/components/atoms/Button";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import './new-invoice.css';
import { fetchProfessionalsBySelectedCompany } from "@/app/actions/fetchProfessionalsByCompany";
import AddProfessionalModal from "@/components/molecules/AddProfessionalModal";
import { useRouter } from 'next/navigation';

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
  notes?: string;
  vat?: number;
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


export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProfessionals, setAddedProfessionals] = useState<Professional[]>([]);
  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('2024-12-24');
  const [expirationDate, setExpirationDate] = useState<string>('2024-12-24');
  const router = useRouter();

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
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfessional = (professional: Professional) => {
    const hoursWorked = professional.hoursWorked || 0;
    const subtotal = calculateSubtotal(professional.hourValue, hoursWorked, professional.vat || 0);

    const professionalWithRate = {
      ...professional,
      subtotal,
    };

    setAddedProfessionals(prev => [...prev, professionalWithRate]);
    setProfessionals(prev => prev.filter(pro => pro.id !== professional.id));
    setIsModalOpen(false);
  };

  const handleHoursChange = (id: number, hours: number) => {
    setAddedProfessionals(prevPros => 
      prevPros.map(pro => 
        pro.id === id ? { ...pro, hoursWorked: hours, subtotal: calculateSubtotal(pro.hourValue, hours, pro.vat || 0) } : pro
      )
    );
  };

  const handleNotesChange = (id: number, notes: string) => {
    setAddedProfessionals(prevPros => 
      prevPros.map(pro => 
        pro.id === id ? { ...pro, notes } : pro
      )
    );
  };

  const calculateSubtotal = (hourValue: number, hours: number, vat: number): number => {
    const baseSubtotal = hourValue * hours;
    const vatAmount = (baseSubtotal * vat) / 100;
    return baseSubtotal + vatAmount;
  };

  const calculateTotal = () => {
    return addedProfessionals.reduce((total, pro) => {
      return total + (pro.subtotal || 0);
    }, 0);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(Number(event.target.value));
  };

  const handleSaveInvoice = async () => {
    const invoiceData = {
      total_value: calculateTotal(),
      description: "Descripción de la factura",
      status: "activo",
      professionals: addedProfessionals.map(pro => ({
        id: pro.id,
        hoursWorked: pro.hoursWorked,
        notes: pro.notes,
        subtotal: pro.subtotal,
        vat: pro.vat,
        hourValue: pro.hourValue,
      })),
      period: `${startMonth} - ${endMonth}`,
      estimated_date: issueDate,
      expiration_date: expirationDate
    };

    console.log('Datos de la factura a enviar:', invoiceData);

    try {
      const response = await fetch('http://localhost:3001/api/preinvoices', {
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
      router.push(`/invoices/${result.id}`);
    } catch (error) {
      console.error('Error al crear la factura:', error);
    }
  };

  return (
    <div className="max-container">
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
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfessional}
        availableProfessionals={professionals}
      />
    </div>
  );
}