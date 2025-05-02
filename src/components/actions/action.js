import { ADD_TASK, UPDATE_TASK_DESCRIPTION, UPDATE_TASK_TITLE } from "./actionTypes";

export const addTask = (task) => {
    console.log("addTask ", task);
    return {
        type: ADD_TASK,
        payload: task,
    };
};

export const updateTaskTitle = (value) => {
    console.log("updateTaskTitle ", value);
    return {
        type: UPDATE_TASK_TITLE,
        payload: value,
    };
};

export const updateTaskDescription = (value) => {
    console.log("updateTaskDescription ", value);
    return {
        type: UPDATE_TASK_DESCRIPTION,
        payload: value,
    };
};



// https://www.freecodecamp.org/news/redux-and-redux-toolkit-for-beginners/