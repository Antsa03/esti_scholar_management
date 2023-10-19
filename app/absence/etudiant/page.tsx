"use client";
import Absence from "@/models/absence/etudiant/listage/Absence";
import AbsenceList from "@/views/absence/etudiant/AbsenceList";
import { useState, useEffect } from "react";

function Absence() {
  const [absences, setAbsences] = useState<Array<Absence>>([]);
  const fetchAbsences = async () => {
    try {
      const response = await fetch("/api/absence/etudiant");
      const data = await response.json();
      setAbsences(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbsences();
  }, []);

  const handleDelete = async (id_calendrier_3: string) => {
    try {
      const response = await fetch(
        `/api/absence/etudiant/calendrier_3/delete/${id_calendrier_3}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Suppression de absence avec succès");
        fetchAbsences();
      } else {
        alert("Echec de la suppression");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <AbsenceList absences={absences} handleDelete={handleDelete} />;
}

export default Absence;
