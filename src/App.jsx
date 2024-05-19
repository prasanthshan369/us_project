import React from 'react'
import{BrowserRouter as Router,Routes,Route}from 'react-router-dom'
import Application from './pages/Application'
import Sidebar from './components/Sidebar'
import Drivers from './pages/Drivers'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Application/>}/>
          <Route path='/Drivers' element={<Drivers/>}/>
          
        </Routes>
      </Router>
    </div>
  )
}

export default App