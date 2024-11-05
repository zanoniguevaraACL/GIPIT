import "./avatar.css";

function Avatar({ src }: { src: string | null | undefined }) {
  return (
    <div className={`avatar-container user`}>
      <img src={src ? src : ""} />
    </div>
  );
}

export default Avatar;
