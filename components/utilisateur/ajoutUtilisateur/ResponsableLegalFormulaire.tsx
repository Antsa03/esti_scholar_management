import { useState } from "react";
import ResponsableLegalForm from "@/views/utilisateur/responsable_legal/ResponsableLegalForm";
import deleteUser from "@/utils/deleteUser";

interface ResponsableLegalFormulaireProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function ResponsableLegalFormulaire({
  handleUtilisateur,
  id_utilisateur,
  router,
}: ResponsableLegalFormulaireProps) {
  //Tout ce qui concerne le responsable légal
  const [responsable_legal, setResponsable_legal] = useState({
    id_responsable_legal: "",
    profession: "",
    id_utilisateur: "",
  });

  const handleInputResponsableLegal = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResponsable_legal({
      ...responsable_legal,
      [event.target.name]: event.target.value,
    });
  };

  const handleResponsableLegal = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await handleUtilisateur();
      const response = await fetch(
        "/api/utilisateur/responsable_legal/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responsable_legal),
        }
      );
      if (response.ok) {
        alert("Utilisateur de type responsable légal créé avec succès");
        router.push("/utilisateur/responsable_legal");
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
    <ResponsableLegalForm
      isUpdate={false}
      id_utilisateur={id_utilisateur}
      responsable_legal={responsable_legal}
      handleInputChange={handleInputResponsableLegal}
      handleSubmit={handleResponsableLegal}
    />
  );
}

export default ResponsableLegalFormulaire;
