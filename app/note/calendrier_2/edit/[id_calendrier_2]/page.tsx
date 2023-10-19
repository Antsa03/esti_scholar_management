"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Calendrier_2_Form from "@/views/note/calendrier_2/Calendrier_2_Form";

function Calendrier_2_Edit() {
  const params = useParams();
  const router = useRouter();
  //Tout ce qui concerne calendrier_2
  const [calendrier_2, setCalendrier_2] = useState({
    id_calendrier_2: "",
    annee_universitaire_2: "",
    semestre: "",
    session: "",
  });

  const fetchCalendrier_2 = async () => {
    try {
      const response = await fetch(
        `/api/note_1/calendrier_2/${params?.id_calendrier_2}`
      );
      const data = await response.json();
      setCalendrier_2(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_2();
  }, [params?.id_calendrier_2]);

  const handleInputCalendrier_2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCalendrier_2({
      ...calendrier_2,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCalendrier2 = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/note_1/calendrier_2/update/${params?.id_calendrier_2}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(calendrier_2),
        }
      );
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
      isUpdate
      calendrier_2={calendrier_2}
      handleInputChange={handleInputCalendrier_2}
      handleSubmit={handleUpdateCalendrier2}
    />
  );
}

export default Calendrier_2_Edit;
