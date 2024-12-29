import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Status } from '../models/status';
import { moveTask, loadTasks, addTask, updateTask, loadTags } from '../features/kanban/kanbanboardSlice';
import { Task } from '../models/task';
import { RootState } from '../store';
import TaskFormModal from './TaskFormModal';
import BoardColumn from './BoardColumn';

const KanbanBoard: React.FC = () => {
  const statuses = useSelector((state: RootState) => state.board.statuses);
  const allTasks = useSelector((state: RootState) => state.board.tasks);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenTaskFormModal, setIsModalOpenTaskFormModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const tags = useSelector((state: RootState) => state.board.tags);
  console.log("tags", tags);
  useEffect(() => {
    dispatch(loadTasks() as any);
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(loadTags() as any);
  }, [dispatch]);

  const handleDrop = useCallback((taskId: string, status: string) => {
    console.log('Dropped div with ID:', taskId, status);
    dispatch(moveTask({ id: parseInt(taskId), status }));
  }, [dispatch]);

  const handleSaveTask = useCallback((task: Task) => {
    if (currentTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask(task));
    }
    setIsModalOpenTaskFormModal(false);
  }, [dispatch, currentTask]);

  const handleEditTask = useCallback((task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
    setIsModalOpenTaskFormModal(true);
  }, []);

  const renderColumns = useMemo(() => {
    console.log("tasks", allTasks);
    return statuses.map((status: Status, index: number) => {
      const tasks = allTasks.filter((task: Task) => task.status === status.status);
      return (
        <BoardColumn
          key={index}
          status={status}
          tasks={tasks}
          tags={tags}
          onHandleDrop={handleDrop}
          onEditTask={handleEditTask}
        />
      );
    });
  }, [allTasks, statuses, handleDrop, handleEditTask]);

  return (
    <>
      <div className="kanban-header">
        <button className="add-task-btn" onClick={() => { setCurrentTask(null); setIsModalOpen(true); setIsModalOpenTaskFormModal(true); }}>+ New Task</button>
      </div>
      <div className="kanban-container">
        {renderColumns}
      </div>
      {isModalOpenTaskFormModal && (
        <TaskFormModal
          isOpen={isModalOpen}
          onRequestClose={() => { setIsModalOpen(false); setIsModalOpenTaskFormModal(false); }}
          onSave={handleSaveTask}
          task={currentTask}
          statuses={statuses}
          tags={tags}
        />
      )}
    </>
  );
};

export default KanbanBoard;