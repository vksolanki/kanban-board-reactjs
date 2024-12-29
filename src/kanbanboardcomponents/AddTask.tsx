import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Status } from '../models/status';
import { addTask } from '../features/kanban/kanbanboardSlice';

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
    <div className="add-task-container">
      <textarea
        value={taskTitle}
        onChange={handleTextareaChange}
      />
      <button onClick={handleTaskSaveEvent}>
        Add
      </button>
    </div>
  );
};

export default AddTask;