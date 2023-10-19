"use client";
import Demande_absence_Form from "@/views/demande_absence/Demande_absence_Form";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Demande_absence_Ajout() {
  const router = useRouter();
  const [demande_absence, setDemande_absence] = useState({
    id_demande_absence: "",
    num_matricule: "",
    motif: "",
    date_demandee: "",
  });

  const handleInputDemandeAbsence = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDemande_absence({
      ...demande_absence,
      [event.target.name]: event.target.value,
    });
  };

  const handleDemandeAbsence = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/demande_absence/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(demande_absence),
      });
      if (response.ok) {
        alert("Demande d'absence créée avec succès");
        router.push("/demande_absence");
      } else {
        alert("Echec de la création de demande d'absence");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Demande_absence_Form
      isUpdate={false}
      demande_absence={demande_absence}
      handleInputChange={handleInputDemandeAbsence}
      handleSubmit={handleDemandeAbsence}
    />
  );
}

export default Demande_absence_Ajout;
