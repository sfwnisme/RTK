// add imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../api/apiSlice'
import { nanoid } from '@reduxjs/toolkit'

const TodoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const [todoId, setTodoId] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        //addTodo
        addTodo({ id: nanoid, title: newTodo, completed: false })
        setNewTodo('')
    }

    const handleDeleting = (e, todo) => {
        deleteTodo(todo)
        console.log(e)
        setTodoId(todo.id)
    }
    const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery()
    const [addTodo, { isLoading: isAdding }] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation()

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">{
                isAdding ? <FontAwesomeIcon icon={faCloudArrowUp} style={{ color: "#d6f0db", }} /> :
                    <FontAwesomeIcon icon={faUpload} />
            }
            </button>
        </form>


    let content;

    // Define conditional content
    if (isLoading) {
        content = <mark>Loading...</mark>
    } else if (isSuccess) {
        content = todos.map((todo) => (
            <article key={todo?.id} id={todo?.id}>
                <input type='checkbox' onChange={() => updateTodo({ ...todo, completed: !todo?.completed })} checked={todo?.completed} id={todo?.id} />
                <label htmlFor={todo?.id} >{todo?.title}</label>
                <button id={todo.id} style={{ minWidth: '81.16px' }} onClick={(e) => handleDeleting(e, todo)}>{isDeleting && todoId == todo.id ? 'loading...' : 'delete'}</button>
            </article>
        ))
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default TodoList