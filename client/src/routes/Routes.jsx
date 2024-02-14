import React, { useContext } from 'react'
import Register from '../pages/Register'
import { UserContext } from '../context/UserContext'

function Routes() {
    const {username, id} = useContext(UserContext);

    if(username){
        return 'Logged In!';
    }


  return (
    <Register />
  )
}

export default Routes