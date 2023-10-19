"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import { uploadImg } from "@/utils/uploadImg";
import RenderedUtilisateurSpecifique from "@/components/utilisateur/ajoutUtilisateur/renderedUtilisateurSpecifique";

function Inscription() {
  // Fonction pour naviguer
  const router = useRouter();

  // Téléversement du fichier image
  const [file, setFile] = useState<File>();

  // Tout ce qui concerne l'utilisateur
  const [utilisateur, setUtilisateur] = useState({
    id_utilisateur: "",
    photo_profil: "",
    nom: "",
    prenoms: "",
    sexe: "",
    adresse: "",
    telephone: "",
    email: "",
    mot_de_passe: "",
  });

  const handleInputUtilisateur = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUtilisateur({
      ...utilisateur,
      [event.target.name]: event.target.value,
    });
  };

  const handleUtilisateur = async () => {
    try {
      const response = await fetch("/api/utilisateur/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateur),
      });
      if (response.ok) {
        console.log("Utilisateur créé avec succès");
        uploadImg(file);
      } else console.error(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UtilisateurForm
        utilisateur={utilisateur}
        handleInputChange={handleInputUtilisateur}
        file={file}
        setFile={setFile}
        isUpdate={false}
      />

      <RenderedUtilisateurSpecifique
        handleUtilisateur={handleUtilisateur}
        id_utilisateur={utilisateur.id_utilisateur}
        router={router}
      />
    </>
  );
}

export default Inscription;
