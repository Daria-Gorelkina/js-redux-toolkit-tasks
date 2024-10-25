const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const addDate = (store) => (next) => (action) => {
  // BEGIN (write your solution here)
  if (action.type === 'TASK_ADD') {
    const newName = {
      ...action.payload.task,
      text: `Задача на ${new Date().toLocaleDateString('ru-RU')}: ${action.payload.task.text}`,
    };

    const newAction = {
      ...action,
      payload: {
        task: newName,
      },
    };

    return next(newAction);
  }
  return next(action);
  // END
};

export default { logger, addDate };
