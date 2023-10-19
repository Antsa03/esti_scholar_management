"use client";
import UEForm from '@/views/enseignement/unite_enseignement/UEForm';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function UniteEnseignementEdit() {

    const params = useParams();

    const router = useRouter();
    const handleNavigation = () => {
        router.push('/enseignement/unite_enseignement');
    }

    const [unite_enseignement, setUnite_enseignement] = useState({
        id_ue: '',
        designation_ue: '',
        credit: 0
    });

    const fetchUE = async() => {
        try {
            const response = await fetch(`/api/enseignement/unite_enseignement/${params?.id_ue}`);
            const data = await response.json();
            setUnite_enseignement(data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUE();
    }, [params?.id_ue]);

    const handleInputUE = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnite_enseignement({
            ...unite_enseignement,
            [event.target.name]: event.target.value
        });
    }

    const handleUpdateUE = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/enseignement/unite_enseignement/update/${params?.id_ue}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(unite_enseignement)
            });
            if(response.ok) {
                alert("Unité d'enseignement modifié avec succès");
                handleNavigation();
            } else {
                alert("Echec de la modification");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <UEForm 
            isUpdate={true}
            unite_enseignement={unite_enseignement}
            handleInputChange={handleInputUE}
            handleSubmit={handleUpdateUE}
            handleNavigation={handleNavigation}
        />
    )
}

export default UniteEnseignementEdit