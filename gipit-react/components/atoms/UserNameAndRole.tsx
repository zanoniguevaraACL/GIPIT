import { IconChevronDown } from "@tabler/icons-react";
//Erick: Acá se puede obtener el nombre y el rol de las personas y mostrarlos en el navbar

function UserNameAndRole({
  name,
  position,
}: {
  name: string | null | undefined;
  position: string | null | undefined;
}) {
  let nameToUse: string = "User";
  if (name) {
    nameToUse = name.split(" ")[0] + " " + name.split(" ")[1];
  }
  return (
    <div className="user-name-and-role-container">
      <div className="flex-row center-aligned gap-8">
        <h4> {nameToUse}</h4>
        <IconChevronDown />
      </div>
      <p className="text-12">{position}</p>
    </div>
  );
}

export default UserNameAndRole;
