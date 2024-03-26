import React from 'react'
import logo from '../assets/WeatherLogo.png'
import star from '../assets/Wstart.png'
import { Accordion } from 'flowbite-react'

const NavComponent = () => {
  return (
    <div className='bgNav px-5 py-2 grid grid-cols-2'>
      <div className='col-span-1 grid grid-cols-10'>
        <div className='col-span-1'>
          <img src={logo.src} alt='Logo' width='77px' height='75px'></img>
        </div>
        <div className='col-span-9'>
          <p className='fifty fwnav'>
            What's the Weather?
          </p>
        </div>
      </div>

      <div className='col-span-1 grid grid-cols-2 pt-3'>
        <div className='col-span-1 pe-10'>
          <div className='grid grid-cols-8'>

            <div className='col-span-4'></div>
            
            <div className='col-span-3'>
              <p className='thirtf text-end'>
                Favorites
              </p>
            </div>
            <div className='col-span-1 pt-1 ps-4'>
              <img src={star.src} width='41px' height='40px' className='pt-1'></img>
            </div>
          </div>
        </div>
        <div className='col-span-1 mb-3 pt-1 tf'>
          <input placeholder='Search for Locations...' className='ps-3' />
        </div>
      </div>
    </div>
  )
}

export default NavComponent
