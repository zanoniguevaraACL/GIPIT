"use client";
import { IconLoader2 } from "@tabler/icons-react";
import "./loaderNewCandidate.css";
import { useEffect, useState } from "react";

const phrases = [
  "Analizando CV...",
  "Analizando Requerimientos...",
  "Comparando CV...",
  "Procesando Compatibilidad con IA...",
	"Guardando Resultados.."
];

function Loader() {
  const [currentPhrase, setCurrentPhrase] = useState<string>(phrases[0]);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeOut(true); // Inicia el fade-out
      setTimeout(() => {
        setFadeOut(false); // Reinicia el fade-in
        setCurrentPhrase((prev) => {
          const currentIndex = phrases.indexOf(prev);
          return phrases[(currentIndex + 1) % phrases.length];
        });
      }, 500); // Cambia la frase después de 500ms (coincide con la duración del fade-out)
    }, 7000); // Cambia cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-background"></div>
      <div className="loader-content">
        <div className="loader-icon">
          <IconLoader2 size={64} className="rotating-icon" />
        </div>
        <p className={`loader-phrase ${fadeOut ? "fade-out" : "fade-in"}`}>
          {currentPhrase}
        </p>
      </div>
    </div>
  );
}

export default Loader;