"use client";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import NoteForm from "@/views/note/NoteForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function NoteAjout() {
  const router = useRouter();

  const [calendrier_2, setCalendrier_2] = useState<Array<Calendrier_2>>([]);
  const fetchCalendrier_2 = async () => {
    try {
      const response = await fetch("/api/note_1/calendrier_2");
      const data = await response.json();
      setCalendrier_2(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCalendrier_2();
  }, []);

  //Tout ce qui concerne noter_1
  const [noter_1, setNoter_1] = useState({
    id_noter_1: "",
    id_calendrier_2: "",
    num_matricule: "",
    code_matiere: "",
    note_matiere: "",
  });

  const handleInputNoter_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoter_1({
      ...noter_1,
      [event.target.name]: event.target.value,
    });
  };

  const handleNoter_1 = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/note_1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noter_1),
      });
      if (response.ok) {
        alert("Noter_1 créé avec succès");
        router.push("/note");
      } else {
        alert("Echec de la création de noter_1");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteForm
      isUpdate={false}
      calendrier_2={calendrier_2}
      noter_1={noter_1}
      handleInputChange={handleInputNoter_1}
      handleSubmit={handleNoter_1}
    />
  );
}

export default NoteAjout;
