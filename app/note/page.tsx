"use client";
import Noter_1 from "@/models/note_1/Noter_1";
import NoteList from "@/views/note/NoteList";
import React, { useEffect, useState } from "react";

function Note() {
  const [noter_1, setNoter_1] = useState<Array<Noter_1>>([]);
  const fetchNoter_1 = async () => {
    try {
      const response = await fetch("/api/note_1");
      const data = await response.json();
      setNoter_1(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNoter_1();
  }, []);

  const handleDelete = async (id_noter_1: string) => {
    try {
      const response = await fetch(`/api/note_1/delete/${id_noter_1}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Note supprimée avec succès");
        fetchNoter_1();
      } else {
        alert("Echec de suppression du note");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return <NoteList noter_1={noter_1} handleDelete={handleDelete} />;
}

export default Note;
