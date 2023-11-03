import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.text)
    const { updateToDo, removeToDo, markToDo } = useTodo();

    const markedTodo = () => {
        markToDo(todo.id);
    }
    const editTodo = () => {
        updateToDo(todo.id, { ...todo, text: todoMsg })
        setIsTodoEditable(false);
    }
    const editPriority = () => {
        console.log(todo.priority);
        let newPriority = todo.priority === "low" ? "high" : "low";
        console.log(newPriority);
        const updatedTodo = {
            ...todo,
            id: Date.now(),
            priority: newPriority,
        };

        updateToDo(todo.id, updatedTodo);
    };

    // updateToDo(todo.id,{...todo,id:Date.now(),priority:!isPriority})
    // setIsPriority(!isPriority);


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
                }`}
        >
            <div className="checkbox-wrapper-12">
                <div class="cbx">
                    <input id="cbx-12" type="checkbox" className="cursor-pointer"
                checked={todo.completed}
                onChange={markedTodo} />
                    <label for="cbx-12"></label>
                    <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="goo-12">
                            <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                            <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                            <feblend in="SourceGraphic" in2="goo-12"></feblend>
                        </filter>
                    </defs>
                </svg>
            </div>
            {/* <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={markedTodo}
            /> */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                    } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* priority button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    editPriority();
                }}
            >
                {todo.priority === "high" ? <i class="ri-star-fill text-yellow-200 text-lg"></i> : <i class="ri-star-line text-lg"></i>}
            </button>
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable((prev) => !prev);
                    }
                }}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => removeToDo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;