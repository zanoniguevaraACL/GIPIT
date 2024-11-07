import Image from "next/image";
import "./avatar.css";

function Avatar({ src }: { src: string | null | undefined }) {
  return (
    <div className={`avatar-container user`}>
      <Image src={src ? src : ""} alt="avatar-image" />
    </div>
  );
}

export default Avatar;
