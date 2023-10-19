"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Calendrier_3_Form from "@/views/absence/etudiant/calendrier_3/Calendrier_3_Form";
import AbsenceForm from "@/views/absence/etudiant/AbsenceForm";

function AbsenceEdit() {
  const router = useRouter();
  const params = useParams();
  //Tout ce qui concerne calendrier_3
  const [calendrier_3, setCalendrier_3] = useState({
    id_calendrier_3: "",
    date_deb_abs: "",
    heure_deb_abs: "",
  });

  const fetchCalendrier_3 = async () => {
    try {
      const response = await fetch(
        `/api/absence/etudiant/calendrier_3/${params?.id_calendrier_3}`
      );
      const data = await response.json();
      setCalendrier_3(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_3();
  }, [params?.id_calendrier_3]);

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
        `/api/absence/etudiant/calendrier_3/update/${params?.id_calendrier_3}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_3),
        }
      );
      if (response.ok) {
        console.log("Calendrier_3 modifiée avec succès");
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

  const fetchAbsence = async () => {
    try {
      const response = await fetch(
        `/api/absence/etudiant/${params?.id_absence}`
      );
      const data = await response.json();
      setAbsence(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbsence();
  }, [params?.id_absence]);

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
      const response = await fetch(
        `/api/absence/etudiant/update/${params?.id_absence}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(absence),
        }
      );
      if (response.ok) {
        alert("Absence modifiée avec succès");
        router.push("/absence/etudiant");
      } else {
        alert("Echec de la modification de l'absence");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Calendrier_3_Form
        isUpdate
        calendrier_3={calendrier_3}
        handleInputChange={handleInputCalendrier_3}
      />
      <AbsenceForm
        isUpdate
        id_calendrier_3={calendrier_3.id_calendrier_3}
        absence={absence}
        handleInputChange={handleInputAbsence}
        handleSubmit={handleAbsence}
      />
    </>
  );
}

export default AbsenceEdit;
