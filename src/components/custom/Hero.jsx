import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='flex flex-col items-center lg:mx-56 gap-9'>
      <h1 className='font-extrabold text-[60px] text-center sm:text-2xlmd:text-8xl lg:mt-16 mt-8'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span>
        Personaized Itineraries at Your Fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center '>
        Your personal trip planner and travel curator, creating custon itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
      <Button> Get Started, It's free</Button>
      </Link>


    </div>
  )
}

export default Hero