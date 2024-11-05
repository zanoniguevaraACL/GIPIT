import { IconChevronDown } from "@tabler/icons-react";
//Erick: Acá se puede obtener el nombre y el rol de las personas y mostrarlos en el navbar

function UserNameAndRole({
  name,
  role,
}: {
  name: string | null | undefined;
  role: string | null | undefined;
}) {
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
