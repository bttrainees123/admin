import { combineReducers } from "redux";
import taskReducer from "./taskReduces";

const rootReducer = combineReducers({ task: taskReducer });

export default rootReducer