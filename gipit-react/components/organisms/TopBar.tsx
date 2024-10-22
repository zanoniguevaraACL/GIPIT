"use client";
import { IconChevronLeft } from "@tabler/icons-react";
import "./topbar.css";
import nicole from "@/src/NicoleAvatar.jpeg";
import UserInfo from "../molecules/UserInfo";
import { RouteItem } from "@/app/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";

function TopBar({ routes }: { routes: RouteItem[] }) {
  const actualRoute = usePathname();
  let screenHeading: string = "";
  let isDeeper: boolean = true;
  let parentRoute: string = "/";
  routes.forEach((r) => {
    if (actualRoute.startsWith(r.href)) {
      screenHeading = r.text;
      parentRoute = r.href;
      // detectamos el title de la pagina
      if (actualRoute === r.href) {
        // verificamos si la ruta es más profunda
        isDeeper = false;
      }
    }
  });

  return (
    <div className="topbar-container">
      {isDeeper ? (
        <Link className="title-container" href={parentRoute}>
          <IconChevronLeft />
          <h4>{screenHeading}</h4>
        </Link>
      ) : (
        <h4>{screenHeading}</h4>
      )}
      <UserInfo
        avatarSrc={nicole.src}
        name="Nicole Cordova"
        role="Key Account Manager"
        newNotifications={true}
      />
    </div>
  );
}

export default TopBar;
