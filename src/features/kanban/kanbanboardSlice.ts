import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'
import { Task } from '../../models/task';
import { Status } from '../../models/status';
interface KanbanBaordState {
    tasks: Task[]
    statuses: Status[]
}
const initialState: KanbanBaordState = {
    tasks: [],
    statuses: [{ status: "todo", title: "To Do", color: "" },
    { status: "inprogress", title: "In Progress", color: "" },
    { status: "done", title: "Done", color: "" }]
}
const kanbanBoardSlice = createSlice({
    name: 'kanbanboard',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<any>) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const { title, status } = action.payload;
            const id = state.tasks.length + 1;
            const newTask = {
                id: id,
                title: title,
                status: status,
            };
            state.tasks.push(newTask);
        },
        moveTask(state, action: PayloadAction<any>) {
            const { id, status } = action.payload;
            state.tasks = state.tasks.map((task) =>
                task.id === id ? { ...task, status: status } : task
            );
        },
        markDone(state, action) {
            // state.items(element => {
            //     if (element.id == action.id) {
            //         element.isDone = action.isDone;
            //     }
            // });
        },
    },
})

// Action creators are generated for each case reducer function
export const { addTask, moveTask, markDone } = kanbanBoardSlice.actions

export default kanbanBoardSlice.reducer