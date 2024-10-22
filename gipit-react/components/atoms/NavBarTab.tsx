import Link from "next/link";
import "./navBarTab.css";

function NavBarTab({
  icon,
  text,
  href,
  selected = false,
}: {
  icon: any;
  text: string;
  href: string;
  selected?: boolean;
}) {
  return (
    <div className={`tab-container ${selected ? "selected" : ""}`}>
      <Link href={href} className="flex-row center-aligned gap-8">
        {icon}
        <p className="text-14">{text}</p>
      </Link>
    </div>
  );
}

export default NavBarTab;
