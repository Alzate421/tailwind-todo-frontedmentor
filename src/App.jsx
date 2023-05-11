import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useEffect, useState } from "react"
import Header from "./components/Header"
import TodoComputed from "./components/TodoComputed"
import TodoCreate from "./components/TodoCreate"
import TodoFilter from "./components/TodoFilter"
import TodoList from "./components/TodoList"

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

  const handleDragEnd = (result) => {
    // console.log(result);
    if (!result.destination) return;

    console.log("origen: ", result.source.index);
    console.log("fin: ", result.destination.index);

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const items = [...todos];
    // con splice estamos eliminando un elemento del array y devolviendo ese elemento
    const [reorderedItem] = items.splice(startIndex, 1);

    // con splice estamos insertando un elemento en el array
    items.splice(endIndex, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <>
      <div className="min-h-screen bg-contain bg-no-repeat
      bg-gray-300 dark:bg-gray-800
      bg-[url('./assets/images/bg-mobile-light.jpg')] 
      dark:bg-[url('./assets/images/bg-mobile-dark.jpg')]
      md:bg-[url('./assets/images/bg-desktop-light.jpg')] 
      md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]
      transition-all duration-1000">
        <Header />

        <main className="container mx-auto md:max-w-xl mt-8 px-4">
          <TodoCreate
            createTodo={createTodo}
          />

          <DragDropContext onDragEnd={handleDragEnd}>
            <TodoList
              todos={filteredTodos()}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </DragDropContext>

          <TodoComputed
            computedItemsLeft={computedItemsLeft}
            clearCompleted={clearCompleted}
          />

          <TodoFilter
            changeFilter={changeFilter}
            filter={filter}
          />
        </main>

        <footer className=" mt-8 text-center dark:text-gray-200 transition-all duration-1000">
          Drag Completed
        </footer>
      </div>
    </>
  );
};

export default App;
