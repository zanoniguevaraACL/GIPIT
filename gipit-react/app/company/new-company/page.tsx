import Modal from "@/components/molecules/Modal";
import { FormBlockProps } from "@/app/lib/types";

function Page() {
  const fields: FormBlockProps[] = [
    { label: "campo 1", placeholder: "este es el campo 1", type: "text" },
    { label: "campo 2", placeholder: "este es el campo 2", type: "text" },
    { label: "campo 3", placeholder: "este es el campo 3", type: "text" },
  ];

  return <Modal fields={fields} />;
}

export default Page;
