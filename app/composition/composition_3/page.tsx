'use client'
import Composer_3 from '@/models/composition/Composer_3'
import Composition3_List from '@/views/composition/composition_3/Composition3_List';
import { useState, useEffect } from 'react'

function Composition3() {

    const [composer_3, setComposer_3] = useState<Array<Composer_3>>([]);
    const fetchComposer3 = async() => {
        try {
            const response = await fetch('/api/composition/composition3');
            const data = await response.json();
            setComposer_3(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchComposer3();
    }, []);

    const handleDelete = async(id_composer_3 : string) => {
        try {
            const response = await fetch(`/api/composition/composition3/delete/${id_composer_3}`, {
                method: 'DELETE'
            });
            if(response.ok) {
                alert('Composition3 supprimée avec succès');
                fetchComposer3();
            }
            else {
                alert('Echec de la suppression');
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Composition3_List
            composer_3={composer_3}
            handleDelete={handleDelete}
        />
    )
}

export default Composition3