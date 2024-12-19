import { IconLoader2 } from "@tabler/icons-react";
import "./loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-icon">
        <IconLoader2 size={64}/>
      </div>
    </div>
  );
}

export default Loader;
