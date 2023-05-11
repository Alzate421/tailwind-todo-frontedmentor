import { useState } from "react";

const TodoCreate = ({ createTodo }) => {

    const [title, setTitle] = useState("")

    const handleSubmitTodo = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return setTitle("");
        }

        createTodo(title);
        setTitle("");
    }

    return (
        <form
            onSubmit={handleSubmitTodo}
            className="flex items-center gap-4 overflow-hidden rounded-md bg-white px-4 py-4 
            dark:bg-gray-800 transition-all duration-1000"
        >
            <span className="inline-block h-5 w-5 rounded-full border-2 "></span>
            <input
                type="text"
                placeholder="Create a new todo..."
                className="w-full outline-none text-gray-400 
                dark:bg-gray-800 transition-all duration-1000"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </form>
    );
};

export default TodoCreate;