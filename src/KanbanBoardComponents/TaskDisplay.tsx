import React, { useCallback } from 'react';
import { Task } from '../models/task';

interface TaskDisplayProps {
  task: Task;
  children?: React.ReactNode;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task }) => {
  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', task.id.toString());
  }, [task.id]);

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