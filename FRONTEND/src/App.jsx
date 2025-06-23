import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { Home } from 'lucide-react'
import HOME from './pages/HOME.JSX'
import CreateGroup from './pages/CreateGroup'
import BrowseRequests from './pages/BrowseRequest'
import CommunityPage from './pages/CommunityPage'


const App = () => {
  return (
    <>
    <Toaster position='top-center' reverseOrder={false} />
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<HOME/>}/>
        <Route path='/creategroup'element={<CreateGroup/>}/>
        <Route path='/browsegroup'element={<BrowseRequests/>}/>
        <Route path='/communitypage'element={<CommunityPage/>}/>
      </Routes>
    </Router>
    </>
    


  )
}

export default App