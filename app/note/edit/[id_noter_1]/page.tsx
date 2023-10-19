"use client";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import NoteForm from "@/views/note/NoteForm";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Noter_1_Edit() {
  const params = useParams();
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

  const fetchNoter_1 = async () => {
    try {
      const response = await fetch(`/api/note_1/${params?.id_noter_1}`);
      const data = await response.json();
      setNoter_1(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNoter_1();
  }, [params?.id_noter_1]);

  const handleInputNoter_1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoter_1({
      ...noter_1,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateNoter_1 = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/note_1/update/${params?.id_noter_1}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noter_1),
      });
      if (response.ok) {
        alert("Noter_1 modifié avec succès");
        router.push("/note");
      } else {
        alert("Echec de la modification de noter_1");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <NoteForm
      isUpdate
      calendrier_2={calendrier_2}
      noter_1={noter_1}
      handleInputChange={handleInputNoter_1}
      handleSubmit={handleUpdateNoter_1}
    />
  );
}

export default Noter_1_Edit;
