import React from 'react'
import image from '../../public/logo.png'

function Logo() {
  return (
    <div>
      <img src={image} alt=""  className='w-[150px]'/>
    </div>
  )
}

export default Logo