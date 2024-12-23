"use client";

import { useState, useEffect } from "react";
import { IconCalendar, IconReceipt } from "@tabler/icons-react";
import Button from "@/components/atoms/Button";
import { fetchListCompanies } from "@/app/actions/fetchCompanies";
import './new-invoice.css';

interface Client {
  name: string;
  value: number;
}

export default function Page() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="max-container">
      <div className="header-navigation">
        <Button
          text="Facturación"
          href="/invoices"
          type="primary"
        />
      </div>
      
      <div className="invoice-form-container">
        <h2>Nueva Factura</h2>
        
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label>CLIENTE</label>
              <select defaultValue="Cencosud">
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

        <div className="professionals-section">
          <h4>Profesionales</h4>
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
      </div>
    </div>
  );
}