'use client';
import Matiere from '@/models/enseignement/Matiere'
import MatiereList from '@/views/enseignement/matiere/MatiereList';
import React, { useEffect, useState } from 'react'

function Matiere() {

    const [matieres, setMatieres] = useState<Array<Matiere>>([]);

    const fetchMatieres = async() => {
        try {
            const response = await fetch('/api/enseignement/matiere');
            const data = await response.json();
            setMatieres(data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMatieres();
    }, []);

    const handleDelete = async(code_matiere: string) => {
        try {
            const response = await fetch(`/api/enseignement/matiere/delete/${code_matiere}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                alert("Matière supprimée avec succès");
                fetchMatieres();
            } else {
                alert("Echec de la suppression");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <MatiereList 
            matieres={matieres}
            handleDelete={handleDelete}
        />
    )
}

export default Matiere
