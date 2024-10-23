import Link from "next/link";
import "./button.css";

interface ButtonProps {
  href: string;
  text: string;
  type?: "primary" | "secondary" | "tertiary" | "over-red"; // type es opcional
  overRed?: boolean;
}

export default function Button({ href, text, type = "primary" }: ButtonProps) {
  return (
    <Link href={href}>
      <div className={`button ${type}`}>{text}</div>
    </Link>
  );
}
