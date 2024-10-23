import FormBlock from "../atoms/FormBlock";
import { FormBlockProps } from "@/app/lib/types";

function Modal({ fields }: { fields: FormBlockProps[] }) {
  return (
    <div>
      <div>
        <FormBlock fields={fields} />
      </div>
    </div>
  );
}

export default Modal;
