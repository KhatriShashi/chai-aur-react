import {configureStore} from "@reduxjs/toolkit"
import { loadFromLocalStorage } from "../features/todo/todoSlice";
import { todoReducer } from "../features/todo/todoSlice";

const persistedState = loadFromLocalStorage('todos');
export const store = configureStore({
    reducer:todoReducer,
    preloadedState:{
        todos: persistedState
    }
});