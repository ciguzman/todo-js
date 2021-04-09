import { Todo } from "../classes";
import { todoList } from "../index";


// Referencias en el HTML (apuntadores para manejarlos)
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro'); // todos, pendientes, completados (btn abajo)
const todoCount = document.querySelector('.todo-count');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    //(div para poder poner el li en html)
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    //firstEC para que no inserte el div creado, si no su contenido(<li>)
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

// Eventos
// Estara escuchando cuando precione tecla, event dice cual tecla fue
txtInput.addEventListener('keyup', (event) => {

    if( event.keyCode === 13 && txtInput.value.length > 0){
        console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        console.log(todoList);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click', (event) => {
    //que parte del <li> hice click, (boton, input)
    const nombreElemento = event.target.localName;
    //dos parentEle para poder llegar(obtener) al li que es todo lo que se tiene que eliminar
    const todoElemento = event.target.parentElement.parentElement;
    //<li> tiene un data-id, lo recuperamos (el valor)
    const todoId = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ){ //click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if( nombreElemento.includes('button')){ // hay que borrar el todo  (btn tachita)
        todoList.eliminarTodo(todoId);
        //elimina el hijo que coicida con el elemento
        divTodoList.removeChild(todoElemento);
    }

})

//no ponemos el event porque no lo ocupamos
btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    // vamos a eliminar de abajo hacia arriba para que los de arriba no les cambie el id
    // por eso empezas ahi el i
    for(let i = divTodoList.children.length-1; i >= 0 ; i--){
        //consigue el elemento <li>
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){ //si contiene la clase completed
            divTodoList.removeChild(elemento);
        }
    }
})

ulFiltors.addEventListener('click', (event) =>{
    let numPendietes = 0;
    const filtro = event.target.text; //completado o pendiente
    if( !filtro ){ return; } //click en medio donde no hay texto

    anchorFiltros.forEach(elem => elem.classList.remove('selected')); //quitamos a todos los botoncillos de abajo la seleccion
    //event.taget hace refetencia al anchor (btn de abajo) que acabo de seleccionar
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){ //recorremos todos los ulv(hijos del div)
        elemento.classList.remove('hidden'); //limpiamos removiendo a todos la clase hidden
        const completado = elemento.classList.contains('completed'); //tarea esta completada?

        switch( filtro ){

            case 'Pendientes':
                if(completado){
                    //si es el tab de pendientes y el elemento esta completado lo ocultamos
                    elemento.classList.add('hidden');
                }                
            break;
            
            case 'Completados':
                if(!completado){
                    //si el tab es de completados y el elemento no esta completado se oculta
                    elemento.classList.add('hidden');                    
                }
            break;
            
            //cuando es 'todos' no entra en nada el switch y muestra todos (cada que entra remueve primero el hidden)            
        }

        //mio
        if(!completado) numPendietes++;
    }
    todoCount.innerHTML = `<strong> ${numPendietes} </strong> pendiente(s)`;

})