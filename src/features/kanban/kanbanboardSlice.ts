import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../models/task';
import { Status } from '../../models/status';
import { Tag } from '../../models/tag';

interface KanbanBoardState {
  tasks: Task[];
  statuses: Status[];
  tags: Tag[];
}

const initialState: KanbanBoardState = {
  tasks: [],
  statuses: [
    { status: 'todo', title: 'To Do', color: '' },
    { status: 'inprogress', title: 'In Progress', color: '' },
    { status: 'done', title: 'Done', color: '' },
  ],
  tags: []
};

export const loadTasks = createAsyncThunk('kanbanboard/loadTasks', async () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
});

export const loadTags = createAsyncThunk('kanbanboard/loadTags', async () => {
  const tags = localStorage.getItem('tags');
  return tags ? JSON.parse(tags) : [];
});

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const saveTagsToLocalStorage = (tags: Tag[]) => {
  localStorage.setItem('tags', JSON.stringify(tags));
};

const kanbanBoardSlice = createSlice({
  name: 'kanbanboard',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<any>) {
      const { title, status, tags } = action.payload;
      const id = state.tasks.length > 0 ? Math.max(...state.tasks.map(task => task.id)) + 1 : 1;
      const newTask: Task = {
        id: id,
        title: title,
        status: status,
        sortIndex: state.tasks.filter(task => task.status === status).length,
        tags: tags
      };
      state.tasks.push(newTask);
      saveTasksToLocalStorage(state.tasks);
    },

    
    moveTask(state, action: PayloadAction<any>) {
      const { id, status } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.status = status;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    updateTaskOrder(state, action: PayloadAction<{ status: string, tasks: Task[] }>) {
      const { status, tasks } = action.payload;
      tasks.forEach(updatedTask => {
        const task = state.tasks.find(task => task.id === updatedTask.id);
        if (task) {
          task.sortIndex = updatedTask.sortIndex;
        }
      });
      saveTasksToLocalStorage(state.tasks);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    addTag(state, action: PayloadAction<Tag>) {
      state.tags.push(action.payload);
      saveTagsToLocalStorage(state.tags);
    },
    removeTag(state, action: PayloadAction<string>) {
      state.tags = state.tags.filter(tag => tag.name !== action.payload);
      saveTagsToLocalStorage(state.tags);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    markDone(state, action) {
      // state.items(element => {
      //     if (element.id == action.id) {
      //         element.isDone = action.isDone;
      //     }
      // });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(loadTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

export const { addTask, moveTask, updateTaskOrder, removeTask, addTag, removeTag, markDone, updateTask } = kanbanBoardSlice.actions;

export default kanbanBoardSlice.reducer;