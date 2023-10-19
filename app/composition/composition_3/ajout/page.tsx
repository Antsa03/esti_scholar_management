'use client';
import Niveau from '@/models/pedagogie/Niveau';
import Parcours from '@/models/pedagogie/Parcours';
import Composition3_Form from '@/views/composition/composition_3/Composition3_Form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

function Composer3_Ajout() {

    const router = useRouter();

    const [composer_3, setComposer3] = useState({
        id_composer_3: '',
        id_niveau: '',
        id_parcours: ''
    });

    const handleInputComposer3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComposer3({
            ...composer_3,
            [event.target.name]: event.target.value
        });
    }

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

    useEffect(() => {
        fetchNiveaux();
        fetchParcours();
    }, []);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/composition/composition3/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(composer_3)
            });
            if(response.ok) {
                alert('Création de composition3 avec succès');
                router.push('/composition/composition_3');
            }
            else {
                alert('Echec de la création de composition3');
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Composition3_Form 
            isUpdate={false}
            composer_3={composer_3}
            niveaux={niveaux}
            parcours={parcours}
            handleInputChange={handleInputComposer3}
            handleSubmit={handleSubmit}
        />
    )
}

export default Composer3_Ajout