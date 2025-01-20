"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

function EditUserPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    position: "",
    role: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      console.error("Error al actualizar el usuario");
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Cargo"
          value={userData.position}
          onChange={(e) => setUserData({ ...userData, position: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Rol"
          value={userData.role}
          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          required
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default EditUserPage; 