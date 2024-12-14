import { RouteItem } from "@/app/lib/types";
import {
  IconBuildingEstate,
  IconLayoutDashboard,
  IconReceipt2,
  IconSettings,
  IconSpeakerphone,
  IconUserScan,
  IconUserSearch,
} from "@tabler/icons-react";

export const routes: RouteItem[] = [
  {
    // solo para el cliente
    icon: <IconLayoutDashboard />,
    text: "Dashboard",
    href: "/dashboard",
    roles: ["client"],
  },
  {
    // solo para profesionales internos autorizados
    icon: <IconBuildingEstate />,
    text: "Clientes",
    href: "/company",
    roles: ["kam", "admin"],
  },
  {
    icon: <IconUserSearch />,
    text: "Procesos",
    href: "/process",
    roles: ["client", "kam", "gest", "mkt", "admin"],
  },
  {
    icon: <IconUserScan />,
    text: "Profesionales",
    href: "/pros",
    roles: ["client", "kam", "gest", "mkt", "admin"],
  },
  {
    icon: <IconReceipt2 />,
    text: "Facturación",
    href: "/invoices",
    roles: ["client", "kam", "gest", "mkt", "admin"],
  },
  {
    icon: <IconSpeakerphone />,
    text: "Noticias",
    href: "/news",
    roles: ["client", "kam", "gest", "mkt", "admin"],
  },
  {
    // solo para el admin
    icon: <IconSettings />,
    text: "Administración",
    href: "/admin",
    roles: ["admin"],
  },

  //Rutas con título pero que no están en la barra de navegación
  {
    text: "Notificaciones",
    href: "/notifications",
    roles: ["client", "kam", "gest", "mkt", "admin"],
  },
];
