import { createSlice, nanoid } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(projectId, title, description = '', stateValue = 'todo', assignee = null) {
        return {
          payload: {
            id: nanoid(),
            projectId,
            title,
            description,
            state: stateValue,
            assignee,
          }
        };
      }
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const task = state.find(t => t.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteTask: (state, action) => {
      const index = state.findIndex(t => t.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    }
  }
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;