'use client'
import { useSession } from 'next-auth/react';
import { LogoutButton } from "@/components/auth";

export const User = () => {
    const { data: session } : any  = useSession()

    if(session) {
        return (
            <div>
                <p>{session?.user.name}</p>
                <p>{session?.user.role}</p>
                <p>{session.user.userName}</p>
                <img src={`/img/photo_profil/${session.user.image}`} width={48} height={48}/>
                <LogoutButton />
            </div>
        );
    }
}
