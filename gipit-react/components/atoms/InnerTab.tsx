import Link from "next/link";
import "./innerTab.css";
import { InnerTabProps } from "@/app/lib/types";

function InnerTab({ name, root, id, selected = false, match }: InnerTabProps) {
  const initials = (() => {
    const words = (name || "")
      .split(" ")
      .filter((word) => word.length > 0);

    if (words.length === 4) {
      // Si hay 4 palabras, toma la primera letra del primer nombre y la primera letra del primer apellido.
      return `${words[0][0]}${words[2][0]}`;
    } else if (words.length === 3) {
      // Si hay 3 palabras, toma la primera letra del nombre y la primera letra del primer apellido.
      return `${words[0][0]}${words[1][0]}`;
    } else if (words.length === 2) {
      // Si hay 2 palabras, toma la primera letra de cada palabra.
      return `${words[0][0]}${words[1][0]}`;
    } else if (words.length > 0) {
      // Si hay menos de 2 o más de 4 palabras, toma las dos primeras letras disponibles.
      return words.map((word) => word[0]).join("").substring(0, 2);
    } else {
      return ""; // Si no hay palabras, retorna cadena vacía.
    }
  })();

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
