import { IconBell, IconBellRingingFilled, IconLogout } from "@tabler/icons-react";
import Avatar from "../atoms/Avatar";
import UserNameAndRole from "../atoms/UserNameAndRole";
import "./userInfo.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

function UserInfo({ newNotifications = false }: { newNotifications: boolean }) {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/api/auth/signin" });
  };

  return (
    <div className="userinfo-container">
      <Link href="/notifications" className="notifications-icon-container">
        {newNotifications ? (
          <IconBellRingingFilled className="bell-ringing" />
        ) : (
          <IconBell />
        )}
      </Link>
      <Avatar src={session?.user?.image} name={session?.user?.name} />
      <div className="user-profile-container" onClick={() => setShowDropdown(!showDropdown)}>
        <UserNameAndRole
          name={session?.user?.name}
          position={session?.user?.position}
          showDropdown={showDropdown}
        />
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleSignOut}>
              <IconLogout size={18} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
