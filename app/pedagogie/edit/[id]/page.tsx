'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NiveauForm from '@/views/pedagogie/niveau/NiveauForm';
import ParcoursForm from '@/views/pedagogie/parcours/ParcoursForm';

function PedagogieEdit() {

    const params = useParams();

    const router = useRouter();
    const handleNavigation = () => {
        router.push('/pedagogie');
    }

    // Tout ce qui concerne le niveau
    const [niveau, setNiveau] = useState({
        id_niveau: '',
        designation_niveau: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNiveau({
            ...niveau,
            [event.target.name]: event.target.value
        });
    }

    const fetchNiveau = async() => {
        try {
            const response = await fetch(`/api/pedagogie/niveau/${params?.id}`);
            const data = await response.json();
            setNiveau(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdateNiveau = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/pedagogie/niveau/update/${params?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(niveau)
            });
            if(response.ok) {
                alert("Niveau modifié avec succès");
                handleNavigation();
            } else {
                alert("Echec de la modification");
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Tout ce qui concerne parcours
    const [parcours, setParcours] = useState({
        id_parcours: '',
        designation_parcours: '',
    });

    const handleInputParcours = async(event: React.ChangeEvent<HTMLInputElement>) => {
        setParcours({
            ...parcours,
            [event.target.name]: event.target.value
        });
    }

    const fetchParcours = async() => {
        try {
            const response = await fetch(`/api/pedagogie/parcours/${params?.id}`);
            const data = await response.json();
            setParcours(data);
        } catch(error) {
            console.error(error);
        }
    }

    const handleUpdateParcours = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/pedagogie/parcours/update/${params?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parcours)
            });
            if(response.ok) {
                alert("Parcours modifié avec succès");
                handleNavigation();
            } else {
                alert("Echec de modification parcours");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNiveau();
        fetchParcours();
    }, [params?.id]);

    return (
        <>
            <NiveauForm 
                isUpdate={true}
                niveau={niveau}
                handleInputChange={handleInputChange}
                handleSubmit={handleUpdateNiveau}
            />
            <ParcoursForm
                isUpdate={true}
                parcours={parcours}
                handleInputChange={handleInputParcours}
                handleSubmit={handleUpdateParcours}
            />
        </>
    )
}

export default PedagogieEdit
