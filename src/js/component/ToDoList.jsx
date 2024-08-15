import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ToDoList() {
    const [tarea, setTarea] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    useEffect(() => {
        getTarea();
    }, []);

    const getTarea = () => {
        console.log("Buscando mi lista de tareas");
        fetch('https://playground.4geeks.com/todo/users/amanda', {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
        })
        .catch(error => console.log("Error al cargar la lista", error));
    };

    const sincronizarTareas = (tareas) => {
        fetch('https://playground.4geeks.com/todo/users/amanda', {
            method: "PUT",
            body: JSON.stringify(tareas),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log("Tareas sincronizadas con el servidor", resp.ok);
            console.log("Estado:", resp.status);
        })
        .catch(error => {
            console.log("Error al sincronizar con el servidor", error);
        });
    };

    const agregarTareaAlServidor = (tareaNueva) => {
        fetch('https://playground.4geeks.com/todo/todos/amanda', {
            method: "POST",
            body: JSON.stringify(tareaNueva),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log("Nueva tarea añadida al servidor", resp.ok);
            console.log("Estado:", resp.status);
            if (resp.ok) {
                getTarea(); 
            }
        })
        .catch(error => {
            console.log("Error al agregar la tarea al servidor", error);
        });
    };

    function handleInputChange(event) {
        setNuevaTarea(event.target.value);
    }

    function addTarea() {
        if (nuevaTarea.trim() !== "") {
            const tareaNueva = { label: nuevaTarea, done: false };
            const nuevasTareas = [...tarea, tareaNueva];
            setTarea(nuevasTareas);
            agregarTareaAlServidor(tareaNueva);
            setNuevaTarea("");
        }
    }

    function eliminarTarea(index) {
        const tareasActualizadas = tarea.filter((_, i) => i !== index);
        setTarea(tareasActualizadas);
        sincronizarTareas(tareasActualizadas);
    }

    function limpiarTareas() {
        setTarea([]);
        sincronizarTareas([]);
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
                        <span className='text'> {tarea.label} </span>
                        <button className='deleteButton' onClick={() => eliminarTarea(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                )}
            </ul>
            <button className='clear-button' onClick={limpiarTareas}>
                Limpiar todas las tareas
            </button>
            <p className='contador'>Tienes {tarea.length} {taskText}</p>
        </div>
    );
}

export default ToDoList;
