const TodoComputed = ({ computedItemsLeft, clearCompleted }) => {
    return (
        <section className="flex justify-between py-4 px-4 bg-white rounded-b-md">
            <span className="text-gray-400">
                {computedItemsLeft}
            </span>
            <button className="text-gray-400" onClick={clearCompleted}>
                Clear Completed
            </button>
        </section>
    )
}

export default TodoComputed;