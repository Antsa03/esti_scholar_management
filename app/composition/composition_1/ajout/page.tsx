"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Composition1_Form from "@/views/composition/composition_1/Composition1_Form";
import Matiere from "@/models/enseignement/Matiere";
import Unite_enseignement from "@/models/enseignement/Unite_enseignement";

function Composer1_Ajout() {
  const router = useRouter();
  const [composer_1, setComposer_1] = useState({
    id_composer_1: "",
    code_matiere: "",
    id_ue: "",
    annee_universitaire_1: "",
  });

  const handleInputComposer1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComposer_1({
      ...composer_1,
      [event.target.name]: event.target.value,
    });
  };

  const [matieres, setMatieres] = useState<Array<Matiere>>([]);
  const fetchMatieres = async () => {
    try {
      const response = await fetch("/api/enseignement/matiere");
      const data = await response.json();
      setMatieres(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [unite_enseignements, setUnite_enseignements] = useState<
    Array<Unite_enseignement>
  >([]);
  const fetchUnite_enseignements = async () => {
    try {
      const response = await fetch("/api/enseignement/unite_enseignement");
      const data = await response.json();
      setUnite_enseignements(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMatieres();
    fetchUnite_enseignements();
  }, []);

  const handleComposer1 = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/composition/composition1/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(composer_1),
      });
      if (response.ok) {
        alert("Création de composition1 avec succès");
        router.push("/composition/composition_1");
      } else {
        alert("Echec de la création de composition1");
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Composition1_Form
      isUpdate={false}
      composer_1={composer_1}
      matieres={matieres}
      unite_enseignements={unite_enseignements}
      handleInputChange={handleInputComposer1}
      handleSubmit={handleComposer1}
    />
  );
}

export default Composer1_Ajout;
