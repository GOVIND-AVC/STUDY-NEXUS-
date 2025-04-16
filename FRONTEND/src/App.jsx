import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { Home } from 'lucide-react'
import HOME from './pages/HOME.JSX'
import CreateGroup from './pages/CreateGroup'


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
        
      </Routes>
    </Router>
    </>
    


  )
}

export default App