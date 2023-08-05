import { configureStore } from '@reduxjs/toolkit'
import kanbanBoardReducer from './features/kanban/kanbanboardSlice'
export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: {
    board: kanbanBoardReducer
  }
})