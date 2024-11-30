import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  name: string;
  assignee: { name: string; avatar: string } | null;
  dueDate: string | null;
  priority: string | null;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string; updatedTask: Partial<Task> }>) => {
      const { id, updatedTask } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        Object.assign(task, updatedTask);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
