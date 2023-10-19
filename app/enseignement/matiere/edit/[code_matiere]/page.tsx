"use client";
import Enseignant from '@/models/utilisateur/listage/Enseignant';
import MatiereForm from '@/views/enseignement/matiere/MatiereForm';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function MatiereAjout() {
    
    const params = useParams();

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

    const fetchMatiere = async() => {
        try {
            const response = await fetch(`/api/enseignement/matiere/${params?.code_matiere}`);
            const data = await response.json();
            setMatiere(data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMatiere();
    }, [params?.code_matiere])

    const handleInputMatiere = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatiere({
            ...matiere,
            [event.target.name]: event.target.value
        });
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

    const handleUpdateMatiere = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/enseignement/matiere/update/${params?.code_matiere}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(matiere)
            });
            if(response.ok) {
                alert("Matière modifiée avec succès");
                handleNavigation();
            } else {
                alert("Echec de la création de matière");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <MatiereForm
            isUpdate={true}
            matiere={matiere}
            enseignants={enseignants}
            handleInputChange={handleInputMatiere}
            handleSubmit={handleUpdateMatiere}
            handleNavigation={handleNavigation}
        />
    )
}

export default MatiereAjout