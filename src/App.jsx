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
            <a href="#"><li>About</li></a>
            <a href="#"><li>Services</li></a>
            <a href="#"><li>Contact</li></a>
            <a href="#"><li>Careers</li></a>
          </ul>  
        </nav>  
      </header>      
    </>
  )
}



export default App
