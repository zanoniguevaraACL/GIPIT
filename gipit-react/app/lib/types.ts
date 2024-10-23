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

export interface FormBlockProps {
  label: string;
  placeholder: string;
  type: string;
}

export interface NavBarCTAProps {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: ReactNode;
}
