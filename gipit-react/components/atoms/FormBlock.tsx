"use client";
import { FormInputProps, FormBlockProps } from "@/app/lib/types";
import "./formBlock.css";
import "./button.css";
import Link from "next/link";
import { FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

function FormRow({ row }: { row: FormInputProps[] }) {
  return row.map((row, index: number) => {
    return <FormItem field={row} key={index} />;
  });
}

function FormItem({ field }: { field: FormInputProps }) {
  switch (field.type) {
    case "textarea":
      return (
        <label key={field.label}>
          <div>{field.label}</div>
          <textarea
            placeholder={field.placeholder}
            name={field.name ? field.name : ""}
            defaultValue={field.defaultValue}
            style={{ height: field.height }}
          />
        </label>
      );
      break;
    case "chips":
      return (
        <label key={field.label}>
          <div>{field.label}</div>
          <input placeholder={field.placeholder} />
        </label>
      );
      break;
    case "cancel":
      return (
        <Link
          href={field.href ? field.href : "/"}
          key={field.label}
          className="button secondary"
        >
          {field.value}
        </Link>
      );
      break;
    case "submit":
      return (
        <input
          key={field.label}
          className="button primary"
          type="submit"
          value={field.value}
        />
      );
      break;
    default:
      return (
        <label key={field.label}>
          <div>{field.label}</div>
          <input
            name={field.name ? field.name : ""}
            type={field.type}
            key={field.label}
            placeholder={field.placeholder}
            value={field.value}
            defaultValue={field.defaultValue}
          />
        </label>
      );
  }
}

function FormBlock({ rows, onSubmit }: FormBlockProps) {
  const router = useRouter();
  const actualRoute = usePathname();
  return (
    <form
      encType="multipart/form-data"
      className="form-block"
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await onSubmit(formData, actualRoute);
        alert(response.message);
        router.push(response.route);
      }}
    >
      {rows.map((row, index: number) => {
        return (
          <div className="form-row" key={index}>
            {Array.isArray(row) ? (
              <FormRow row={row} />
            ) : (
              <FormItem field={row} />
            )}
          </div>
        );
      })}
    </form>
  );
}

export default FormBlock;
