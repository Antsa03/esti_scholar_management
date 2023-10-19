'use client';
import { useEffect, useState } from "react";
import Relation from "@/models/utilisateur/listage/Relation";
import RelationList from "@/views/utilisateur/relation/RelationList";

function Relation() {

    const [relations, setRelations] = useState<Array<Relation>>([]);

    const fetchRelations = async() => {
        try {
            const response = await fetch('/api/utilisateur/relation');
            const data = await response.json();
            setRelations(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRelations();
    }, []);

    const handleDeleteRelation = async(id_relation: string) => {
        try {
            const response = await fetch(`/api/utilisateur/relation/delete/${id_relation}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                alert('Relation supprimée avec succès');
                fetchRelations();
            } else {
                alert('Echec de suppression');
                console.error(response);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <RelationList 
            relations={relations}
            handleDeleteRelation={handleDeleteRelation}
        />
    )
}

export default Relation