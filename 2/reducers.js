import _ from "lodash";
import { combineReducers } from "redux";

const comments = (state = {}, action) => {
  // BEGIN (write your solution here)
  switch (action.type) {
    case "TASK_COMMENT_ADD": {
      const comment = action.payload.comment;
      return { ...state, [comment.id]: comment };
    }
    case "TASK_COMMENT_REMOVE": {
      const id = action.payload.id;
      return _.omit(state, id);
    }
    case "TASK_REMOVE": {
      const taskId = action.payload.id;
      return _.omitBy(state, (comment) => comment.taskId === taskId);
    }
    default:
      return state;
  }
  // END
};

const tasks = (state = {}, action) => {
  // BEGIN (write your solution here)
  switch (action.type) {
    case 'TASK_ADD': {
      const task = action.payload.task;
      return {...state, [task.id]: task};
    }
    case 'TASK_REMOVE': {
      const id = action.payload.id;
      return _.omit(state, id)
    }
    default:
      return state;
  }
  // END
};

export default combineReducers({
  comments,
  tasks,
});
