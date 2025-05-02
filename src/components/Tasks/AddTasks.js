import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTaskDescription, updateTaskTitle } from '../actions/action';

function AddTasks() {
    const dispatch = useDispatch();
    const taskTitle = useSelector(state => state.task.taskTitle)
    const taskDescription = useSelector(state => state.task.taskDescription)

    const onAddTask = () => {
        const task = {
            title: taskTitle,
            description: taskDescription,
        }
        dispatch(addTask(task))
    };

    const onTaskTitleChange = (e) => dispatch(updateTaskTitle(e.target.value))
    const onTaskDescriptionChange = (e) => dispatch(updateTaskDescription(e.target.value))

    return (
        <div>
            <div>
                <input type="text" onChange={onTaskTitleChange} value={taskTitle} />
                <input type="text" onChange={onTaskDescriptionChange}
                    value={taskDescription} />
                <button onClick={onAddTask}>Add Task</button>
            </div>
        </div>
    );
}

export default AddTasks;