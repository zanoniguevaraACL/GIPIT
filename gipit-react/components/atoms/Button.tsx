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
    <div className={`button ${type}`}>
      <Link href={href}>{text}</Link>
    </div>
  );
}
