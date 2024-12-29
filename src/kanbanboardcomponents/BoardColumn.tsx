import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../models/task';
import TaskDisplay from './TaskDisplay';
import AddTask from './AddTask';
import { Status } from '../models/status';
import updateScrollable from '../utils/scrollable-update';
import { updateTaskOrder } from '../features/kanban/kanbanboardSlice';
import produce from 'immer';
import { Tag } from '../models/tag';

interface BoardColumnProps {
  status: Status;
  tasks: Task[];
  tags: Tag[];
  onHandleDrop: (taskId: string, status: string) => void;
  onEditTask: (task: Task) => void;
  children?: React.ReactNode;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ status, tasks, tags, onHandleDrop, onEditTask }) => {
  const boardColumnContentRef = useRef<HTMLDivElement>(null);
  const boardColumnRef = useRef<HTMLDivElement>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);
  const dispatch = useDispatch();

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
    setDraggedTaskId(null);
    setHoveredTaskId(null);
  }, [onHandleDrop, status.status]);

  const handleDragStart = useCallback((taskId: string) => {
    setDraggedTaskId(taskId);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedTaskId(null);
    setHoveredTaskId(null);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>, targetTaskId: string) => {
    e.preventDefault();
    setHoveredTaskId(targetTaskId);
    if (draggedTaskId && draggedTaskId !== targetTaskId) {
      const draggedTaskIndex = tasks.findIndex(task => task.id.toString() === draggedTaskId);
      const targetTaskIndex = tasks.findIndex(task => task.id.toString() === targetTaskId);

      const updatedTasks = produce(tasks, draft => {
        const [draggedTask] = draft.splice(draggedTaskIndex, 1);
        draft.splice(targetTaskIndex, 0, draggedTask);

        draft.forEach((task, index) => {
          task.sortIndex = index;
        });
      });

      dispatch(updateTaskOrder({ status: status.status, tasks: updatedTasks }));
    }
  }, [draggedTaskId, tasks, dispatch, status.status]);

  const sortedTasks = tasks.sort((a, b) => a.sortIndex - b.sortIndex);

  return (
    <section
      ref={boardColumnRef}
      className={`${status.status}-column board-column kanban-column`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className='board-column-header'>
        <span className="status-dot pull-left" style={{ backgroundColor: status.color }}></span>
        <span className="status-label pull-left">{status.title}</span>
      </div>
      <div ref={boardColumnContentRef} className="board-column-content scroll-container">
        {sortedTasks.map((task, index) => (
          <TaskDisplay
            key={index}
            task={task}
            tags = {tags}
            onDragStart={() => handleDragStart(task.id.toString())}
            onDragEnd={handleDragEnd}
            onDragEnter={(e) => handleDragEnter(e, task.id.toString())}
            isHovered={hoveredTaskId === task.id.toString()}
            onEdit={onEditTask}
          />
        ))}
        <AddTask status={status} />
      </div>
    </section>
  );
};

export default BoardColumn;