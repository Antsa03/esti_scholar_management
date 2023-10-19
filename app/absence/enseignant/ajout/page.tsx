"use client";
import Calendrier_4_Form from "@/views/absence/enseignant/calendrier_4/Calendrier_4_Form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AbsenceEnseignant_Form from "@/views/absence/enseignant/AbsenceEnseignant_Form";

function AbsenceEnseignant_Ajout() {
  const router = useRouter();

  // Tout ce qui concerne calendrier_4
  const [calendrier_4, setCalendrier_4] = useState({
    id_calendrier_4: "",
    date_deb_abs_ens: "",
    heure_deb_abs_ens: "",
  });

  const handleInputCalendrier_4 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCalendrier_4({
      ...calendrier_4,
      [event.target.name]: event.target.value,
    });
  };

  const handleCalendrier_4 = async () => {
    try {
      const response = await fetch(
        "/api/absence/enseignant/calendrier_4/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_4),
        }
      );
      if (response.ok) console.log("Calendrier_4 crée avec succès");
      else console.error(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Tout ce qui concerne l'absence enseignant
  const [absence_enseignant, setAbsence_enseignant] = useState({
    id_absence_ens: "",
    code_matiere: "",
    id_calendrier_4: "",
    date_fin_abs_ens: "",
    heure_fin_abs_ens: "",
    justifiee_ens: "",
  });

  const handleInputAbsence_enseignant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAbsence_enseignant({
      ...absence_enseignant,
      [event.target.name]: event.target.value,
    });
  };

  const handleAbsenceEnseignant = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await handleCalendrier_4();
    try {
      const response = await fetch("/api/absence/enseignant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(absence_enseignant),
      });
      if (response.ok) {
        alert("Absence enseignant crée avec succès");
        router.push("/absence/enseignant");
      } else {
        alert("Echec de la création de l'absence enseignant");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Calendrier_4_Form
        isUpdate={false}
        calendrier_4={calendrier_4}
        handleInputChange={handleInputCalendrier_4}
      />
      <AbsenceEnseignant_Form
        isUpdate={false}
        id_calendrier_4={calendrier_4.id_calendrier_4}
        absence_enseignant={absence_enseignant}
        handleInputChange={handleInputAbsence_enseignant}
        handleSubmit={handleAbsenceEnseignant}
      />
    </>
  );
}

export default AbsenceEnseignant_Ajout;
