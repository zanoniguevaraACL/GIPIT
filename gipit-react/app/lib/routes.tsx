import { RouteItem } from "@/app/lib/types";
import {
  IconLayoutDashboard,
  IconMessageChatbot,
  IconReceipt2,
  IconSpeakerphone,
  IconUserScan,
  IconUserSearch,
} from "@tabler/icons-react";

export const routes: RouteItem[] = [
  { icon: <IconLayoutDashboard />, text: "Dashboard", href: "/" },
  { icon: <IconUserSearch />, text: "Procesos", href: "/process" },
  { icon: <IconUserScan />, text: "Profesionales", href: "/pros" },
  { icon: <IconMessageChatbot />, text: "Seguimiento", href: "/follow-up" },
  { icon: <IconReceipt2 />, text: "Facturación", href: "/invoices" },
  { icon: <IconSpeakerphone />, text: "Noticias", href: "/news" },

  //Rutas con título pero que no están en la barra de navegación
  { text: "Notificaciones", href: "/notifications" },
];
