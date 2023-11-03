import { useState, useEffect, useCallback} from 'react'
import { TodoContextProvider } from './context/TodoContext'
import TodoForm from './components/ToDoForm'
import TodoItem from './components/TodoItem'
import './App.css'


function App() {
  const [myToDo,setMyToDo] = useState([]);
  
  const addToDo = (todo) =>{
    setMyToDo((prev)=>[{id:Date.now(),...todo},...prev]);
  }
  const updateToDo = (id,todo)=>{
    setMyToDo((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)));
    setMyToDo((prev) => [...prev].sort(compareTodos));
  }
  const removeToDo = (id) => {
    setMyToDo((prev)=>prev.filter((prevTodo)=>(prevTodo.id!==id)))
  }
  const markToDo = (id) => {
    setMyToDo((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? {...prevTodo,completed:!prevTodo.completed} : prevTodo)))
  }

  function compareTodos(a, b) {
    if(a.priority === 'high' && b.priority === 'high' && a.id-b.id>0){
      return -1;
    }else if(a.priority === 'high' && b.priority === 'high' && a.id-b.id<0){
      return 1;
    }else if((a.priority === 'high' && b.priority === 'low')) {
      return -1; // 'high' priority comes before 'low'
    } else if ((a.priority === 'low' && b.priority === 'high')) {
      return 1; // 'low' priority comes after 'high'
    } else {
      return 0; // Priorities are the same
    }
  }

  useEffect(()=>{
    let todos = JSON.parse(localStorage.getItem("mytodo"));
    if(todos && todos.length>0){
      setMyToDo(todos);
    }
  },[]);
   
  
  useEffect(()=>{
    localStorage.setItem("mytodo",JSON.stringify(myToDo));
  },[myToDo]);


  return (
    <TodoContextProvider value={{myToDo,addToDo, updateToDo, removeToDo, markToDo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {myToDo.map((todo) => (
                          <div key={todo.id}
                          className="w-full"
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoContextProvider>
  )
}

export default App