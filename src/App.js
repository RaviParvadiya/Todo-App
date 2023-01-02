import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // Single Todo
  const [todo, setTodo] = useState("");
  // All Todos
  const [todos, setTodos] = useState([]);
  // Edit Mode
  const [editId, setEditId] = useState(0);

  const apiEndPoint = "https://63ad0cd534c46cd7ae8f44d5.mockapi.io/todo/";

  // GET with axios
  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(apiEndPoint);
      setTodos(res.data);
    };
    getTodos();
  }, []);

  // DELETE with axios
  const deleteTodo = async (id) => {
    await axios.delete(`${apiEndPoint}${id}`);
    setTodos(
      todos.filter((to) => {
        return to.id !== id;
      })
    );
  };

  // POST with Axios
  const addTodo = async (todo) => {
    let res = await axios.post(apiEndPoint, {
      todo: todo
      // id: id
    });
    setTodos([res.data, ...todos]);
    setEditId(0);
    setTodo("");
  };

  // PUT with axios
  const editTodoApi = async (editId) => {
    await axios.put(`${apiEndPoint}${editId}`, {
      todo: todo
    });
    // setTodos(
    //   todos.find((i) => {
    //     return i.id === id;
    //   })
    // );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is inside the editId then we need to
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        // Check it is the todo we are editing
        t.id === editTodo.id
          ? // Then provide same id and todo whatever changes happened
            (t = { id: t.id, todo })
          : // Default value
            { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      // console.log(editTodo.todo);
      editTodoApi(editId);
      // console.log(editId);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      addTodo(todo);
      setTodo("");
    }
    // addTodo(todo, todo.id);
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    // console.log(editTodo.todo);
    setEditId(id);
    // console.log(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Class Container */}
        <div className="Container">
          <h1>TODO</h1>
          {/* Class TodoForm */}
          <form className="" onSubmit={handleSubmit}>
            {/* <label htmlFor="todo">Add Your List Here!</label> */}
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              pattern=".+"
              required
            />
            <button type="submit">{editId ? "UPDATE" : "ADD"}</button>
          </form>

          {/* Class AllTodos List */}
          <ul className="">
            {todos.map((t) => (
              <li className="" key={t.id}>
                {/* Class TodoText // Inside TodoList */}
                <span className="">{t.todo}</span>
                <button onClick={() => handleEdit(t.id)}>EDIT</button>
                <button onClick={() => handleDelete(deleteTodo(t.id))}>
                  DEL
                </button>
              </li>
            ))}
            {/* Class SingleTodo */}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
