import React from 'react'
import { Link } from 'react-router-dom'

const HOME = () => {
  return (
    <div>HOME
      <h1>HOME</h1>
      <Link to ="/creategroup">
      <h3>CREATE STUDY GROUP</h3>
      </Link>
      <br />

    <Link to="/browsegroup">
    <h3>BrowseGroup</h3>
    </Link>

    <Link to ="/communitypage">
    <h3>COMMUNITY PAGE</h3>
    </Link>


    </div>

  )
}

export default HOME