'use client';
import { useRouter } from "next/navigation";
import { useState } from "react"
import NiveauForm from "@/views/pedagogie/niveau/NiveauForm";
import ParcoursForm from "@/views/pedagogie/parcours/ParcoursForm";


function PedagogieAjout() {

    const router = useRouter();

    const handleNavigation = () => {
        router.push('/pedagogie');
    }

    // Tout ce qui concerne le niveau
    const [niveau, setNiveau] = useState({
        id_niveau: '',
        designation_niveau: ''
    });

    const handleInputNiveau = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNiveau({
            ...niveau,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmitNiveau = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/pedagogie/niveau/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(niveau)
            });
            if(response.ok) {
                alert("Niveau créé avec succès");
                handleNavigation();
            }
        } catch(error) {
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

    const handleSubmitParcours = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/pedagogie/parcours/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parcours)
            });
            if(response.ok) {
                alert("Parcours créé avec succès");
                handleNavigation();
            } else {
                alert("Echec de créaction de parcours");
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <NiveauForm 
                isUpdate={false}
                niveau={niveau}
                handleInputChange={handleInputNiveau}
                handleSubmit={handleSubmitNiveau}
            />

            <ParcoursForm
                isUpdate={false}
                parcours={parcours}
                handleInputChange={handleInputParcours}
                handleSubmit={handleSubmitParcours}
            />
        </>
    )
}

export default PedagogieAjout