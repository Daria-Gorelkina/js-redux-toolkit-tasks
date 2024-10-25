import axios from "axios";

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data.items;
});

// BEGIN (write your solution here)
const tasksAdapter = createEntityAdapter();

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const response = await axios.post(routes.tasksPath(), task);
  return response.data; // { name, id }
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (id) => {
  await axios.delete(routes.taskPath(id));
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchTasks.fulfilled, (state, action) => {
          tasksAdapter.setAll(state, action.payload);
        })
        .addCase(addTask.fulfilled,  (state, action) => {
          tasksAdapter.addOne(state, action.payload);
        })
        .addCase(removeTask.fulfilled,  (state, action) => {
          tasksAdapter.removeOne(state, action.payload);
        });
  },
});

export const {actions} = tasksSlice;
export const tasksSelectors = tasksAdapter.getSelectors(
    (state) => state.tasks
);
export default tasksSlice.reducer;
// END
