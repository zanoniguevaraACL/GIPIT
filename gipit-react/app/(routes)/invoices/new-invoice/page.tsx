"use client";

import { useState, useEffect } from "react";
import { IconCalendar } from "@tabler/icons-react";
import Button from "@/components/atoms/Button";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import './new-invoice.css';
import { fetchProfessionalsByCompany } from "@/app/actions/fetchProfessionals";

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
}

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  const handleHoursChange = (id: number, hours: number) => {
    setProfessionals(prevPros => 
      prevPros.map(pro => 
        pro.id === id ? { ...pro, hoursWorked: hours } : pro
      )
    );
  };

  const handleNotesChange = (id: number, notes: string) => {
    setProfessionals(prevPros => 
      prevPros.map(pro => 
        pro.id === id ? { ...pro, notes } : pro
      )
    );
  };

  const calculateSubtotal = (hourValue: number, hours: number): number => {
    return hourValue * hours;
  };

  useEffect(() => {
    const loadClients = async () => {
      setIsLoading(true);
      try {
        const clientsList = await fetchListCompanies();
        const formattedClients = clientsList.map(client => ({
          name: client.name,
          value: client.id
        }));
        setClients(formattedClients);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
        setError("Error al cargar los clientes");
      } finally {
        setIsLoading(false);
      }
    };

    loadClients();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const loadProfessionals = async () => {
        const data = await fetchProfessionalsByCompany(selectedCompany);
        setProfessionals(data);
      };
      loadProfessionals();
    }
  }, [selectedCompany]);

  return (
    <div className="max-container">
      {isLoading && <div>Cargando...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="invoice-form-container">
        <div className="header-section">
          <h2>Nueva Factura</h2>
          <div className="button-container">
            <Button
              text="Cancelar"
              href="/invoices"
              type="tertiary"
            />
            <Button
              text="Guardar Factura"
              type="primary"
            />
          </div>
        </div>
        <div className="form-content">
          <form>
            <div className="form-grid">
              <div className="form-group">
                <label>CLIENTE</label>
                <select 
                  defaultValue="Cencosud"
                  onChange={(e) => setSelectedCompany(parseInt(e.target.value))}
                >
                  <option value="Cencosud">Cencosud</option>
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
                  <input type="date" defaultValue="2024-12-24" />
                  <IconCalendar size={20} />
                </div>
              </div>

              <div className="form-group">
                <label>VENCIMIENTO</label>
                <div className="date-input">
                  <input type="date" defaultValue="2024-12-24" />
                  <IconCalendar size={20} />
                </div>
              </div>

              <div className="form-group">
                <label>PERIODO A FACTURAR</label>
                <div className="date-input">
                  <input type="text" defaultValue="Mayo - Julio" />
                  <IconCalendar size={20} />
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
                    <th>PROFESIONALES A FACTURAR</th>
                    <th>VALOR HORA</th>
                    <th>TRABAJADAS</th>
                    <th>SUBTOTAL</th>
                    <th>NOTA</th>
                  </tr>
                </thead>
                <tbody>
                  {professionals.map((pro) => (
                    <tr key={pro.id}>
                      <td>{pro.name}</td>
                      <td>{pro.hourValue}</td>
                      <td>
                        <input 
                          type="number" 
                          value={pro.hoursWorked || 0}
                          onChange={(e) => handleHoursChange(pro.id, parseInt(e.target.value))}
                        />
                      </td>
                      <td>{calculateSubtotal(pro.hourValue, pro.hoursWorked || 0)} UF</td>
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
            <Button
              text="Agregar Profesional"
              type="secondary"
              href="#"
            />
          </div>

          <div className="total-container">
            <div className="total-info">
              <h3>Total a pagar</h3>
              <h1>0 UF</h1>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}