"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import UtilisateurForm from '@/views/utilisateur/UtilisateurForm';
import EnseignantForm from '@/views/utilisateur/enseignant/EnseignantForm';
import { uploadImg } from '@/utils/uploadImg';

function EnseignantEdit() {

    const params = useParams();

    const router = useRouter();

    const handleNavigation = () => {
        router.push('/utilisateur/enseignant');
    }

    // Téléversement du fichier image
    const [file, setFile] = useState<File>();

    // Tout ce qui concerne l'utilisateur
    const [utilisateur, setUtilisateur] = useState({
        id_utilisateur: '',
        photo_profil: '',
        nom: '',
        prenoms: '',
        sexe: '',
        adresse: '',
        telephone: '',
        email: '',
        mot_de_passe: ''
    });

    const fetchUtilisateur = async() => {
        try {
            const response = await fetch(`/api/utilisateur/${params?.id_utilisateur}`);
            const data = await response.json();
            setUtilisateur(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUtilisateur();
    }, [params?.id_utilisateur])

    const handleInputUtilisateur = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUtilisateur({
            ...utilisateur,
            [event.target.name]: event.target.value
        });
    }

    const handleUtilisateur = async() => {
        try {
            const response = await fetch(`/api/utilisateur/update/${params?.id_utilisateur}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utilisateur)
            });
            if(response.ok)
                console.log("Utilisateur modifié avec succès");
            else 
                console.error(response);
        } catch (error) {
            console.error(error);
        }
    }

    // Tout ce qui concerne l'enseignant
    const [enseignant, setEnseignant] = useState({
        id_enseignant: '',
        grade: '',
        diplome: '',
        id_utilisateur: ''
    });

    const fetchEnseignant = async() => {
        try {
            const response = await fetch(`/api/utilisateur/enseignant/${params?.id_enseignant}`);
            const data = await response.json();
            setEnseignant(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEnseignant();
    }, [params?.id_enseignant]);

    const handleInputEnseignant = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnseignant({
            ...enseignant,
            [event.target.name]: event.target.value
        });
    }

    const handleEnseignant = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await handleUtilisateur();
            const response = await fetch(`/api/utilisateur/enseignant/update/${params?.id_enseignant}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enseignant)
            });
            if(response.ok) {
                uploadImg(file);
                alert("Utilisateur de type enseignant modifié avec succès");
                handleNavigation();
            }
            else 
                console.error(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <UtilisateurForm 
                utilisateur={utilisateur}
                handleInputChange={handleInputUtilisateur}
                file={file}
                setFile={setFile}
                isUpdate={true}
            />

            <EnseignantForm 
                enseignant={enseignant}
                handleInputChange={handleInputEnseignant}
                id_utilisateur={utilisateur.id_utilisateur}
                handleSubmit={handleEnseignant}
                isUpdate={true}
            />
        </>
    )
}

export default EnseignantEdit