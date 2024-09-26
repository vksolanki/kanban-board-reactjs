import React, { useEffect, useRef, useCallback } from 'react';
import { Task } from '../models/task';
import TaskDisplay from './TaskDisplay';
import AddTask from './AddTask';
import { Status } from '../models/status';
import updateScrollable from '../utils/scrollable-update';

interface BoardColumnProps {
  status: Status;
  tasks: Task[];
  onHandleDrop: (taskId: string, status: string) => void;
  children?: React.ReactNode;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ status, tasks, onHandleDrop }) => {
  const boardColumnContentRef = useRef<HTMLDivElement>(null);
  const boardColumnRef = useRef<HTMLDivElement>(null);

  const resizeHandler = useCallback(() => {
    updateScrollable(boardColumnRef, boardColumnContentRef);
  }, []);

  useEffect(() => {
    // Initial check on component mount
    updateScrollable(boardColumnRef, boardColumnContentRef);

    // Recheck when the window is resized
    window.addEventListener('resize', resizeHandler);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  const handleDragOver = useCallback<React.DragEventHandler<HTMLDivElement>>((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback<React.DragEventHandler<HTMLDivElement>>((e) => {
    e.preventDefault();
    const divId = e.dataTransfer.getData('id');
    onHandleDrop(divId, status.status);
  }, [onHandleDrop, status.status]);

  return (
    <div
      ref={boardColumnRef}
      className={`${status.status}-column board-column`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className='board-column-header'>
        <span className="status-dot pull-left" style={{ backgroundColor: status.color }}></span>
        <span className="status-label pull-left">{status.title}</span>
      </div>
      <div ref={boardColumnContentRef} className="board-column-content scroll-container">
        {tasks.map((task, index) => (
          <TaskDisplay key={index} task={task} />
        ))}
        <AddTask status={status} />
      </div>
    </div>
  );
};

export default BoardColumn;