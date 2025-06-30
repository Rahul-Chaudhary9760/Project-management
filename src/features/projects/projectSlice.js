import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  // Example:
  // { id: '1', name: 'Demo Project', description: '...', tasks: [], members: [] }
];

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, description) {
        return {
          payload: {
            id: nanoid(),
            name,
            description,
            tasks: [],
            members: [],
          },
        };
      },
    },
    updateProject: (state, action) => {
      const { id, data } = action.payload;
      const project = state.find((p) => p.id === id);
      if (project) {
        Object.assign(project, data);
      }
    },
    deleteProject: (state, action) => {
      const index = state.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;