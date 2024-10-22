import "./avatar.css";

interface AvatarProps {
  src: string;
  type?: "logo" | "user";
}

function Avatar({ src, type = "user" }: AvatarProps) {
  return (
    <div className={`avatar-container ${type}`}>
      <img src={src} />
    </div>
  );
}

export default Avatar;
