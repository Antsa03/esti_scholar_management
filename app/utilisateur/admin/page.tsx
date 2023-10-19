"use client";
import { useState, useEffect } from "react";
import AdminList from "@/views/utilisateur/admin/AdminList";
import Admin from "@/models/utilisateur/listage/Admin";

function Admin() {
  // Authentification pour les admins
  const [admins, setAdmins] = useState<Array<Admin>>([]);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/utilisateur/admin");
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id_utilisateur: string) => {
    try {
      const response = await fetch(
        `/api/utilisateur/delete/${id_utilisateur}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Utilisateur supprimé avec succès");
        fetchAdmins();
      } else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return <AdminList admins={admins} handleDelete={handleDelete} />;
}

export default Admin;
