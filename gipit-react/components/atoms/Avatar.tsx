import "./avatar.css";

function Avatar({
  src,
  name,
}: {
  src: string | null | undefined;
  name: string | null | undefined;
}) {
  const initials = (() => {
    if (name) {
      const words = (name || "").split(" ");
      return words[0] + words[1];
    } else {
      return ":)";
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
