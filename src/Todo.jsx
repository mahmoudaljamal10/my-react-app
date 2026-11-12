import { useState, useEffect } from "react";

function Todo() {
  // =========================
  // States
  // =========================

  const [task, setTask] = useState("");

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  // =========================
  // Save to Local Storage
  // =========================

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // =========================
  // Add Todo
  // =========================

  function addTodo() {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    setTodos([...todos, newTodo]);
    setTask("");
  }

  // =========================
  // Delete Todo
  // =========================

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // =========================
  // Complete Todo
  // =========================

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // =========================
  // Start Edit
  // =========================

  function startEdit(todo) {
    setEditId(todo.id);
    setEditText(todo.text);
  }

  // =========================
  // Save Edit
  // =========================

  function saveEdit(id) {
    if (editText.trim() === "") {
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editText }
          : todo
      )
    );

    setEditId(null);
    setEditText("");
  }

  // =========================
  // Clear All
  // =========================

  function clearAll() {
    if (todos.length === 0) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {
      setTodos([]);
    }
  }

  // =========================
  // Filter + Search
  // =========================

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "active" && !todo.completed);

    return matchesSearch && matchesFilter;
  });

  // =========================
  // Counters
  // =========================

  const totalTasks = todos.length;

  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;

  const activeTasks = todos.filter(
    (todo) => !todo.completed
  ).length;

  // =========================
  // JSX
  // =========================

  return (
    <div className="todo-page">

      <div className="todo-container">

        <h1>My To-Do List</h1>

        <p className="subtitle">
          Manage your tasks easily
        </p>

        {/* Add Task */}

        <div className="add-box">

          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />

          <button onClick={addTodo}>
            Add Task
          </button>

        </div>

        {/* Statistics */}

        <div className="stats">

          <div className="stat">
            <span>Total</span>
            <strong>{totalTasks}</strong>
          </div>

          <div className="stat">
            <span>Active</span>
            <strong>{activeTasks}</strong>
          </div>

          <div className="stat">
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>

        </div>

        {/* Search */}

        <input
          className="search"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}

        <div className="filters">

          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active-filter" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={
              filter === "completed" ? "active-filter" : ""
            }
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

        </div>

        {/* Todo List */}

        <div className="todo-list">

          {filteredTodos.length === 0 ? (
            <p className="empty">
              No tasks found.
            </p>
          ) : (
            filteredTodos.map((todo) => (

              <div
                className={`todo-item ${
                  todo.completed ? "completed" : ""
                }`}
                key={todo.id}
              >

                <div className="todo-info">

                  {editId === todo.id ? (

                    <input
                      className="edit-input"
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                    />

                  ) : (

                    <h3>{todo.text}</h3>

                  )}

                  <div className="date">
                    Added: {todo.date} - {todo.time}
                  </div>

                </div>

                <div className="actions">

                  <button
                    className="complete-btn"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  {editId === todo.id ? (

                    <button
                      className="save-btn"
                      onClick={() => saveEdit(todo.id)}
                    >
                      Save
                    </button>

                  ) : (

                    <button
                      className="edit-btn"
                      onClick={() => startEdit(todo)}
                    >
                      Edit
                    </button>

                  )}

                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

        {/* Clear All */}

        {todos.length > 0 && (
          <button
            className="clear-btn"
            onClick={clearAll}
          >
            Delete All Tasks
          </button>
        )}

      </div>

      {/* =========================
          CSS
      ========================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .todo-page {
          min-height: 100vh;
          background: #f1f5f9;
          padding: 50px 20px;
          font-family: Arial, sans-serif;
        }

        .todo-container {
          max-width: 850px;
          margin: auto;
          background: white;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 10px 35px rgba(0,0,0,0.08);
        }

        h1 {
          text-align: center;
          margin: 0;
          color: #1e293b;
          font-size: 36px;
        }

        .subtitle {
          text-align: center;
          color: #64748b;
          margin-bottom: 30px;
        }

        .add-box {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .add-box input {
          flex: 1;
          padding: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
        }

        .add-box input:focus,
        .search:focus,
        .edit-input:focus {
          border-color: #2563eb;
        }

        .add-box button {
          border: none;
          background: #2563eb;
          color: white;
          padding: 0 25px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
        }

        .add-box button:hover {
          background: #1d4ed8;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat {
          background: #f8fafc;
          padding: 18px;
          text-align: center;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .stat span {
          display: block;
          color: #64748b;
          margin-bottom: 5px;
        }

        .stat strong {
          font-size: 25px;
          color: #1e293b;
        }

        .search {
          width: 100%;
          padding: 14px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 16px;
          margin-bottom: 15px;
          outline: none;
        }

        .filters {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .filters button {
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          background: #e2e8f0;
          cursor: pointer;
        }

        .filters button:hover {
          background: #cbd5e1;
        }

        .active-filter {
          background: #2563eb !important;
          color: white;
        }

        .todo-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .todo-info {
          flex: 1;
        }

        .todo-info h3 {
          margin: 0 0 8px;
          color: #1e293b;
        }

        .completed h3 {
          text-decoration: line-through;
          color: #94a3b8;
        }

        .date {
          font-size: 13px;
          color: #64748b;
        }

        .actions {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .actions button {
          border: none;
          padding: 8px 12px;
          border-radius: 7px;
          cursor: pointer;
          color: white;
        }

        .complete-btn {
          background: #16a34a;
        }

        .edit-btn {
          background: #f59e0b;
        }

        .save-btn {
          background: #2563eb;
        }

        .delete-btn {
          background: #dc2626;
        }

        .actions button:hover {
          opacity: 0.85;
        }

        .edit-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          font-size: 16px;
        }

        .empty {
          text-align: center;
          color: #64748b;
          padding: 30px;
        }

        .clear-btn {
          width: 100%;
          margin-top: 25px;
          padding: 13px;
          border: none;
          border-radius: 10px;
          background: #991b1b;
          color: white;
          cursor: pointer;
          font-size: 15px;
        }

        .clear-btn:hover {
          background: #7f1d1d;
        }

        @media (max-width: 650px) {

          .todo-container {
            padding: 20px;
          }

          h1 {
            font-size: 28px;
          }

          .add-box {
            flex-direction: column;
          }

          .add-box button {
            padding: 13px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .todo-item {
            flex-direction: column;
            align-items: stretch;
          }

          .actions {
            width: 100%;
          }

          .actions button {
            flex: 1;
          }

        }

      `}</style>

    </div>
  );
}

export default Todo;