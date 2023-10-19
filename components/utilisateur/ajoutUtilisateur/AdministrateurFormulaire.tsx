"use client";
import AdminForm from "@/views/utilisateur/admin/AdminForm";
import { useState } from "react";
import deleteUser from "@/utils/deleteUser";

interface AdministrateurFormProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function AdministrateurFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: AdministrateurFormProps) {
  //Tout ce qui concerne l'admin
  const [admin, setAdmin] = useState({
    id_admin: "",
    fonction: "",
    id_utilisateur: "",
  });

  const handleInputAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({
      ...admin,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });
      if (response.ok) {
        alert("Utilisateur de type admin créé avec succès");
        router.push("/utilisateur/admin");
      } else {
        await deleteUser(id_utilisateur);
        console.error(response);
      }
    } catch (error) {
      await deleteUser(id_utilisateur);
      console.error(error);
    }
  };

  return (
    <AdminForm
      isUpdate={false}
      id_utilisateur={id_utilisateur}
      admin={admin}
      handleInputChange={handleInputAdmin}
      handleSubmit={handleAdmin}
    />
  );
}

export default AdministrateurFormulaire;
