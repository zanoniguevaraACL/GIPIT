import FormBlock from "../atoms/FormBlock";
import { FormBlockProps } from "@/app/lib/types";
import "./modal.css";

function Modal({ rows, onSubmit }: FormBlockProps) {
  return (
    <div className="modal-overlay">
      <div className="form-container">
        <FormBlock rows={rows} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Modal;
