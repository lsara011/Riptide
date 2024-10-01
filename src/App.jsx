import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Section from './section'
import { Header } from './Header'
import { BehindTheProject } from './BehindTheProject'
import { ToolsUsed } from './ToolsUsed'
import 'devicon/devicon.min.css';

function App() {
  const [selectedSection,setSelectionSection] = useState('section');
  const handleNavClick = (section) =>{
    setSelectionSection(section)
  }
  return (
    <>
      <Header handleNavClick={handleNavClick}/>
      {selectedSection === 'section' && <Section />}
      {selectedSection === 'behindTheProject' && <BehindTheProject />}
      {selectedSection === 'toolsUsed' && <ToolsUsed />}
    </>
  )
}

export default App