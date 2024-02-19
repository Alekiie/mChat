import React, { useContext } from 'react'
import Register from '../pages/RegisterAndLogin'
import { UserContext } from '../context/UserContext'
import Chat from '../pages/Chat';

function Routes() {
    const {username, id} = useContext(UserContext);

    if(username){
        return <Chat />;
    }
  return (
    <Register/>
    )
}

export default Routes