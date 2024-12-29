# Building a React-Redux Application with Vite: A Quick Guide

React is a powerful library for building user interfaces, and Redux is a popular state management library that helps you manage application state in a predictable way. In this article, we'll walk through setting up a simple React-Redux application using Vite, a fast and modern build tool. By the end, you’ll have a functional project with Redux integrated for state management.

## What is Vite?

Vite is a next-generation front-end tool that significantly improves the development experience with features like fast hot module replacement (HMR) and an extremely fast build process. It’s an excellent choice for modern React applications.

## Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v12 or later)
- npm or yarn

## Setting Up the Project

### 1. Create a New Vite Project

To get started, open your terminal and create a new Vite project:

```bash
npm create vite@latest kanban-board --template react-ts
cd kanban-board
npm install
```

### 2. Installing Redux Toolkit and React-Redux

Next, Redux Toolkit simplifies the setup and usage of Redux. Install it along with React-Redux:

```bash
npm install @reduxjs/toolkit react-redux
```

### Project Structure

Here's a simplified structure of our project:

```
kanban-board/
├── public/
├── src/
│   ├── features/
│   │   └── kanban/
│   │       └── kanbanboardSlice.ts
│   ├── KanbanBoardComponents/
│   │   ├── AddTask.tsx
│   │   ├── BoardColumn.tsx
│   │   └── KanbanBoard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── store.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Setting Up Redux

#### Creating the Store
Create a `store.ts` file in the `src` directory:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import kanbanBoardReducer from './features/kanban/kanbanboardSlice';

export const store = configureStore({
  reducer: {
    board: kanbanBoardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
#### Creating a Slice
Create a 'kanbanboardSlice.ts' file in 'src/features/kanban':
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
  status: string;
}

interface KanbanBoardState {
  tasks: Task[];
  statuses: { status: string; title: string; color: string }[];
}

const initialState: KanbanBoardState = {
  tasks: [],
  statuses: [
    { status: 'todo', title: 'To Do', color: '' },
    { status: 'inprogress', title: 'In Progress', color: '' },
    { status: 'done', title: 'Done', color: '' },
  ],
};

const kanbanBoardSlice = createSlice({
  name: 'kanbanboard',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ title: string; status: string }>) {
      const { title, status } = action.payload;
      const id = state.tasks.length + 1;
      state.tasks.push({ id, title, status });
    },
    moveTask(state, action: PayloadAction<{ id: number; status: string }>) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, moveTask } = kanbanBoardSlice.actions;
export default kanbanBoardSlice.reducer;

```
### 4. Provide the Store

Now, you need to make the Redux store available to your React application. Open `src/main.jsx` and wrap your application in the `Provider` component from React-Redux.

```typescript
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 5. Creating the Kanban Board Components

Now, let's create a simple counter component to interact with our Redux store. Create a new file called `Counter.jsx` in the `src` folder.

```typescript
import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveTask } from '../features/kanban/kanbanboardSlice';
import BoardColumn from './BoardColumn';
import { RootState } from '../store';

const KanbanBoard: React.FC = () => {
  const statuses = useSelector((state: RootState) => state.board.statuses);
  const allTasks = useSelector((state: RootState) => state.board.tasks);
  const dispatch = useDispatch();

  const handleDrop = useCallback((taskId: string, status: string) => {
    dispatch(moveTask({ id: parseInt(taskId), status }));
  }, [dispatch]);

  const renderColumns = useMemo(() => {
    return statuses.map((status, index) => {
      const tasks = allTasks.filter((task) => task.status === status.status);
      return <BoardColumn key={index} status={status} tasks={tasks} onHandleDrop={handleDrop} />;
    });
  }, [allTasks, statuses, handleDrop]);

  return <div className="kanban-board">{renderColumns}</div>;
};

export default KanbanBoard;
```

### Understanding useSelector and useDispatch

When working with Redux in a React application, two essential hooks you'll frequently use are useSelector and useDispatch.

#### useSelector
The useSelector hook allows you to extract data from the Redux store state. It takes a selector function as an argument, which is called with the store state. The return value of this function is the part of the state you want to access. This makes it easy to read specific slices of state within your components.

#### useDispatch
The useDispatch hook gives you access to the dispatch function from the Redux store. You use this function to dispatch actions, which are then handled by the reducers to update the state. This is crucial for triggering state changes in response to user interactions or other events in your application.

By combining useSelector and useDispatch, you can efficiently read from and write to your Redux store, making state management in your React application more predictable and easier to debug.

### 7. Run Your Application

Now that everything is set up, you can run your application:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. Open your browser and navigate to http://localhost:3000 to see your Kanban board in action.

## Conclusion

In this article, we set up a React project with Redux for state management using Vite. We created a simple Kanban board to demonstrate how Redux can manage state in a React application. Redux Toolkit made it easy to set up and manage our state, and Vite provided a fast and efficient development environment. Happy coding!