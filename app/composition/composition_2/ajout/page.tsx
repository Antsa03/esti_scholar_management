"use client";
import Unite_enseignement from '@/models/enseignement/Unite_enseignement';
import Parcours from '@/models/pedagogie/Parcours';
import Composition2_Form from '@/views/composition/composition_2/Composition2_Form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function Composition2_Ajout() {

    const router = useRouter();

    const [composer_2, setComposer2] = useState({
        id_composer_2: '',
        id_parcours: '',
        id_ue: '',
    })

    const handleInputComposer2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComposer2({
            ...composer_2,
            [event.target.name]: event.target.value
        });
    }

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

    const [unite_enseignements, setUnite_enseignements] = useState<Array<Unite_enseignement>>([]);
    const fetchUnite_enseignement = async() => {
        try {
            const response = await fetch('/api/enseignement/unite_enseignement');
            const data = await response.json();
            setUnite_enseignements(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchParcours();
        fetchUnite_enseignement();
    }, []);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/composition/composition2/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(composer_2)
            });
            if(response.ok) {
                alert('Création de composition2 avec succès');
                router.push('/composition/composition_2');
            }
            else {
                alert('Echec lors de la création de composition2');
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Composition2_Form 
            isUpdate={false}
            composer_2={composer_2}
            parcours={parcours}
            unite_enseignements={unite_enseignements}
            handleInputChange={handleInputComposer2}
            handleSubmit={handleSubmit}
        />
    )
}

export default Composition2_Ajout