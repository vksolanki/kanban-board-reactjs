import React, { useEffect, useMemo } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Status } from '../models/status';
import BoardColumn from './BoardColumn';
import { moveTask } from '../features/kanban/kanbanboardSlice';
import { Task } from '../models/task';
import { RootState } from '../store';

function KanbanBoard() {
  const statuses = useSelector((state: RootState) => state.board.statuses);
  const allTasks = useSelector((state: RootState) => state.board.tasks);
  const dispatch = useDispatch();

  const handleDrop = (taskId: string, status: string) => {
    console.log('Dropped div with ID:', taskId, status);
    dispatch(moveTask({ id: parseInt(taskId), status: status }));
  };

  const renderColumns = useMemo(() => {
    console.log("tasks", allTasks);
    return statuses.map((status: Status, index: number) => {
      const tasks = allTasks.filter((task: Task) => task.status === status.status);
      return (
        <BoardColumn key={index} status={status} tasks={tasks} onHandleDrop={handleDrop} />
      );
    });
  }, [allTasks, statuses]);

  return (
    <div className="kanban-board">
      {renderColumns}
    </div>
  );
}

export default KanbanBoard;
