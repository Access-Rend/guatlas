import { useState } from 'react'
import TopBar from './components/TopBar'
import Home from './views/Home'
import Footer from './components/Footer'

import SearchByCellMap from './views/SearchByCellMap'
import SearchByCellGene from './views/SearchByCellGene'
import SearchByCellMicroenvironment from './views/SearchByCellMicroenvironment'
import Publication from './views/Publication'
import Download from './views/Download'
import About from './views/About'
import Help from './views/Help'

import { Divider } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Sider from 'antd/es/layout/Sider'


const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <TopBar />
        <Divider />
        <div className='App-content'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/SearchByCellMap' element={<SearchByCellMap />} />
            <Route exact path='/SearchByCellGene' element={<SearchByCellGene />} />
            <Route exact path='/SearchByCellMicroenvironment' element={<SearchByCellMicroenvironment />}/>
            <Route exact path='/Publication' element={<Publication />} />
            <Route exact path='/Download' element={<Download />} />
            <Route exact path='/Help' element={<Help />} />
            <Route exact path='/About' element={<About />} />
            <Route exact path='*' element={<p>无法找到资源</p>} />

          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
