"use client"
import { useState } from "react";
import LoginView from "@/views/login/LoginView"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {

    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
        ...user,
        [event.target.name]: event.target.value
        })
    }


    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
        const res = await signIn('credentials', {
            email: user.email,
            password: user.password,
            redirect: false
        });

        if(res?.error) {
            alert("Invalid Credentials");
            return;
        }

        else {
            alert("Vous êtes connectés avec succès");
            router.push('/accueil');
        }
        } catch (error) {
        console.error(error);
        }

    }

    return (
      <LoginView 
        user={user}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    )
}
