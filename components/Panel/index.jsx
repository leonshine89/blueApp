import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import CreateProfile from '../Buttons/CreateProfile'
import { SigninBtn } from '../Buttons/SigninBtn'

const Panel = () => {
    const {accessToken, primaryProfile, login} = useContext(AuthContext)
  return (
    <div>
        {!accessToken && <SigninBtn />}
        {(!primaryProfile?.profileID && login) && <CreateProfile />}
    </div>
  )
}

export default Panel