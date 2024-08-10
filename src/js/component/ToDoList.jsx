import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ToDoList() {
    const [tarea, setTarea] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    function handleInputChange(event) {
        setNuevaTarea(event.target.value);
    }

    function addTarea() {
        if (nuevaTarea.trim() !== "") {
            setTarea(t => [...t, nuevaTarea])
            setNuevaTarea("");
        }
    }

    function eliminarTarea(index) {
        const updatesTarea = tarea.filter((_, i) => i !== index);
        setTarea (updatesTarea);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            addTarea();
        }
    }

    const taskText = tarea.length === 1 ? 'tarea' : 'tareas';

    return (
        <div className="to-do-list">
            <h1>Lista de tareas</h1>

            <div>
                <input
                    type="text"
                    placeholder="Añadir tarea"
                    value={nuevaTarea}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button className='add-button'
                    onClick={addTarea}>
                    Add
                </button>
            </div>
            <ul>
                {tarea.map((tarea, index) =>
                    <li key={index}>
                        <span className='text'> {tarea} </span>
                        <button className='deleteButton' onClick={() => eliminarTarea(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                )}
            </ul>
            <p className='contador'>Tienes {tarea.length} {taskText}</p>
        </div>
    );
}

export default ToDoList;
