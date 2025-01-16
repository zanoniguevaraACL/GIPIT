"use client";

import React, { useEffect, useState } from 'react';
import { IconCalendar } from "@tabler/icons-react";
import Button from "@/components/atoms/Button";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import './invoiceEdit.css';
import { fetchProfessionalsBySelectedCompany } from "@/app/actions/fetchProfessionalsByCompany";
import AddProfessionalModal from "@/components/molecules/AddProfessionalModal";
import { fetchInvoiceDetails } from '@/app/actions/fetchInvoiceDetails';
import ConfirmationModal from "@/components/molecules/ConfirmationModal";

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

interface PreInvoiceItem {
    total: string;
    candidate_id: number;
    hours: number;
    description: string;
    rate: string;
    vat: string;
    subtotal: string;
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

export default function Page({ params }: { params: { invoiceId: string } }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedProfessionals, setAddedProfessionals] = useState<Professional[]>([]);
  const [startMonth, setStartMonth] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [issueDate, setIssueDate] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
    const loadInvoiceDetails = async () => {
      const { preInvoice, candidates } = await fetchInvoiceDetails(parseInt(params.invoiceId));
      console.log("Detalles de la factura recuperados:", preInvoice);
      
      if (preInvoice) {
        const companyId = preInvoice.company_id || preInvoice.client_id;
        console.log("ID de la compañía a buscar:", companyId);
        
        setSelectedCompany(companyId);
        
        const estimatedDate = new Date(preInvoice.estimated_date);
        const formattedIssueDate = `${estimatedDate.getFullYear()}-${String(estimatedDate.getMonth() + 1).padStart(2, '0')}-${String(estimatedDate.getDate()).padStart(2, '0')}`;
        setIssueDate(formattedIssueDate);
        
        const expirationDate = new Date(preInvoice.expiration_date);
        const formattedExpirationDate = `${expirationDate.getFullYear()}-${String(expirationDate.getMonth() + 1).padStart(2, '0')}-${String(expirationDate.getDate()).padStart(2, '0')}`;
        setExpirationDate(formattedExpirationDate);
        
        const professionals = preInvoice.pre_invoice_items.map((item: PreInvoiceItem) => {
          const candidate = candidates.find((c: { id: number }) => c.id === item.candidate_id);
          return {
            id: item.candidate_id,
            name: candidate ? candidate.name : "Sin nombre",
            hourValue: parseFloat(item.rate),
            subtotal: parseFloat(item.subtotal || '0'),
            total: parseFloat(item.total || '0'),
            hoursWorked: item.hours || 0,
            notes: item.description || '',
            vat: parseFloat(item.vat || '0'),
          };
        });
        setAddedProfessionals(professionals);
        
        const client = clients.find(client => client.value === companyId);
        console.log("Cliente recuperado:", client);
        
        if (client) {
          setSelectedCompany(client.value);
        }
      }
    };

    if (clients.length > 0) {
      loadInvoiceDetails();
    }
  }, [params.invoiceId, clients]);

  useEffect(() => {
    if (selectedCompany) {
      const fetchProfessionals = async () => {
        const data = await fetchProfessionalsBySelectedCompany(selectedCompany);
        if (data && Array.isArray(data)) {
          const formattedProfessionals = data
            .filter(prof => !addedProfessionals.some(added => added.id === prof.candidates.id))
            .map(prof => ({
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
  }, [selectedCompany, addedProfessionals]);

  const handleAddProfessional = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  };

  const handleHoursChange = (id: number, hours: number) => {
    setAddedProfessionals(prevPros => 
        prevPros.map(pro => {
            if (pro.id === id) {
                const subtotal = hours * pro.hourValue;
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

  const calculateTotal = () => {
    return addedProfessionals.reduce((total, pro) => {
        const subtotal = pro.subtotal || 0;
        const vat = pro.vat || 0;
        const vatAmount = (subtotal * (vat / 100));
        return total + subtotal + vatAmount;
    }, 0);
  };

  const handleSaveInvoice = async () => {
    const professionalsData = addedProfessionals.map(pro => {
        const subtotal = pro.subtotal || 0;
        const vat = pro.vat || 0;
        const vatAmount = (subtotal * (vat / 100));
        const total = parseFloat((subtotal + vatAmount).toFixed(2));

        console.log('vat:', vat);

        return {
            id: pro.id,
            hoursWorked: pro.hoursWorked,
            notes: pro.notes,
            subtotal: subtotal,
            vat: vat,
            hourValue: pro.hourValue,
            total: total,
        };
    });

    const invoiceData = {
        total_value: calculateTotal(),
        description: "Descripción de la factura "+ params.invoiceId + " compañia " + selectedCompany,
        status: "pendiente",
        professionals: professionalsData,
        period: `${startMonth} - ${endMonth}`,
        estimated_date: issueDate,
        expiration_date: expirationDate,
        company_id: selectedCompany,
    };

    console.log('Datos de la factura a enviar:', invoiceData);
    console.log('Total a guardar en la base de datos:', professionalsData);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/preinvoices/${params.invoiceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceData),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la factura');
        }
        window.location.href = `/invoices/${params.invoiceId}`
    } catch (error) {
        console.error('Error al actualizar la factura:', error);
    }
  };

  const handleConfirmSaveInvoice = async () => {
    await handleSaveInvoice();
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="max-container">
      <div className="invoice-form-container">
        <div className="header-section">
          <h2>Editar Factura</h2>
          <div className="button-container">
            <Button text="Cancelar" href="/invoices" type="tertiary" />
            <Button text="Guardar Factura" type="primary" onClick={() => setIsConfirmModalOpen(true)} />
          </div>
        </div>
        <div className="form-content">
          <form>
            <div className="form-grid">
              <div className="form-group-edit">
                <label>CLIENTE</label>
                <div>
                  {clients.find(client => client.value === selectedCompany)?.name || "No hay compañía seleccionada"}
                </div>
              </div>
              
              <div className="form-group-edit">
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

              <div className="form-group-edit">
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

              <div className="form-group-edit">
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
                    <th>Nombre</th>
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

          <div className="total-container-edit">
            <div className="total-info-edit">
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

      <ConfirmationModal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        onConfirm={handleConfirmSaveInvoice} 
        message="¿Estás seguro de que deseas guardar esta factura?" 
      />
    </div>
  );
}