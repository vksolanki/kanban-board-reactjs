import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KanbanBoard from './kanbanboardcomponents/KanbanBoard'
import Header from './kanbanboardcomponents/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TagsManager from './kanbanboardcomponents/TagsManager';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
          <Route path="/tags" element={<TagsManager />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
