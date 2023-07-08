import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../vite.svg'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { Task } from '../models/task'
import TaskDisplay from './TaskDisplay'
import AddTask from './AddTask'

interface BoardColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  className?: string;
  onHandleDrop: (taskId: string, status: string) => void;
  children?: React.ReactNode; // Add children prop here
}

const BoardColumn: React.FC<BoardColumnProps> = ({ title, status, tasks, className, onHandleDrop }) => {

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Retrieve the div ID from the dataTransfer
    const divId = e.dataTransfer.getData('id');
    onHandleDrop(divId, status);
    // setDraggedDivId(null);
    // Perform any necessary logic to handle the drop
  };

  const renderTasks = (tasks: Task[]) => {
    return tasks.map((task: Task, index) => {
      return (
        <TaskDisplay key={index} task={task}>
        </TaskDisplay>
      );
    });
  };

  return (
    <div className={status + '-column board-column'}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      <h2 className='board-column-header'>{title}</h2>
      <div className="board-column-content">
        {renderTasks(tasks)}
      </div>
      <div className="column-add-task">
        <AddTask status={status}></AddTask>
      </div>
    </div>
  );
};

export default BoardColumn;
