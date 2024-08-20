import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Tarea = ({tarea, nuevaTarea, setTarea, tareas}) => {
    const [editarTarea, setEditarTarea] = useState(false);

   const actualizandoTarea = (id, nuevoTexto) => {
        setTarea(tareas.map((tarea)=> {
                if (tarea.id===id) {
                    return {...tareas, label: nuevoTexto}
                }
                    return tarea;
                }));
            };

    function editarTareaApi(e) {
        e.preventDefault();
        fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                label: nuevaTarea,
                is_done: tarea.is_done
            }),
            headers: {
                "Content-Type": "application/json"
              }
        }) 
        .then(res => res.json())
            .then(data => actualizandoTarea(data.id, data.label))
            .catch(error => console.error("Error al cargar la lista:", error))
        
        
        setEditarTarea(false);
    }

    return (
        <div> {editarTarea === true ?
            <form className="formulario-editar-tarea" onSubmit={editarTareaApi}>
                <input
                    className="formulario-editar-tarea__input"
                    type="text"
                >
                </input>
                <button className="formulario-editar-tarea__btn">Actualizar</button>
            </form>
            :
            <span className='text'> {tarea.label} </span>
        }
            <button className='editar' onClick={() => setEditarTarea(!editarTarea)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className='deleteButton' onClick={() => eliminarTarea(index)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}

export default Tarea;