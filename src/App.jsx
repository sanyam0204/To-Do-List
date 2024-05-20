import { useEffect, useState } from "react";
import "./App.css";
import { ToDoProvider } from "./Contexts/index";
import TodoForm from "./Components.jsx/ToDoForm";
import TodoItem from "./Components.jsx/ToDoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateToDo = (id, todo) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? todo : item)));
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  useEffect(() => {
    if (todos.length) localStorage.setItem("todos", JSON.stringify(todos));
    // setTodos("");
  }, [todos]);

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data && data.length > 0) {
      setTodos(JSON.parse(data));
    }
  }, []);

  return (
    <ToDoProvider
      value={{ todos, addToDo, deleteToDo, updateToDo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
