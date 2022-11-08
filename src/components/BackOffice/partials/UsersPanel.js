import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { customFetch } from '../../../services/fetch'
import recycledStyles from './styles/NewsPanel.module.css'
import s from './styles/UsersPanel.module.css'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const UsersPanel = () => {

    const [users, setUsers] = useState([])
    const loggedUser = useSelector((state) => state.user)

    const getUsers = async () => {
        try {
            const url = `${SERVER_BASE_URL}/users`
            const properties = {
                method: 'get'
            }

            const res = await customFetch(url, properties)
            setUsers(res.data)
        } catch (error) {
            console.log('Error getting users: ', error)
        }
    };

    useEffect(() => {
        getUsers()
    }, []);

    const handleDelete = async (id) => {
        const url = `${SERVER_BASE_URL}/users/${id}`
        const properties = {
            method: 'delete'
        }
        await customFetch(url, properties)
        getUsers()
    };

    const handleChangeRole = async (id) => {
        const url = `${SERVER_BASE_URL}/users/changeRole/${id}`
        const properties = {
            method: 'put'
        }
        await customFetch(url, properties)
        getUsers()
    };

    return (
        <div className={s.container}>
            <div className={recycledStyles.titleContainer}>
                <h1 className={recycledStyles.title}>Usuarios</h1>
            </div>
            <div className={recycledStyles.newsListContainer}>
                <ul className={s.usersList}>
                    {
                        users && users.map((e) => (
                            <div key={e.id} className={recycledStyles.listItemContainer}>
                                <li className={s.listItem}>
                                    <div className={recycledStyles.imageContainer}>
                                        <img className={recycledStyles.image} src={e.image} alt="Image" />
                                    </div>
                                    <div className={recycledStyles.dataContainer}>
                                        <h4 className={recycledStyles.newsName}> {e.firstName} {e.lastName} </h4>
                                        <h4 className={recycledStyles.newsName}>{e.email}</h4>
                                        <h4 className={recycledStyles.newsName}>Admin: { e.roleId === 1 ? 'Si' : 'No' }</h4>
                                    </div>
                                    <div className={s.buttons}>
                                        <button onClick={() => handleChangeRole(e.id)} className={e.email === loggedUser.email ? s.disabledButton : s.RoleButton} disabled={e.email === loggedUser.email ? true : false} >Cambiar Rol</button>
                                        <button onClick={() => handleDelete(e.id)} className={s.DeleteButton}>Eliminar</button>
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

export default UsersPanel