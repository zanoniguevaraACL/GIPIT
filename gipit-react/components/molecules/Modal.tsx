import FormBlock from "../atoms/FormBlock";
import { FormBlockProps } from "@/app/lib/types";
import "./modal.css";

function Modal({
  rows,
  onSubmit,
  title,
  message,
  validationSchema,
}: FormBlockProps) {
  return (
    <div className="modal-overlay">
      <div className="form-container">
        {title && <h4>{title}</h4>}
        {message && <h3>{message}</h3>}
        <FormBlock
          rows={rows}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      </div>
    </div>
  );
}

export default Modal;
