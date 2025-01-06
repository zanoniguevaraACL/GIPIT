import React, { useState } from 'react';

interface Professional {
  id: number;
  name: string;
  hourValue: number;
  hoursWorked?: number;
  notes?: string;
  vat?: number;
}

interface AddProfessionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (professional: Professional) => void;
  availableProfessionals: Professional[];
}

const AddProfessionalModal = ({ isOpen, onClose, onSave, availableProfessionals }: AddProfessionalModalProps) => {
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null);
  const [hoursWorked, setHoursWorked] = useState<number>(0);
  const [vat, setVat] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  const handleSave = () => {
    if (selectedProfessionalId) {
      const selectedProfessional = availableProfessionals.find(pro => pro.id === selectedProfessionalId);
      if (selectedProfessional) {
        onSave({
          id: selectedProfessional.id,
          name: selectedProfessional.name,
          hourValue: selectedProfessional.hourValue,
          hoursWorked: hoursWorked,
          vat: vat,
          notes: notes,
        });
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar profesional</h2>
        <div className="form-group">
          <label>PROFESIONAL</label>
          <select onChange={(e) => setSelectedProfessionalId(Number(e.target.value))}>
            <option value="">Seleccionar</option>
            {availableProfessionals.map(pro => (
              <option key={pro.id} value={pro.id}>{pro.name}</option>
            ))}
          </select>
        </div>
        <div className="horizontal-inputs">
          <div className="input-group">
            <label>HORAS TRABAJADAS</label>
            <input type="number" value={hoursWorked} onChange={(e) => setHoursWorked(parseInt(e.target.value))} />
          </div>
          <div className="input-group">
            <label>VALOR HORA</label>
            <input 
              type="number" 
              value={availableProfessionals.find(pro => pro.id === selectedProfessionalId)?.hourValue || 0} 
              readOnly 
              style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
            />
          </div>
          <div className="input-group">
            <label>VAT</label>
            <input type="number" value={vat} onChange={(e) => setVat(parseFloat(e.target.value))} />
          </div>
        </div>
        <div className="form-group">
          <label>NOTA ADICIONAL</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="button-group">
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
          <button className="save-button" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default AddProfessionalModal;