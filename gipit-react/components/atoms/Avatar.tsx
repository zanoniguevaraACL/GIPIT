import "./avatar.css";

function Avatar({ src, name }: { src: string | null | undefined, name: string | null | undefined}) {
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
    <div className="avatar-container user">
      {src ? (
        <img src={src} alt="avatar-image" width={10} height={10} />
      ) : (
        <div className="avatar-initials">{initials}</div>
      )}
    </div>
  );
}

export default Avatar;
