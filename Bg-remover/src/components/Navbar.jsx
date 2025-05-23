import React from 'react'
import assets from '../assets/assets.js'   
import { Link } from 'react-router-dom'
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'
import { useContext } from 'react'
import AppContextProvider, { Appcontext } from '../context/Appcontext.jsx'
import { useEffect } from 'react'
const Navbar = () => {
  
  const {isSignedIn,user}=useUser()

  const {openSignIn}=useClerk()
  const {credit,loadCreditData}=useContext(Appcontext)

    useEffect(()=>{
        if(isSignedIn){
      loadCreditData()
    }
  },[isSignedIn])

  return (
    <div className='flex item-center justify-between mx-4 py-3 lg:mx-44'>

        <Link to='/'><img className='w-32 sm:w-44' src={assets.logo} alt="" /></Link>
        {
          isSignedIn?<div>
            <button>
              <img src={assets.credit_icon} alt="" />
              <p>Credits: {credit}</p>
            </button>
            <UserButton/>
          </div>
          :<button onClick={()=>openSignIn({})} className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:py-3 text-sm rounded-full '>
          Get started
          <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
      </button>
        }

    </div>
  )
}

export default Navbar