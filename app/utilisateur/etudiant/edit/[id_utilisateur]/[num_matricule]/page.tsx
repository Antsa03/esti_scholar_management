"use client";
import UtilisateurForm from "@/views/utilisateur/UtilisateurForm"
import EtudiantForm from "@/views/utilisateur/etudiant/EtudiantForm"
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { uploadImg } from "@/utils/uploadImg";

function EtudiantEdit() {

    const router = useRouter();

    const handleNavigation = () => {
        router.push('/utilisateur/etudiant');
    }

    const params = useParams();

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

    const fetchUtilisateur = async () => {
        try {
            const response = await fetch(`/api/utilisateur/${params?.id_utilisateur}`);
            const data = await response.json();
            setUtilisateur(data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputUtilisateur = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUtilisateur({
        ...utilisateur,
        [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        fetchUtilisateur();
    }, [params?.id_utilisateur])

    const handleUpdateUtilisateur = async() => {
        try {
            const response = await fetch(`/api/utilisateur/update/${params?.id_utilisateur}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(utilisateur)
            });
            if(response.ok) 
                console.log("Utilisateur modifié avec succès");
            else {
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    //Tout ce qui concerne l'étudiant
    const [etudiant, setEtudiant] = useState({
        num_matricule: '',
        date_naissance: '',
        lieu_naissance: '',
        nationalite: '',
        id_utilisateur: ''
    })

    const handleInputEtudiant = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEtudiant({
        ...etudiant,
        [event.target.name]: event.target.value
        })
    }

    const fetchEtudiant = async() => {
        try {
            const response = await fetch(`/api/utilisateur/etudiant/${params?.num_matricule}`);
            const data = await response.json();
            setEtudiant(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchEtudiant();
    }, [params?.num_matricule])

    const handleUpdateEtudiant = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await handleUpdateUtilisateur();
            const response = await fetch(`/api/utilisateur/etudiant/update/${params?.num_matricule}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(etudiant)
            });
            if(response.ok) {
                uploadImg(file);
                alert("Utilisateur de type étudiant modifié avec succès");
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
            
            <EtudiantForm
                id_utilisateur={utilisateur.id_utilisateur}
                etudiant={etudiant}
                handleInputChange={handleInputEtudiant}
                handleSubmit={handleUpdateEtudiant}
                isUpdate={true}
            />
            
        </>
    )
}

export default EtudiantEdit
