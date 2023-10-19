"use client"
import Responsable_legal from '@/models/utilisateur/listage/Responsable_legal'
import { useEffect, useState } from 'react'
import ResponsableLegalList from '@/views/utilisateur/responsable_legal/ResponsableLegalList';

function ResponsableLegal() {

    const [responsable_legals, setResponsableLegal] = useState<Array<Responsable_legal>>([]);

    const fetchResponsableLegals = async() => {
        try {
            const response = await fetch('/api/utilisateur/responsable_legal');
            const data = await response.json();
            setResponsableLegal(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchResponsableLegals();
    }, []);

    const handleDelete = async(id_utilisateur: string) => {
        try {
            const response = await fetch(`/api/utilisateur/delete/${id_utilisateur}`, {
                method: "DELETE"
            });
            if(response.ok) {
                alert("Utilisateur supprimé avec succès");
                fetchResponsableLegals();
            }
            else
                console.error(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ResponsableLegalList
            responsable_legals={responsable_legals}
            handleDelete={handleDelete}
        />
    )
}

export default ResponsableLegal