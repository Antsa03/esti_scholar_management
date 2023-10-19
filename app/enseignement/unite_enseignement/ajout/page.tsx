"use client";
import UEForm from '@/views/enseignement/unite_enseignement/UEForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function UniteEnseignementAjout() {

    const router = useRouter();

    const handleNavigation = () => {
        router.push('/enseignement/unite_enseignement');
    }

    const [unite_enseignement, setUnite_enseignement] = useState({
        id_ue: '',
        designation_ue: '',
        credit: 0,
    });

    const handleInputUE = async(event: React.ChangeEvent<HTMLInputElement>) => {
        setUnite_enseignement({
            ...unite_enseignement,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmitUE = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/enseignement/unite_enseignement/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(unite_enseignement)
            });
            if(response.ok) {
                alert("Unité d'enseignement créé avec succès");
                handleNavigation();
            } else {
                alert("Echec de la création de l'unité d'enseignement");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <UEForm 
            isUpdate={false}
            unite_enseignement={unite_enseignement}
            handleInputChange={handleInputUE}
            handleNavigation={handleNavigation}
            handleSubmit={handleSubmitUE}
        />
    )
}

export default UniteEnseignementAjout