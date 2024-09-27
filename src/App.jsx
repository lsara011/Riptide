import { useState } from 'react'

function App() {

  return (
    <>
      <Header />
    </>
  )
}

function Header(){
  return(
    <>
      <header>
        <nav>
          <div className="logo">
            <h1>RipTide</h1>
          </div>
          <ul>
            <li><a href="#">Main Screen</a></li>
            <li><a href="#" onClick={() => setCurrentSection('behindProject')}>Behind The Project</a></li>
            <li><a href="https://luisfsaravia.com" target="_blank" rel="noopener noreferrer">About The Dev</a></li>
            <li><a href="#" onClick={() => setCurrentSection('toolsUsed')}>Tools Used</a></li>
          </ul>  
        </nav>  
      </header>      
    </>
  )
}

function behindProject(){
  return(
    <>
      <h1>Testing</h1>
    </>
  )
}



export default App
