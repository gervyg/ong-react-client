import React, { useEffect } from 'react'
import './EmailConfirmed.css'
import { useParams, Link } from 'react-router-dom'
import { BASE_PATH } from '../../utils/constants'
import axios from 'axios'
import { alertWaiting, alertConfirmation, alertError } from '../../services/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { refresh } from '../../reducers/userReducer'
import { customFetch } from '../../services/fetch'



const EmailConfirmed = () => {

    const userData = useSelector(store => store.user)
    const dispatch = useDispatch()
    const params = useParams()
    const {token} = params
    let newToken;
    const confirmUrl = `${BASE_PATH}/users/auth/confirmemail/${token}`
    const refreshURL = `${BASE_PATH}/auth/me`
    const refreshProperties = {
      method: 'get'
    }

    const getConfirmEmail = async () => {
        const config = {
            method: 'get',
            url: confirmUrl,
            headers: {      
                "Authorization": `Bearer ${token}` 
            }
        }
        return await axios(config) 
    }
    
    useEffect(() => { 
        alertWaiting('Estamos confirmando su email', 'Espere un momento')
       getConfirmEmail()
        .then(token => {   
            newToken = JSON.stringify(token.data)
            localStorage.removeItem('token')
            localStorage.setItem('token', newToken)
        })
        .then(data => {
            if (newToken) {
                customFetch(refreshURL, refreshProperties)
                .then(user => {
                  let userObj = {
                    id: user.data.payload.id,
                    firstName: user.data.payload.firstName,
                    lastName: user.data.payload.lastName,
                    email: user.data.payload.email,
                    image: user.data.payload.image,
                    roleId: user.data.payload.roleId,
                    isConfirmed: user.data.payload.isConfirmed,
                    token: newToken
                  }
                  dispatch(refresh(userObj))
                  alertConfirmation('Enhorabuena', 'Su email ha sido confirmado')
                })
                  .catch(error => alertError('Oops', 'Ha habido un problema'))
            } else {
                alertError('Oops', 'Ha habido un problema')
            }
        })
        .catch(error => alertError('Oops', 'Ha habido un problema para confirmar usuario'))
    }, [])

  return (
    <>
    <Link to='/'><button>Volver a la home</button></Link>
    </>
  )
}

export default EmailConfirmed