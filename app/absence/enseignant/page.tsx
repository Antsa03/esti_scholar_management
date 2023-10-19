"use client";
import Absence_enseignant from "@/models/absence/enseignant/listage/Absence_enseignant";
import AbsenceEnseignant_List from "@/views/absence/enseignant/AbsenceEnseignant_List";
import React, { useEffect, useState } from "react";

function AbsenceEnseignant() {
  const [absence_enseignants, setAbsence_enseignants] = useState<
    Array<Absence_enseignant>
  >([]);
  const fetchAbsence_enseignants = async () => {
    try {
      const response = await fetch("/api/absence/enseignant");
      const data = await response.json();
      setAbsence_enseignants(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbsence_enseignants();
  }, []);

  const handleDelete = async (id_calendrier_4: string) => {
    try {
      const response = await fetch(
        `/api/absence/enseignant/calendrier_4/delete/${id_calendrier_4}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Absence enseignant supprimée avec succès");
        fetchAbsence_enseignants();
      } else {
        alert("Echec de la suppression");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AbsenceEnseignant_List
      absence_enseignants={absence_enseignants}
      handleDelete={handleDelete}
    />
  );
}

export default AbsenceEnseignant;
