import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: []
}

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

function compareTodos(a, b) {
  if((a.priority === 'high' && b.priority === 'low')) {
     return -1; // 'high' priority comes before 'low'
   } else if ((a.priority === 'low' && b.priority === 'high')) {
     return 1; // 'low' priority comes after 'high'
   } else {
     return 0; // Priorities are the same
   }
 }
 // Redux Toolkit allows us to write "mutating" logic in reducers. It
 // doesn't actually mutate the state because it uses the Immer library, which
 // produces a new updated object based on the original one.
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        completed: action.payload.completed,
        priority: action.payload.priority
      }
      state.todos.unshift(todo);
      state.todos.sort(compareTodos);
      saveToLocalStorage('todos', state.todos);
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            text: action.payload.text
          };
        } else {
          return item;
        }
      });
      saveToLocalStorage('todos', state.todos);
    },
    priorityTodo: (state, action) => {
      console.log(action.payload.id)
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            priority: action.payload.priority
          };
        } else {
          return item;
        }
      });
      state.todos.sort(compareTodos);
      saveToLocalStorage('todos', state.todos);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(item => item.id !== action.payload)
      saveToLocalStorage('todos', state.todos);
    },

    toggleComplete: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      })
      saveToLocalStorage('todos', state.todos);
    }


  }
})

export const { addTodo, updateTodo, priorityTodo, removeTodo, toggleComplete } = todoSlice.actions

export const todoReducer = todoSlice.reducer