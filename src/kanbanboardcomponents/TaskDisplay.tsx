import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../models/task';
import { removeTask } from '../features/kanban/kanbanboardSlice';
import ReusableModal from '../components/ReusableModal';
import { Tag } from '../models/tag';

interface TaskDisplayProps {
  task: Task;
  tags: Tag[];
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  isHovered: boolean;
  onEdit: (task: Task) => void;
  children?: React.ReactNode;
}

const TaskDisplay: React.FC<TaskDisplayProps> = ({ task, tags, onDragStart, onDragEnd, onDragEnter, isHovered, onEdit }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', task.id.toString());
    e.dataTransfer.effectAllowed = 'move';
    onDragStart();
  }, [task.id, onDragStart]);

  const handleDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    onDragEnd();
  }, [onDragEnd]);

  const handleRemoveTask = useCallback(() => {
    dispatch(removeTask(task.id));
    setIsModalOpen(false);
  }, [dispatch, task.id]);

  return (
    <div
      draggable="true"
      className={`kanban-card ${isHovered ? 'hovered' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={onDragEnter}
      style={{ cursor: 'move' }}
    >
      <div className="card-icons">
        <span
          className="card-edit-icon"
          onClick={() => onEdit(task)}
        >
          <i className={`fas fa-pencil-alt`}></i>
        </span>
        <span
          className="card-remove-icon"
          onClick={() => setIsModalOpen(true)}
        >
          <i className={`fas fa-trash`}></i>
        </span>
      </div>
      <div className="card-title">{task.title}</div>
      <div className="card-tags">
        {task.tags && task.tags.map(tagName => {
          const tag = tags.find(t => t.name === tagName);
          return (
            <span key={tagName} className="tag" style={{ backgroundColor: tag?.color }}>
              {tagName}
            </span>
          );
        })}
      </div>
      <ReusableModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Delete"
      >
        <p>Are you sure you want to delete this task?</p>
        <button onClick={handleRemoveTask}>Yes</button>
        <button onClick={() => setIsModalOpen(false)}>No</button>
      </ReusableModal>
    </div>
  );
};

export default TaskDisplay;