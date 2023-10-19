"use client";
import { useState, useEffect } from 'react';
import Enseignant from '@/models/utilisateur/listage/Enseignant';
import EnseignantList from '@/views/utilisateur/enseignant/EnseignantList';

function Enseignant() {

    const [enseignants, setEnseignants] = useState<Array<Enseignant>>([]);

    const fetchEnseignants = async () => {
        try {
            const response = await fetch('/api/utilisateur/enseignant');
            const data = await response.json();
            setEnseignants(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEnseignants();
    }, []);

    const handleDelete = async(id_utilisateur: string) => {
        try {
            const response = await fetch(`/api/utilisateur/delete/${id_utilisateur}`, {
                method: "DELETE"
            });
            if(response.ok) {
                alert("Utilisateur supprimé avec succès");
                fetchEnseignants();
            }
            else
                console.error(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <EnseignantList 
            enseignants={enseignants}
            handleDelete={handleDelete}
        />
    )
}

export default Enseignant