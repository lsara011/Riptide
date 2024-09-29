import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <Header/>
      <section>
        <MainSection />
      </section>
    </>
  )
}

function Header(){
  return(
    <>
      <header>
        <div className="logoHeader">
          <h1 className='logoText'>HandsOUt4Help</h1>
        </div>
        <nav>
          <div className="nav-links">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Self-Care Tips</a></li>
              <li><a href="https://luisfsaravia.com" target='
              _blank'>About the Developer</a></li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

function MainSection(){
  return(
    <>
      <div className="section-title">
        <h1>The Purpose</h1>
      </div>
    </>
  )
}

export default App