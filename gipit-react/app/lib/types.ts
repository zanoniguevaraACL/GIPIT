import { ReactNode } from "react";
import { ZodType } from "zod";

export interface RouteItem {
  icon?: ReactNode;
  text: string;
  href: string;
  selected?: boolean;
  roles: ("client" | "kam" | "gest" | "mkt" | "admin")[];
}

export interface UserInfoProps {
  avatarSrc: string;
  avatarType?: "user" | "logo";
  name: string;
  position: string;
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
    | "email"
    | "textarea"
    | "file"
    | "chips"
    | "select"
    | "cancel";
  value?: string | number;
  defaultValue?: string | number;
  href?: string;
  height?: string;
  options?: { name: string; value: number }[];
  minMax?: number[];
}

export type FormInputsRow = (FormInputProps | FormInputProps[])[];

export type Candidate = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  jsongptText: string;
  match?: number;
};

export type Proceso = {
  id: number;
  name: string;
  startAt: string;
  endAt: string | null;
  preFiltered: number;
  candidates: Candidate[];
  status: string;
  jobOffer?: string; // Hacerlo opcional
  stage: string;
};

export type FormBlockProps = {
  rows: FormInputsRow;
  onSubmit: (
    formData: FormData,
    actualRoute: string,
  ) => Promise<{ message: string; route: string; statusCode: number}>;
  title?: string;
  message?: string;
  editor?: React.ReactNode; // Añadir esta línea
  validationSchema?: ZodType<unknown>;
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

export interface Integrante {
  user_id: number;
  name: string;
  email: string;
  position: string;
}

export interface Jefatura {
  name: string;
  id: number;
  integrantes?: Integrante[]; // Lista de integrantes
}

export interface CompanyDetails {
  id: number;
  name: string;
  jefaturas?: Jefatura[]; // Lista de jefaturas
}


export interface FormResponse {
  message: string;
  route: string;
  statusCode: number;
}

export interface FormInput {
  label?: string;
  placeholder?: string;
  type: string;
  name?: string;
  defaultValue?: string | number;
  minMax?: [number, number];
  value?: string;
  href?: string;
}

export interface Professional {
  id: number;
  name: string;
  email: string;
  phone: string;
  total_experience: number;
}
