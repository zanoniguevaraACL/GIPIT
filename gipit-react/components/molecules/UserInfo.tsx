import {
  IconBell,
  IconBellBolt,
  IconBellRingingFilled,
  IconNotification,
} from "@tabler/icons-react";
import Avatar from "../atoms/Avatar";
import UserNameAndRole from "../atoms/UserNameAndRole";
import "./userInfo.css";
import { UserInfoProps } from "@/app/lib/types";
import Link from "next/link";

function UserInfo({
  avatarSrc,
  name,
  role,
  avatarType = "user",
  newNotifications = false,
}: UserInfoProps) {
  return (
    <div className="userinfo-container">
      <Link href="/notifications" className="notifications-icon-container">
        {newNotifications ? (
          <IconBellRingingFilled className="bell-ringing" />
        ) : (
          <IconBell />
        )}
      </Link>
      <Avatar src={avatarSrc} type={avatarType} />
      <UserNameAndRole name={name} role={role} />
    </div>
  );
}

export default UserInfo;
