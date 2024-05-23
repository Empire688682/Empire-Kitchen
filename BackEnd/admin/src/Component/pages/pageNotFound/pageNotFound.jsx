import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
      <p>Page not found</p>
      <button><NavLink to="/">Return Home</NavLink></button>
    </div>
  )
}

export default PageNotFound
