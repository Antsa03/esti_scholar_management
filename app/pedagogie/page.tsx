'use client';
import { useEffect, useState } from 'react'
import Niveau from '@/models/pedagogie/Niveau'
import NiveauList from '@/views/pedagogie/niveau/NiveauList';
import ParcoursList from '@/views/pedagogie/parcours/ParcoursList';
import Parcours from '@/models/pedagogie/Parcours';

function Pedagogie() {

    // Tout ce qui concerne le niveau
    const [niveaux, setNiveaux] = useState<Array<Niveau>>([]);
    const fetchNiveaux = async() => {
        try {
            const response = await fetch('/api/pedagogie/niveau');
            const data = await response.json();
            setNiveaux(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteNiveau = async(id_niveau: string) => {
        try {
            const response = await fetch(`/api/pedagogie/niveau/delete/${id_niveau}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                alert("Suppression de niveau avec succès");
                fetchNiveaux();
            } else {
                alert("Echec de la suppression");
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Tout ce qui concerne le parcours
    const [parcours, setParcours] = useState<Array<Parcours>>([]);
    const fetchParcours = async() => {
        try {
            const response = await fetch('/api/pedagogie/parcours');
            const data = await response.json();
            setParcours(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteParcours = async(id_parcours: string) => {
        try {
            const response = await fetch(`/api/pedagogie/parcours/delete/${id_parcours}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                alert("Suppression de parcours avec succès");
                fetchParcours();
            } else {
                alert("Echec de la suppression de parcours");
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNiveaux();
        fetchParcours();
    }, []);    

    return (
        <>
            <NiveauList 
                niveaux={niveaux}
                handleDelete={handleDeleteNiveau}
            />
            <ParcoursList
                parcours={parcours}
                handleDelete={handleDeleteParcours}
            />
        </>
    )
}

export default Pedagogie