export interface RouteItem {
  icon?: any;
  text: string;
  href: string;
  selected?: boolean;
}

export interface UserInfoProps {
  avatarSrc: string;
  avatarType?: "user" | "logo";
  name: string;
  role: string;
  newNotifications: boolean;
}
