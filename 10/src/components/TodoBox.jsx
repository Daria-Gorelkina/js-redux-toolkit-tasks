import React from 'react';
import Spinner from './Spinner.jsx';
import TodoForm from './TodoForm.jsx';
// BEGIN (write your solution here)
import { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } from '../services/taskApi';
// END

const TodoBox = () => {
  // BEGIN (write your solution here)
    const { data: tasks = [], isLoading } = useGetTasksQuery();
    const [createTask] = useCreateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    // END


  const handleDeleteTask = async (event, id) => {
    event.preventDefault();
    // BEGIN (write your solution here)
      event.preventDefault();
      try {
          await deleteTask(id).unwrap();
      } catch (error) {
          console.error("Failed to delete the task:", error);
      }
    // END
  };

  const handleSubmitForm = async (event, newTaskText) => {
    event.preventDefault();
    // BEGIN (write your solution here)
      event.preventDefault();
      try {
          await createTask({ text: newTaskText }).unwrap();
      } catch (error) {
          console.error("Failed to create the task:", error);
      }
    // END
  };

  const renderTodo = () => (
    <TodoForm
      submitHandler={handleSubmitForm}
    />
  );

  // BEGIN (write your solution here)
    if (isLoading) {
        return <Spinner />;
    }
  // END

  return (
    <div>
      <div className="mb-3">
        {renderTodo()}
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="row">
            <div className="col-1">
              {task.id}
            </div>
            <div className="col">
              <a href="" className="todo-task" onClick={(event) => handleDeleteTask(event, task.id)}>{task.text}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoBox;
