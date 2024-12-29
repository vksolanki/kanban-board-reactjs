@workspace Create article for medium.com for react redux with exampleproject build using vite focus on how we setup redux as state management make article around 3-5 min read

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

### 3. Set Up Redux Store

Create a new folder called `store` in the `src` directory. Inside it, create a file named `store.js`.

```javascript
// src/store/store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
  counter: 0,
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

export default store;
```

### 4. Provide the Store

Now, you need to make the Redux store available to your React application. Open `src/main.jsx` and wrap your application in the `Provider` component from React-Redux.

```javascript
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 5. Create a Counter Component

Now, let's create a simple counter component to interact with our Redux store. Create a new file called `Counter.jsx` in the `src` folder.

```javascript
// src/Counter.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

### 6. Use the Counter Component

Finally, import and use the `Counter` component in your `App.jsx` file.

```javascript
// src/App.jsx
import React from 'react';
import Counter from './Counter';

const App = () => {
  return (
    <div>
      <h1>React-Redux with Vite</h1>
      <Counter />
    </div>
  );
};

export default App;
```

### 7. Run Your Application

Now that everything is set up, you can run your application:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`. You should see a simple counter application where you can increment and decrement the counter using Redux for state management.

## Conclusion

In this article, we successfully set up a simple React application with Redux for state management using Vite. We created a Redux store, connected it to our React components, and dispatched actions to modify the state. With Vite's fast development environment, you can focus on building your application without getting bogged down by slow build times.

Feel free to expand upon this basic setup, add more features, and explore the vast capabilities of React and Redux. Happy coding!