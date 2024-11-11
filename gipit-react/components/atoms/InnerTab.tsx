import Link from "next/link";
import "./innerTab.css";
import { InnerTabProps } from "@/app/lib/types";

function InnerTab({ name, root, id, selected = false, match }: InnerTabProps) {
  const initials = name
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href={`${root}/${id}`}
      className="inner-tab-link"
      id={selected ? "selected" : ""} //id del html node para llevar el scroll hacia el
    >
      <div className={`inner-tab-container ${selected ? "selected" : ""}`}>
        {match ? (
          <div className="tab-with-avatar">
            <div className="tab-avatar">{initials}</div>
            <div>
              <p className="text-16">{name}</p>
              <p className="text-12">{match}% de compatibilidad</p>
            </div>
          </div>
        ) : (
          <p className="text-16">{name}</p>
        )}
      </div>
    </Link>
  );
}

export default InnerTab;
