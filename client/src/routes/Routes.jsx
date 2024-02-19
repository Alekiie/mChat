import React, { useContext } from 'react'
import Register from '../pages/RegisterAndLogin'
import { UserContext } from '../context/UserContext'

function Routes() {
    const {username, id} = useContext(UserContext);

    if(username){
        return `Logged In ${username}`;
    }
  return (
    <Register/>
    )
}

export default Routes