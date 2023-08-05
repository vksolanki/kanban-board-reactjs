import React from 'react';
import { Task } from '../models/task';

interface TaskDisplayProps {
  task: Task;
  children?: React.ReactNode; // Add children prop here
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', task.id.toString());
  };

  return (
    <div
      draggable="true"
      className="card"
      onDragStart={handleDragStart}
      style={{ cursor: 'move' }}
    >
      <span className="card-remove-icon">
        <i className="fas fa-trash"></i>
      </span>
      <div className="card-title">{task.title}</div>
    </div>
  );
};

export default TaskDisplay;
