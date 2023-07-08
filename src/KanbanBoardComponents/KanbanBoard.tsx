import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../vite.svg'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../models/status'
import BoardColumn from './BoardColumn'
import AddTask from './AddTask'
import { Task } from '../models/task'
import { moveTask } from '../features/kanban/kanbanboardSlice'

function KanbanBoard() {
  const statuses = useSelector((state: RootState) => state.board.statuses)
  const allTasks = useSelector((state: RootState) => state.board.tasks)
  const dispatch = useDispatch()

  const handleDrop = (taskId: string, status: string) => {
    // e.preventDefault();
    // // Retrieve the div ID from the dataTransfer
    // const divId = e.dataTransfer.getData('divId');
    // onHandleDrop(divId);
    // // setDraggedDivId(null);
    // // Perform any necessary logic to handle the drop
    console.log('Dropped div with ID:', taskId, status);
    dispatch(moveTask({ id: parseInt(taskId), status: status }));
  };

  const renderColumns = () => {
    console.log(allTasks);
    return statuses.map((status: Status, index: number) => {
      // Add your JavaScript logic here
      const tasks = allTasks.filter((x: any) => x.status == status.status);
      return (
        <BoardColumn key={index} title={status.title} status={status.status} tasks={tasks} className={''} onHandleDrop={handleDrop}>
        </BoardColumn>
      );
    })
  }
  return (
    <div className="kanban-board">
      {renderColumns()}
    </div >
  )
}

export default KanbanBoard
