import { useState } from "react"
import Header from "./components/Header"
import TodoComputed from "./components/TodoComputed"
import TodoCreate from "./components/TodoCreate"
import TodoFilter from "./components/TodoFilter"
import TodoList from "./components/TodoList"

const initialStateTodos = [
  { id: 1, title: "Go to the gym", completed: true },
  { id: 2, title: "Eat breakfast.", completed: false },
  { id: 3, title: "Exercise or do some physical activity.", completed: false },
  { id: 4, title: "Relax or do a hobby before bed.", completed: false },
];

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

  return (
    <>
      <div className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] 
      bg-contain bg-no-repeat ">
        <Header />

        <main className="container mx-auto mt-8 px-4">
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

        <footer className=" mt-8 text-center">
          Drag Completed
        </footer>
      </div>
    </>
  );
};

export default App;
