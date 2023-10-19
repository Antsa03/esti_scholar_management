"use client";
import AbsenceForm from "@/views/absence/etudiant/AbsenceForm";
import Calendrier_3_Form from "@/views/absence/etudiant/calendrier_3/Calendrier_3_Form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Absence_Ajout() {
  const router = useRouter();
  //Tout ce qui concerne calendrier_3
  const [calendrier_3, setCalendrier_3] = useState({
    id_calendrier_3: "",
    date_deb_abs: "",
    heure_deb_abs: "",
  });
  const handleInputCalendrier_3 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCalendrier_3({
      ...calendrier_3,
      [event.target.name]: event.target.value,
    });
  };

  const handleCalendrier_3 = async () => {
    try {
      const response = await fetch(
        "/api/absence/etudiant/calendrier_3/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_3),
        }
      );
      if (response.ok) {
        console.log("Calendrier_3 crée avec succès");
      } else console.log("Echec de la création de calendrier_3");
    } catch (error) {
      console.error(error);
    }
  };

  //Tout ce qui concerne l'absence
  const [absence, setAbsence] = useState({
    id_absence: "",
    num_matricule: "",
    code_matiere: "",
    id_calendrier_3: "",
    type_absence: "",
    date_fin_abs: "",
    heure_fin_abs: "",
    justifiee: "",
  });

  const handleInputAbsence = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbsence({
      ...absence,
      [event.target.name]: event.target.value,
    });
  };

  const handleAbsence = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleCalendrier_3();
    try {
      const response = await fetch("/api/absence/etudiant/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(absence),
      });
      if (response.ok) {
        alert("Absence créée avec succès");
        router.push("/absence/etudiant");
      } else {
        alert("Echec de la création de l'absence");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Calendrier_3_Form
        isUpdate={false}
        calendrier_3={calendrier_3}
        handleInputChange={handleInputCalendrier_3}
      />
      <AbsenceForm
        isUpdate={false}
        id_calendrier_3={calendrier_3.id_calendrier_3}
        absence={absence}
        handleInputChange={handleInputAbsence}
        handleSubmit={handleAbsence}
      />
    </>
  );
}

export default Absence_Ajout;
