"use client";
import Enseignant from '@/models/utilisateur/listage/Enseignant';
import MatiereForm from '@/views/enseignement/matiere/MatiereForm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function MatiereAjout() {
    
    const router = useRouter();
    const handleNavigation = () => {
        router.push('/enseignement/matiere');
    }

    const [matiere, setMatiere] = useState({
        code_matiere: '',
        designation_matiere: '',
        coeff: 0,
        v_horaire_matiere: 0,
        description: '',
        id_enseignant: ''
    });

    const handleInputMatiere = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatiere({
            ...matiere,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmitMatiere = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/enseignement/matiere/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(matiere)
            });
            if(response.ok) {
                alert("Matière créée avec succès");
                handleNavigation();
            } else {
                alert("Echec de la création de matière");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    const [enseignants, setEnseignant] = useState<Array<Enseignant>>([]);
    const fetchEnseignants = async() => {
        try {
            const response = await fetch('/api/utilisateur/enseignant');
            const data = await response.json();
            setEnseignant(data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEnseignants();
    }, []);

    return (
        <MatiereForm
            isUpdate={false}
            matiere={matiere}
            enseignants={enseignants}
            handleInputChange={handleInputMatiere}
            handleSubmit={handleSubmitMatiere}
            handleNavigation={handleNavigation}
        />
    )
}

export default MatiereAjout