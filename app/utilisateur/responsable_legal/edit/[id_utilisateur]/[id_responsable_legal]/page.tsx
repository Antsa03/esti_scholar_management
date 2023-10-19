"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm";
import ResponsableLegalForm from "@/views/utilisateur/responsable_legal/ResponsableLegalForm";
import { uploadImg } from "@/utils/uploadImg";

function ResponsableLegalEdit() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/utilisateur/responsable_legal");
  };

  const params = useParams();

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

  const fetchUtilisateur = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/${params?.id_utilisateur}`
      );
      const data = await response.json();
      setUtilisateur(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputUtilisateur = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUtilisateur({
      ...utilisateur,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetchUtilisateur();
  }, [params?.id_utilisateur]);

  const handleUpdateUtilisateur = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/update/${params?.id_utilisateur}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(utilisateur),
        }
      );
      if (response.ok) console.log("Utilisateur modifié avec succès");
      else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne le responsable légal
  const [responsable_legal, setResponsableLegal] = useState({
    id_responsable_legal: "",
    profession: "",
    id_utilisateur: "",
  });

  const fetchResponsableLegal = async () => {
    try {
      const response = await fetch(
        `/api/utilisateur/responsable_legal/${params?.id_responsable_legal}`
      );
      const data = await response.json();
      setResponsableLegal(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResponsableLegal();
  }, [params?.id_reponsable_legal]);

  const handleInputResponsableLegal = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResponsableLegal({
      ...responsable_legal,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateResponsableLegal = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await handleUpdateUtilisateur();
      const response = await fetch(
        `/api/utilisateur/responsable_legal/update/${params?.id_responsable_legal}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsable_legal),
        }
      );
      if (response.ok) {
        uploadImg(file);
        alert("Utilisateur de type responsable légal modifié avec succès");
        handleNavigation();
      } else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UtilisateurForm
        utilisateur={utilisateur}
        handleInputChange={handleInputUtilisateur}
        file={file}
        setFile={setFile}
        isUpdate={true}
      />

      <ResponsableLegalForm
        isUpdate
        id_utilisateur={utilisateur.id_utilisateur}
        responsable_legal={responsable_legal}
        handleInputChange={handleInputResponsableLegal}
        handleSubmit={handleUpdateResponsableLegal}
      />
    </>
  );
}

export default ResponsableLegalEdit;
