'use client'
import Composer_2 from '@/models/composition/Composer_2'
import Composition2_List from '@/views/composition/composition_2/Composition2_List';
import { useState, useEffect } from 'react'

function Composition2() {

    const [composer_2, setComposer2] = useState<Array<Composer_2>>([]);
    const fetchComposer2 = async() => {
        try {
            const response = await fetch('/api/composition/composition2');
            const data = await response.json();
            setComposer2(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchComposer2();
    }, []);

    const handleDelete = async(id_composer_2: string) => {
        try {
            const response = await fetch(`/api/composition/composition2/delete/${id_composer_2}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                alert('Suppression de composition2 avec succès');
                fetchComposer2();
            }
            else {
                alert('Echec de la suppression');
                console.error(response)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Composition2_List 
            composer_2={composer_2}
            handleDelete={handleDelete}
        />
    )
}

export default Composition2