import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import RelationshipMap from './components/RelationshipMap'
import VotingSection from './components/VotingSection'
import AIAnalysis from './components/AIAnalysis'
import ResourceLibrary from './components/ResourceLibrary'
import Footer from './components/Footer'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <Router>
      <div className={`min-h-screen bg-background text-foreground transition-colors duration-300`}>
        <Header 
          currentSection={currentSection} 
          setCurrentSection={setCurrentSection}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <Routes>
          <Route path="/" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <Timeline />
              <RelationshipMap />
              <VotingSection />
              <AIAnalysis />
              <ResourceLibrary />
            </motion.main>
          } />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/relationships" element={<RelationshipMap />} />
          <Route path="/voting" element={<VotingSection />} />
          <Route path="/ai-analysis" element={<AIAnalysis />} />
          <Route path="/resources" element={<ResourceLibrary />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App

