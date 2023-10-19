'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

function Accueil() {

    const { data: session } : any = useSession();
    return (
        <div>
            <h1>Salut les gens</h1>
        </div>
    )
}

export default Accueil