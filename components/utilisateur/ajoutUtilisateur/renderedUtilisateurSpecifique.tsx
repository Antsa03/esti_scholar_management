"use client";
import React from "react";
import { useState } from "react";
import AdministrateurFormulaire from "./AdministrateurFormulaire";
import EtudiantFormulaire from "./EtudiantFormulaire";
import ResponsableLegalFormulaire from "./ResponsableLegalFormulaire";
import EnseignantFormulaire from "./EnseignantFormulaire";

interface renderedUtilisateurProps {
  handleUtilisateur: Function;
  id_utilisateur: string;
  router: any;
}

function RenderedUtilisateurSpecifique({
  handleUtilisateur,
  id_utilisateur,
  router,
}: renderedUtilisateurProps) {
  const [inputChecked, SetInputChecked] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetInputChecked(e.target.value);
  };

  const renderComponent = (inputChecked: string) => {
    switch (inputChecked) {
      case "enseignant":
        return (
          <EnseignantFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
          />
        );
      case "etudiant":
        return (
          <EtudiantFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
          />
        );
      case "responsable":
        return (
          <ResponsableLegalFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
          />
        );
      default:
        return (
          <AdministrateurFormulaire
            handleUtilisateur={handleUtilisateur}
            id_utilisateur={id_utilisateur}
            router={router}
          />
        );
    }
  };

  return (
    <div className="flex flex-row gap-12 w-fit">
      <div className="flex flex-col flex-2 gap-4">
        <div className="flex flex-row gap-[28px]  w-[340px]">
          <div className="flex flex-col w-[340px] h-[61px]">
            <label htmlFor="sexe" className="text-xl mb-[10px]">
              Type utilisateur
            </label>
            <div className="flex flex-row text-[14px] gap-3 mb-4 w-[450px]">
              <div className="flex flex-row items-center gap-1 w-auto">
                <span>Admin</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="admin"
                  onChange={handleChange}
                  defaultChecked={true}
                />
              </div>
              <div className="flex flex-row items-center gap-1 w-auto">
                <span>Enseignant</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="enseignant"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row items-center gap-1 w-auto">
                <span>Etudiant</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="etudiant"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-row items-center flex-nowrap gap-1 w-auto">
                <span className="whitespace-no-wrap">Responsable légal</span>
                <input
                  type="radio"
                  name="sexe"
                  className=""
                  value="responsable"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {renderComponent(inputChecked)}
      </div>
    </div>
  );
}

export default RenderedUtilisateurSpecifique;
