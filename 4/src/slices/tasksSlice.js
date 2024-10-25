import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, { payload: { task } }) => {
      // BEGIN (write your solution here)
      state.tasks = [task, ...state.tasks];
      // END
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
