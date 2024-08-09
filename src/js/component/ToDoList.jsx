import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask])
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatesTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatesTasks);
    }

    return (
        <div className="to-do-list">
            <h1>Lista de tareas</h1>

            <div>
                <input
                    type="text"
                    placeholder="Adicionar tarea"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className='Add-button'
                    onClick={addTask}>
                    Add
                </button>
            </div>
            <ul>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className='text'> {task} </span>
                        <button className='deleteButton' onClick={() => deleteTask(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ToDoList;
