import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../vite.svg'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { Status } from '../models/status'
import { addTask } from '../features/kanban/kanbanboardSlice'

interface AddTaskProps {
  status?: Status;
}

const AddTask: React.FC<AddTaskProps> = ({ status }) => {
  const [taskTitle, setTasktitle] = useState('');

  const dispatch = useDispatch()

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTasktitle(event.target.value);
  };

  const handleTaskSaveEvent = (event: any) => {
    dispatch(addTask({ title: taskTitle, status: status }))
  };

  return (
    <div>
      <textarea value={taskTitle} onChange={handleTextareaChange} />
      <button onClick={handleTaskSaveEvent}>Save</button>
    </div>
  );
};

export default AddTask;
