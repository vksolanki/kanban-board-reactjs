import { configureStore } from '@reduxjs/toolkit'
import kanbanBoardReducer from './features/kanban/kanbanboardSlice'

export const store = configureStore({
  reducer: {
    board: kanbanBoardReducer
  }
})