import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../vite.svg'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { Status } from '../models/status'
import { Task } from '../models/task'
import DraggableDiv from './DraggableDiv'

interface TaskDisplayProps {
  task: Task
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task }) => {
  const handleDragStart = (e: any) => {
    e.dataTransfer.setData('id', task.id);
  }

  return (
    <div draggable className="card" onDragStart={handleDragStart}
      style={{ cursor: 'move' }}>
      <span className="card-remove-icon"><i className="fas fa-trash"></i></span>
      <div className="card-title">{task.title}</div>
    </div>
    // <DraggableDiv id={task.id.toString()} text={task.title} onDragStart={handleDragStart} />
  );
};

export default TaskDisplay;
