import React, { useState, useEffect } from "react";
import { customFetch } from '../../../services/fetch';
import recycledStyles from './styles/NewsPanel.module.css';
import s from './styles/TestimonialsPanel.module.css';

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const MembersPanel = () => {

    const [members, setMembers] = useState([]);

    const getMembers = async () => {
        try {
            const url = `${SERVER_BASE_URL}/members`;
            const properties = {
                method: 'get'
            };
            const res = await customFetch(url, properties);
            setMembers(res.data);
        } catch (error) {
            console.error(`Error getting members, ${error}`)
        };
    };

    useEffect(() => {
        getMembers()
    }, []);

    const handleDelete = async (id) => {
        const url = `${SERVER_BASE_URL}/members/${id}`
        const properties = {
            method: 'delete'
        }
        await customFetch(url, properties)
        getMembers()
    };

    return (
        <div className={s.container}>
            <div className={recycledStyles.titleContainer}>
                <h1 className={recycledStyles.title}>Miembros</h1>
            </div>
            <div className={recycledStyles.newsListContainer}>
                <ul className={recycledStyles.newsList}>
                    {
                        members && members.map((e) => (
                            <div key={e.id} className={recycledStyles.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={recycledStyles.imageContainer}>
                                        <img className={recycledStyles.image} src={e.image} alt="Image" />
                                    </div>
                                    <div className={recycledStyles.dataContainer}>
                                        <h4 className={recycledStyles.newsName}> {e.name} </h4>
                                    </div>
                                    <div>
                                        <button onClick={() => handleDelete(e.id)} className={s.button}>X</button>
                                    </div>
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default MembersPanel