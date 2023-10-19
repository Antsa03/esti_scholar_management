"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Calendrier_2_Form from "@/views/note/calendrier_2/Calendrier_2_Form";

function Calendrier_2_Ajout() {
  const router = useRouter();
  //Tout ce qui concerne calendrier_2
  const [calendrier_2, setCalendrier_2] = useState({
    id_calendrier_2: "",
    annee_universitaire_2: "",
    semestre: "",
    session: "",
  });
  const handleInputCalendrier_2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCalendrier_2({
      ...calendrier_2,
      [event.target.name]: event.target.value,
    });
  };

  const handleCalendrier2 = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/note_1/calendrier_2/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calendrier_2),
      });
      if (response.ok) {
        alert("Calendrier créé avec succès");
        router.push("/note/calendrier_2");
      } else {
        alert("Echec de la création de calendrier_2");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Calendrier_2_Form
      isUpdate={false}
      calendrier_2={calendrier_2}
      handleInputChange={handleInputCalendrier_2}
      handleSubmit={handleCalendrier2}
    />
  );
}

export default Calendrier_2_Ajout;
