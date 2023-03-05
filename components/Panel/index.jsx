import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth'
import { LOGIN_GET_MESSAGE, LOGIN_VERIFY } from '../../graphql'
import CreateProfile from './CreateProfile'
import { SigninBtn } from '../Buttons/SigninBtn'
import { SignUpBtn } from '../Buttons/SignUpBtn'

const Panel = () => {
    const {accessToken, primaryProfile, login} = useContext(AuthContext)
    const [createProfile, setCreateProfile] = useState(false)
     
   
  return (
    <div className='flex w-screen mx-auto justify-center bg-gray-200 h-screen items-center flex-col' >
      <div className='w-5/6 md:w-2/5 h-3/5 flex flex-col justify-center items-center'>
        <h1 className='text-5xl mb-5 font-semibold text-blue-500 '>blueApp</h1>
       <div className='bg-gray-50 shadow-lg w-full lg:w-[60%] p-5'>
         {!accessToken && <SigninBtn />}
        <p className='text-center my-5 border-y'>or</p>
        {!accessToken && <SignUpBtn  createProfile={createProfile} setCreateProfile={setCreateProfile}/>}
        {(!primaryProfile?.profileID && createProfile) && <CreateProfile createProfile={createProfile} setCreateProfile={setCreateProfile} />}
       </div>
      </div>
    </div>
  )
}

export default Panel