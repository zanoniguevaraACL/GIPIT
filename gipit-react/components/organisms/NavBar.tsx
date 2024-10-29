"use client";
import AclLogo from "../atoms/AclLogo";
import { IconSparkles } from "@tabler/icons-react";
import NavBarTab from "../atoms/NavBarTab";
import "./navBar.css";
import { usePathname } from "next/navigation";
import NavBarCTA from "../molecules/NavBarCTA";
import { RouteItem } from "@/app/lib/types";

function NavBar({ routes }: { routes: RouteItem[] }) {
  const actualRoute = usePathname();

  return (
    <div className="navbar-container">
      <AclLogo type="primary" size={120} />
      <div className="tabs-container">
        {routes.map((r, index: number) => {
          return r.icon ? (
            <NavBarTab
              key={index}
              icon={r.icon}
              text={r.text}
              href={r.href}
              selected={actualRoute.startsWith(r.href)}
            />
          ) : (
            false
          );
        })}
      </div>
      <NavBarCTA
        icon={<IconSparkles />}
        title="Crear con IA"
        description="Arma un requerimiento en pocos pasos con Inteligencia Artificial"
        href="/"
        cta="Nueva Vacante"
      />
    </div>
  );
}

export default NavBar;
