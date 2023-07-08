import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KanbanBoard from './KanbanBoardComponents/KanbanBoard'

function App() {
  return (
    <div className="App container">
      <KanbanBoard></KanbanBoard>
    </div>
  )
}

export default App
