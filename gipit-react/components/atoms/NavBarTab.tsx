import Link from "next/link";
import "./navBarTab.css";
import { RouteItem } from "@/app/lib/types";

function NavBarTab({ icon, text, href, selected = false }: RouteItem) {
  return (
    <Link href={href} className="tab-linkt-item">
      <div
        className={`tab-container ${
          selected ? "selected" : ""
        } flex-row center-aligned gap-8`}
      >
        {icon}
        <p className="text-14">{text}</p>
      </div>
    </Link>
  );
}

export default NavBarTab;
