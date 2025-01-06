

import Link from "next/link";
import "./button.css";

interface ButtonProps {
  href?: string; // Hacer href opcional
  text: string;
  type?: "primary" | "secondary" | "tertiary" | "over-red"; // type es opcional
  overRed?: boolean;
  onClick?: () => void; // Agregar soporte para onClick
}

export default function Button({ href, text, type = "primary", onClick }: ButtonProps) {
  if (href) {
    // Si se proporciona href, actúa como un enlace
    return (
      <Link href={href}>
        <div className={`button ${type}`}>{text}</div>
      </Link>
    );
  }

  // Si se proporciona onClick, actúa como un botón
  return (
    <button className={`button ${type}`} onClick={onClick}>
      {text}
    </button>
  );
}
