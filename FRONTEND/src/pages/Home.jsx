import React from 'react'
import { Link } from 'react-router-dom'

const HOME = () => {
  return (
    <div>HOME
      <h1>HOME</h1>
      <Link to ="/creategroup">
      <h3>CREATE STUDY GROUP</h3>
      </Link>
    </div>

  )
}

export default HOME