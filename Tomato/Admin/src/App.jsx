import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import SideBar from './Components/SideBar/SideBar'
import  {Routes , Route} from 'react-router-dom'
import Orders from './Pages/Orders/Orders'
import List from './Pages/List/List'
import Add from './Pages/Add/Add'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const url = 'http://localhost:4000'
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className='app-content'>
        <SideBar/>
          <Routes>
            <Route path='/add' element={<Add url = {url}/>}/>
            <Route path='/list' element={<List url = {url}/>}/>
            <Route path='/orders' element={<Orders url = {url}/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default App
