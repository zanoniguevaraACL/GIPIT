import Link from "next/link";
import "./innerTab.css";
import { InnerTabProps } from "@/app/lib/types";

function InnerTab({ name, root, id, selected = false }: InnerTabProps) {
  return (
    <Link href={`${root}/${id}`} className="inner-tab-link">
      <div className={`inner-tab-container ${selected ? "selected" : ""}`}>
        <p className="text-16">{name}</p>
      </div>
    </Link>
  );
}

export default InnerTab;
