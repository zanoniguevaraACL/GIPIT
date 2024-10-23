import { FormBlockProps } from "@/app/lib/types";

function FormBlock({ fields }: { fields: FormBlockProps[] }) {
  return (
    <form>
      {fields.map((field, index: number) => {
        return (
          <input
            key={index}
            type={field.type}
            placeholder={field.placeholder}
          />
        );
      })}
    </form>
  );
}

export default FormBlock;
