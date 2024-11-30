import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Task {
  id: string;
  taskName: string;
  user: { name: string; avatar: string } | null;
  date: string | null;
  priority: string | null;
  dateMessage: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
