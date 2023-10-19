"use client";
import Demande_absence_Form from "@/views/demande_absence/Demande_absence_Form";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Demande_absence_Edit() {
  const router = useRouter();
  const params = useParams();
  const [demande_absence, setDemande_absence] = useState({
    id_demande_absence: "",
    num_matricule: "",
    motif: "",
    date_demandee: "",
  });

  const fetchDemande_absence = async () => {
    try {
      const response = await fetch(
        `/api/demande_absence/${params?.id_demande_absence}`
      );
      const data = await response.json();
      setDemande_absence(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDemande_absence();
  }, []);

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
      const response = await fetch(
        `/api/demande_absence/update/${params?.id_demande_absence}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(demande_absence),
        }
      );
      if (response.ok) {
        alert("Demande d'absence modifiée avec succès");
        router.push("/demande_absence");
      } else {
        alert("Echec de la modification de demande d'absence");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Demande_absence_Form
      isUpdate
      demande_absence={demande_absence}
      handleInputChange={handleInputDemandeAbsence}
      handleSubmit={handleDemandeAbsence}
    />
  );
}

export default Demande_absence_Edit;
