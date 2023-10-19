'use client'
import { useState, useEffect } from "react";
import EtudiantList from "@/views/utilisateur/etudiant/EtudiantList";
import Etudiant from "@/models/utilisateur/listage/Etudiant";

function Etudiant() {

    const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);

    const fetchEtudiants = async () => {
        try {
            const response = await fetch('/api/utilisateur/etudiant');
            const data = await response.json();
            setEtudiants(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect (() => {
        fetchEtudiants();
    }, [])
    
    const handleDelete = async(id_utilisateur: string) => {
        try {
            const response = await fetch(`/api/utilisateur/delete/${id_utilisateur}`, {
                method: "DELETE"
            });
            if(response.ok) {
                alert("Utilisateur supprimé avec succès");
                fetchEtudiants();
            }
            else
                console.error(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <EtudiantList 
            etudiants={etudiants}
            handleDelete={handleDelete}
        />
    )
}

export default Etudiant