import { FormEvent, useEffect, useState } from "react";
import "./style.css";

type Todo = {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
};
export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false } as const,
      ];
    });

    setNewItem("");
  }

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id: string, completed: boolean) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                className="btn btn-dangeer"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          );
        })}

        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
}
