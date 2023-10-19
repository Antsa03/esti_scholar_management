import React from "react";

function UtilisateurForm() {
  return (
    <form className="flex flex-row gap-12  w-fit">
      <div className="flex flex-col flex-2 gap-4 ">
        <div className="flex flex-row gap-[8px] w-[340px] ">
          <div className="flex flex-col gap-[10px] h-[61px]">
            <label htmlFor="id_utilisateur" className="text-gray-700 text-sm">
              Id utilisateur
            </label>
            <input
              type="text"
              name="id_utilisateur"
              className="w-[120px] h-[40px] p-2 rounded-md bg-custom-bg-input border-custom-gray border-2"
            />
          </div>
          <div className="flex flex-col gap-[10px] w-[340px] h-[61px]">
            <label htmlFor="photos_profil" className="text-gray-700 text-sm">
              Photos de profil
            </label>
            <input
              type="file"
              name="id_utilisateur"
              className="w-[200px] h-[40px] p-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[10px] h-[61px]">
          <label htmlFor="nom" className="text-gray-700 text-sm">
            Nom
          </label>
          <input
            type="text"
            name="nom"
            className="w-[340px] h-[40px] p-2 rounded-md bg-custom-bg-input border-custom-gray border-2"
          />
        </div>
        <div className="flex flex-col gap-[10px] w-[340px] h-[61px]">
          <label htmlFor="sexe">Sexe</label>
          <div className="flex flex-row text-[12px] gap-2">
            <span>Masculin</span>
            <input type="radio" name="sexe" className="mr-2" value="Masculin" />
            <span>Feminin</span>
            <input type="radio" name="sexe" className="mr-2" value="Feminin" />
          </div>
        </div>
        <div className="flex flex-col gap-[10px] h-[61px]">
          <label htmlFor="email" className="text-gray-700 text-sm">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="w-[340px] h-[40px] p-2 rounded-md bg-custom-bg-input border-custom-gray border-2"
          />
        </div>
      </div>
      <div className="flex flex-col flex-2 gap-4">
        <div className="flex flex-col gap-[10px] h-[61px]">
          <label htmlFor="telephone" className="text-gray-700 text-sm">
            Téléphone
          </label>
          <input
            type="text"
            name="telephone"
            className="w-[340px] h-[40px] p-2 rounded-md bg-custom-bg-input border-custom-gray border-2"
          />
        </div>
        <div className="flex flex-col gap-[10px] h-[61px]">
          <label htmlFor="prenoms" className="text-gray-700 text-sm">
            Prénom(s)
          </label>
          <input
            type="text"
            name="presnoms"
            className="w-[340px] h-[40px] p-2 rounded-md bg-custom-bg-input border-custom-gray border-2"
          />
        </div>
        <div className="flex flex-col gap-[10px] h-[61px]">
          <label htmlFor="adresse" className="text-gray-700 text-sm">
            Adresse
          </label>
          <input
            type="text"
            name="adresse"
            className="w-[340px] h-[40px] p-2 rounded-md bg-custom-bg-input border-custom-gray border-2"
          />
        </div>
        <div className="flex flex-col gap-[10px] h-[61px]">
          <label htmlFor="mot_de_passe" className="text-gray-700 text-sm">
            Mot de passe
          </label>
          <input
            type="text"
            name="mot_de_passe"
            className="w-[340px] h-[40px] p-2 rounded-md bg-custom-bg-input border-custom-gray border-2"
          />
        </div>
      </div>
    </form>
  );
}

export default UtilisateurForm;
