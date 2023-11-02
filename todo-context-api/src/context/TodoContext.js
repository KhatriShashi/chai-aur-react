import { useContext,createContext} from "react";

export const todoContext = createContext({
    myToDo:[
    {
        id:1,
        text:"Buy groceries",
        completed:false,
        priority:"low"
    }],
    addToDo:(todo)=>{},
    updateToDo:(id,todo) =>{},
    removeToDo:(id)=>{},
    markToDo:(id)=>{},
    markPriority:(id,todo)=>{},
})

export const TodoContextProvider = todoContext.Provider;

export function useTodo(){
    return useContext(todoContext);
}