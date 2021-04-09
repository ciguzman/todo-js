import './styles.css'

import { Todo, TodoList} from './classes'; //busca por defecto el index.js
import { crearTodoHtml } from './js/componentes';

//export para usarlo en otro archivo (componentes)
export const todoList = new TodoList();
// const tarea = new Todo('Aprender JS!');
// todoList.nuevoTodo(tarea);
// crearTodoHtml(tarea);

// no se puede guardar nada que no se string
// localStorage.setItem('mi-key','ABC123');
// setTimeout( () =>{
//     localStorage.removeItem('mi-key');
// }, 1500);


// mandamos  crear el html por cada todo
// todoList.todos.forEach(todo => crearTodoHtml ( todo ) );
todoList.todos.forEach( crearTodoHtml ); //cuando el argumento es el UNICO se puede obviar

console.log('todos', todoList.todos);

//ya se puede llamar a instancias despues de fromJson de todo.class
todoList.todos[0].imprimirClase();


