import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: (result) =>
                result ? [...result.map(({ id }) => ({ type: 'Tasks', id })), 'Tasks'] : ['Tasks'],
        }),
        createTask: builder.mutation({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Tasks'],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Tasks', id }],
        }),
    }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } = tasksApi;
// END
