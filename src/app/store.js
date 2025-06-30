import { configureStore } from "@reduxjs/toolkit";
import projectReducer from '../features/projects/projectSlice.js';
import taskReducer from '../features/tasks/taskSlice.js';
import teamReducer from '../features/teams/teamSlice.js';


export const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    team: teamReducer,
  },
});