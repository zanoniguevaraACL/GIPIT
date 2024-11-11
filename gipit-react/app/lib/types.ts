import { ReactNode } from "react";

export interface RouteItem {
  icon?: ReactNode;
  text: string;
  href: string;
  selected?: boolean;
}

export interface UserInfoProps {
  avatarSrc: string;
  avatarType?: "user" | "logo";
  name: string;
  role: string;
  newNotifications: boolean;
}

export interface FormInputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  type:
    | "text"
    | "number"
    | "date"
    | "submit"
    | "textarea"
    | "file"
    | "chips"
    | "cancel";
  value?: string | number;
  href?: string;
}

export type FormInputsRow = (FormInputProps | FormInputProps[])[];

export type FormBlockProps = {
  rows: FormInputsRow;
  onSubmit: (formData: FormData) => Promise<{ message: string; route: string }>;
};

export interface NavBarCTAProps {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: ReactNode;
}

export interface InnerTabProps {
  name: string;
  id?: number | string;
  root?: string;
  selected?: boolean;
  match?: number; // lo usaremos para mostrar el por ciento de compatibilidad y al mismo tiempo como bandera para saber si es un tab de compañia o de candidato, porque las compañias no tienen compatibilidad.
}
