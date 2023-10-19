"use client";
import Etudiant from "@/models/utilisateur/listage/Etudiant"
import Responsable_legal from "@/models/utilisateur/listage/Responsable_legal"
import RelationForm from "@/views/utilisateur/relation/RelationForm"
import { useEffect, useState } from "react"

function RelationCreate() {

    const [relation, setRelation] = useState({
        id_relation: '',
        id_responsable_legal: '',
        num_matricule: ''
    })
    const handleInputRelation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRelation({
            ...relation,
            [event.target.name]: event.target.value
        });
    }

    const [responsable_legals, setResponsableLegals] = useState<Array<Responsable_legal>>([])
    const fetchResponsableLegals = async() => {
        try {
            const response = await fetch('/api/utilisateur/responsable_legal');
            const data = await response.json();
            setResponsableLegals(data);
        } catch(error) {
            console.error(error);
        }
    }

    const [etudiants, setEtudiants] = useState<Array<Etudiant>>([]);
    const fetchEtudiants = async() => {
        try {
            const response = await fetch('/api/utilisateur/etudiant');
            const data = await response.json();
            setEtudiants(data);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchResponsableLegals();
        fetchEtudiants();
    }, []);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/utilisateur/relation/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(relation)
            });
            if(response.ok) {
                alert("Relation créée avec succès");
            } else {
                alert("Echec de création");
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <RelationForm 
            relation={relation}
            handleInputChange={handleInputRelation}
            responsable_legals={responsable_legals}
            etudiants={etudiants}
            onSubmit={handleSubmit}
            isUpdate={false}
        />
    )
}

export default RelationCreate