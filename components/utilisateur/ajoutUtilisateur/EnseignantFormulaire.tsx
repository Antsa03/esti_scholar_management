import { useState } from "react";
import deleteUser from "@/utils/deleteUser";
import EnseignantForm from "@/views/utilisateur/enseignant/EnseignantForm";

interface EnseignantFormProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function EnseignantFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: EnseignantFormProps) {
  //Tout ce qui concernant l'enseignant
  const [enseignant, setEnseignant] = useState({
    id_enseignant: "",
    diplome: "",
    grade: "",
    id_utilisateur: "",
  });

  const handleInputEnseignant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnseignant({
      ...enseignant,
      [event.target.name]: event.target.value,
    });
  };

  const handleEnseignant = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/enseignant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enseignant),
      });
      if (response.ok) {
        alert("utilisateur de type enseignant créé");
        router.push("/utilisateur/enseignant");
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
    <EnseignantForm
      id_utilisateur={id_utilisateur}
      isUpdate={false}
      enseignant={enseignant}
      handleInputChange={handleInputEnseignant}
      handleSubmit={handleEnseignant}
    />
  );
}

export default EnseignantFormulaire;
