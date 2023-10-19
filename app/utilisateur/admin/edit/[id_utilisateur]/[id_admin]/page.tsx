"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import UtilisateurForm from '@/views/utilisateur/UtilisateurForm';
import AdminForm from '@/views/utilisateur/admin/AdminForm';
import { uploadImg } from '@/utils/uploadImg';

function AdminEdit() {
  
  const params = useParams()

  const router = useRouter();

  const handleNavigation = () => {
    router.push('/utilisateur/admin');
  }

  // Téléversement du fichier
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(utilisateur)
      });
      if(response.ok) 
        console.log("Utilisateur créé avec succès");
      else 
        console.error(response);
    } catch (error) {
      console.error(error);
    }
  }

  // Tout ce qui concerne l'admin
  const [admin, setAdmin] = useState({
    id_admin: '',
    fonction: '',
    id_utilisateur: ''
  });

  const fetchAdmin = async() => {
    try {
      const response = await fetch(`/api/utilisateur/admin/${params?.id_admin}`);
      const data = await response.json();
      setAdmin(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAdmin();
  }, [params?.id_admin]);

  const handleInputAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({
      ...admin,
      [event.target.name]: event.target.value
    })
  }

  const handleAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await handleUtilisateur();
      const response = await fetch(`/api/utilisateur/admin/update/${params?.id_admin}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
      });
      if(response.ok) {
        uploadImg(file);
        alert("Utilisateur de type admin modifié avec succès");
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

      <AdminForm 
        id_utilisateur={utilisateur.id_utilisateur}
        admin={admin}
        handleInputChange={handleInputAdmin}
        handleSubmit={handleAdmin}
        isUpdate={true}
      />
    </>
  )
}

export default AdminEdit