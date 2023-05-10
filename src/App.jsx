import { useEffect, useState } from "react"
import Header from "./components/Header"
import TodoComputed from "./components/TodoComputed"
import TodoCreate from "./components/TodoCreate"
import TodoFilter from "./components/TodoFilter"
import TodoList from "./components/TodoList"

// const initialStateTodos = [
//   { id: 1, title: "Go to the gym", completed: true },
//   { id: 2, title: "Eat breakfast.", completed: false },
//   { id: 3, title: "Exercise or do some physical activity.", completed: false },
//   { id: 4, title: "Relax or do a hobby before bed.", completed: false },
// ];

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || []; 

function App() {

  const [todos, setTodos] = useState(initialStateTodos);
  const [filter, setFilter] = useState("all")

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    }

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const computedItemsLeft = todos.filter((todo) => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  };

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    };
  };

  const changeFilter = (filter) => {
    setFilter(filter)
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="min-h-screen bg-contain bg-no-repeat
      bg-gray-300 dark:bg-gray-800
      bg-[url('./assets/images/bg-mobile-light.jpg')] 
      dark:bg-[url('./assets/images/bg-mobile-dark.jpg')]
      md:bg-[url('./assets/images/bg-desktop-light.jpg')] 
      md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]
      ">
        <Header />

        <main className="container mx-auto md:max-w-xl mt-8 px-4">
          <TodoCreate
            createTodo={createTodo}
          />

          <TodoList
            todos={filteredTodos()}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />

          <TodoComputed
            computedItemsLeft={computedItemsLeft}
            clearCompleted={clearCompleted}
          />

          <TodoFilter
            changeFilter={changeFilter}
            filter={filter}
          />
        </main>

        <footer className=" mt-8 text-center dark:text-gray-200">
          Drag Completed
        </footer>
      </div>
    </>
  );
};

export default App;
