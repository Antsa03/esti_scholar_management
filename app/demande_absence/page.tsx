"use client";
import Demande_absence from "@/models/demande_absence/Demande_absence";
import Demande_absence_List from "@/views/demande_absence/Demande_absence_List";
import { useState, useEffect } from "react";

function Demande_absence() {
  const [demande_absences, setDemande_absences] = useState<
    Array<Demande_absence>
  >([]);
  const fetchDemande_absences = async () => {
    try {
      const response = await fetch("/api/demande_absence");
      const data = await response.json();
      setDemande_absences(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDemande_absences();
  }, []);

  const handleDelete = async (id_demande_absence: string) => {
    try {
      const response = await fetch(
        `/api/demande_absence/delete/${id_demande_absence}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Suppression de demande d'absence avec succès");
        fetchDemande_absences();
      } else {
        alert("Echec de la suppression de demande d'absence");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Demande_absence_List
      demande_absences={demande_absences}
      handleDelete={handleDelete}
    />
  );
}

export default Demande_absence;
