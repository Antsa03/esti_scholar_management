"use client";
import Calendrier_2 from "@/models/note_1/Calendrier_2";
import Calendrier_2_List from "@/views/note/calendrier_2/Calendrier_2_List";
import { useState, useEffect } from "react";

function Calendrier_2() {
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

  const handleDelete = async (id_calendrier_2: string) => {
    try {
      const response = await fetch(
        `/api/note_1/calendrier_2/delete/${id_calendrier_2}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Calendrier_2 supprimé avec succès");
        fetchCalendrier_2();
      } else {
        alert("Echec de la suppression");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Calendrier_2_List
      calendrier_2={calendrier_2}
      handleDelete={handleDelete}
    />
  );
}

export default Calendrier_2;
