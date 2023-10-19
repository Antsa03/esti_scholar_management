import { useState } from "react";
import deleteUser from "@/utils/deleteUser";
import EtudiantForm from "@/views/utilisateur/etudiant/EtudiantForm";

interface EtudiantFormulaireProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function EtudiantFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: EtudiantFormulaireProps) {
  //Tout ce qui concerne l'étudiant
  const [etudiant, setEtudiant] = useState({
    num_matricule: "",
    date_naissance: "",
    lieu_naissance: "",
    nationalite: "",
    id_utilisateur: "",
  });

  const handleInputEtudiant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEtudiant({
      ...etudiant,
      [event.target.name]: event.target.value,
    });
  };

  const handleEtudiant = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await handleUtilisateur();
      const response = await fetch("/api/utilisateur/etudiant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etudiant),
      });
      if (response.ok) {
        alert("Utilisateur de l'étudiant créer");
        router.push("/utilisateur/etudiant");
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
    <EtudiantForm
      isUpdate={false}
      id_utilisateur={id_utilisateur}
      etudiant={etudiant}
      handleInputChange={handleInputEtudiant}
      handleSubmit={handleEtudiant}
    />
  );
}

export default EtudiantFormulaire;
