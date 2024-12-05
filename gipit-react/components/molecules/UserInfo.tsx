import { IconBell, IconBellRingingFilled } from "@tabler/icons-react";
import Avatar from "../atoms/Avatar";
import UserNameAndRole from "../atoms/UserNameAndRole";
import "./userInfo.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

function UserInfo({ newNotifications = false }: { newNotifications: boolean }) {
  const { data: session } = useSession();
  

  return (
    <div className="userinfo-container">
      <Link href="/notifications" className="notifications-icon-container">
        {newNotifications ? (
          <IconBellRingingFilled className="bell-ringing" />
        ) : (
          <IconBell />
        )}
      </Link>
      <Avatar src={session?.user?.image} name={session?.user?.name}/>
      <UserNameAndRole name={session?.user?.name} role={session?.user?.email} />
    </div>
  );
}

export default UserInfo;
