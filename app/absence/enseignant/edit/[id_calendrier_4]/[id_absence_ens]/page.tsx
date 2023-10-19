"use client";
import Calendrier_4_Form from "@/views/absence/enseignant/calendrier_4/Calendrier_4_Form";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AbsenceEnseignant_Form from "@/views/absence/enseignant/AbsenceEnseignant_Form";

function AbsenceEnseignant_Edit() {
  const router = useRouter();
  const params = useParams();
  // Tout ce qui concerne calendrier_4
  const [calendrier_4, setCalendrier_4] = useState({
    id_calendrier_4: "",
    date_deb_abs_ens: "",
    heure_deb_abs_ens: "",
  });

  const fetchCalendrier_4 = async () => {
    try {
      const response = await fetch(
        `/api/absence/enseignant/calendrier_4/${params?.id_calendrier_4}`
      );
      const data = await response.json();
      setCalendrier_4(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_4();
  }, [params?.id_calendrier_4]);

  const handleInputCalendrier_4 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCalendrier_4({
      ...calendrier_4,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCalendrier_4 = async () => {
    try {
      const response = await fetch(
        `/api/absence/enseignant/calendrier_4/update/${params?.id_calendrier_4}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_4),
        }
      );
      if (response.ok) console.log("Calendrier_4 modifié avec succès");
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

  const fetchAbsenceEnseignant = async () => {
    try {
      const response = await fetch(
        `/api/absence/enseignant/${params?.id_absence_ens}`
      );
      const data = await response.json();
      setAbsence_enseignant(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbsenceEnseignant();
  }, [params?.id_absence_ens]);

  const handleInputAbsence_enseignant = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAbsence_enseignant({
      ...absence_enseignant,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateAbsenceEnseignant = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await handleUpdateCalendrier_4();
    try {
      const response = await fetch(
        `/api/absence/enseignant/update/${params?.id_absence_ens}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(absence_enseignant),
        }
      );
      if (response.ok) {
        alert("Absence enseignant modifiée avec succès");
        router.push("/absence/enseignant");
      } else {
        alert("Echec de la modification de l'absence enseignant");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Calendrier_4_Form
        isUpdate={true}
        calendrier_4={calendrier_4}
        handleInputChange={handleInputCalendrier_4}
      />
      <AbsenceEnseignant_Form
        isUpdate={true}
        id_calendrier_4={calendrier_4.id_calendrier_4}
        absence_enseignant={absence_enseignant}
        handleInputChange={handleInputAbsence_enseignant}
        handleSubmit={handleUpdateAbsenceEnseignant}
      />
    </>
  );
}

export default AbsenceEnseignant_Edit;
