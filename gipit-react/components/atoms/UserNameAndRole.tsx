import { IconChevronDown } from "@tabler/icons-react";

function UserNameAndRole({ name, role }: { name: string; role: string }) {
  return (
    <div className="user-name-and-role-container">
      <div className="flex-row center-aligned gap-8">
        <h4> {name}</h4>
        <IconChevronDown />
      </div>
      <p className="text-12">{role}</p>
    </div>
  );
}

export default UserNameAndRole;
