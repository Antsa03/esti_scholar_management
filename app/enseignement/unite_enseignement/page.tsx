"use client";
import React, { useEffect, useState } from 'react'
import UEList from '@/views/enseignement/unite_enseignement/UEList';
import Unite_enseignement from '@/models/enseignement/Unite_enseignement';

function UniteEnseignement() {

    const [unite_enseignements, setUnite_enseignements] = useState<Array<Unite_enseignement>>([]);
    const fetchUniteEnseignement = async() => {
        try {
            const response = await fetch('/api/enseignement/unite_enseignement');
            const data = await response.json();
            setUnite_enseignements(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUniteEnseignement();
    }, []);

    const handleDelete = async(id_ue: string) => {
        try {
            const response = await fetch(`/api/enseignement/unite_enseignement/delete/${id_ue}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                alert("Unité d'enseignement supprimé avec succès");
                fetchUniteEnseignement();
            } else {
                alert("Echec de la suppression");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <UEList 
            unite_enseignements={unite_enseignements}
            handleDelete={handleDelete}
        />
    )
}

export default UniteEnseignement