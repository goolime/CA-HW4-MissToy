import {Routes, Route , HashRouter, BrowserRouter } from 'react-router'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { ToysIndex } from './pages/ToysIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { About } from './pages/About.jsx'
//import viteLogo from '/vite.svg'
//import './App.css'



//const { Routes, Route } = ReactRouterDOM
const Router =  BrowserRouter
//const { Provider } = ReactRedux

function App() {

  return (
    <>
      <Router>
        <section className='app main-layout'>
          <AppHeader />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/toys' element={<ToysIndex />} />
              <Route path='/toys/edit/:toyId?'  element={<ToyEdit />} />
              <Route path='/toys/add'  element={<ToyEdit />} />
              <Route path='/toys/:toyId' element={<ToyDetails />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </>
  )
}

export default App
