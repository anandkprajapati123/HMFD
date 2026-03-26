import React from 'react'
import './index.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'

function App() {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add/>}></Route>
          <Route path="/list" element={<List/>}></Route>
          <Route path="/order" element={<Order/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App