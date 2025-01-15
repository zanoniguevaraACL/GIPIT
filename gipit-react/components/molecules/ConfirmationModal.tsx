'use client';
import React from 'react';
import Modal from "@/components/molecules/Modal";
import { FormInputsRow } from "@/app/lib/types";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  message?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm }) => {
  const handleSubmit = async () => {
    await onConfirm();
    return { message: 'Confirmación exitosa', route: '/invoices', statusCode: 200 };
  };

  const fields: FormInputsRow = [
    [
      { type: "cancel", value: "Cancelar", href: "" },
      { type: "submit", value: "Confirmar" },
    ],
  ];

  return isOpen ? (
    <Modal
      rows={fields}
      onSubmit={handleSubmit}
      message="¿Estás seguro que deseas realizar estos cambios?"
    />
  ) : null;
};

export default ConfirmationModal;