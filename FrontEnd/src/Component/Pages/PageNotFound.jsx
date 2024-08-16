import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='pagenotfound'>
      <h1 style={{color:"Red"}}>PAGE NOT FOUND!</h1>
      <NavLink to="/"><button>RETURN HOME</button></NavLink>
    </div>
  )
}

export default PageNotFound
