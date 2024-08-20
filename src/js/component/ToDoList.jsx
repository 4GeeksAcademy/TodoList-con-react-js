/* Aqui es el codigo del la lista de tarea pero esta un poco modificado con el proyecto de la api, esta mesclado pero no terminado */

import React, { useState, useEffect } from 'react';
import Tarea from './Tarea'; 

const ToDoList = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    useEffect(() => {
        const crearUsuario = () => {
            fetch('https://playground.4geeks.com/todo/users/amanda', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([])  // Inicializa la lista de tareas con un array vacío
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Usuario creado exitosamente');
                        getTareas();  // Intenta obtener las tareas nuevamente después de crear el usuario
                    } else {
                        console.error("Error al crear el usuario");
                    }
                })
                .catch(error => {
                    console.log("Error al crear el usuario", error);
                });
        };

        const getTareas = () => {
            console.log("Buscando mi lista de tareas");
            fetch('https://playground.4geeks.com/todo/users/amanda', {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Usuario no encontrado");
                    }
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        setTareas(data); // Establece las tareas obtenidas en el estado
                    } else {
                        setTareas([]); // Asegura que tareas sea un arreglo
                    }
                })
                .catch(error => {
                    console.log("Error al cargar la lista", error);
                    crearUsuario();  // Si no se encuentra el usuario, se crea uno nuevo
                });
        };

        getTareas();  // Llama a la función para buscar la lista de tareas cuando el componente se monta

    }, []);

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
                if (resp.ok) {
                    getTareas(); // Si la tarea se añadió correctamente, vuelve a obtener la lista de tareas del servidor
                }
            })
            .catch(error => {
                console.log("Error al agregar la tarea al servidor", error);
            });
    };

    const handleInputChange = (event) => {
        setNuevaTarea(event.target.value);
    };

    const addTarea = () => {
        if (nuevaTarea.trim() !== "") {
            const tareaNueva = { label: nuevaTarea, done: false };
            const nuevasTareas = [...tareas, tareaNueva];
            setTareas(nuevasTareas);
            agregarTareaAlServidor(tareaNueva);
            setNuevaTarea("");
        }
    };

    const eliminarTarea = (index) => {
        const tareasActualizadas = tareas.filter((_, i) => i !== index);
        setTareas(tareasActualizadas);
        sincronizarTareas(tareasActualizadas);
    };

    const limpiarTareas = () => {
        setTareas([]);
        sincronizarTareas([]);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTarea();
        }
    };

    const taskText = tareas.length === 1 ? 'tarea' : 'tareas';

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
                <button className='add-button' onClick={addTarea}>
                    Add
                </button>
            </div>
            <ul>
                {tareas.map((tarea, index) => (
                    <Tarea 
                        key={index}
                        tarea={tarea}
                        tareas={tareas}
                        setTareas={setTareas}
                        eliminarTarea={eliminarTarea}
                    />
                ))}
            </ul>
            <button className='clear-button' onClick={limpiarTareas}>
                Limpiar todas las tareas
            </button>
            <p className='contador'>Tienes {tareas.length} {taskText}</p>
        </div>
    );
}

export default ToDoList;
