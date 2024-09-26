import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Status } from '../models/status';
import { addTask } from '../features/kanban/kanbanboardSlice';
import '../App.css';

interface AddTaskProps {
  status?: Status;
}

const AddTask: React.FC<AddTaskProps> = ({ status }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const dispatch = useDispatch();

  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskTitle(event.target.value);
  }, []);

  const handleTaskSaveEvent = useCallback(() => {
    if (taskTitle.trim()) {
      dispatch(addTask({ title: taskTitle, status: status?.status }));
      setTaskTitle(''); // Clear the input after saving
    }
  }, [dispatch, taskTitle, status?.status]);

  return (
    <div>
      <div className="w-100">
        <textarea
          value={taskTitle}
          onChange={handleTextareaChange}
          className="w-100"
          style={{ height: '40px' }}
        />
      </div>
      <button onClick={handleTaskSaveEvent} className="macbook-button small">
        Add
      </button>
    </div>
  );
};

export default AddTask;