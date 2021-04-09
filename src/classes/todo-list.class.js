import { Todo } from "./todo.class";


//nombre de class en UpperCamelCase
export class TodoList {

    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push( todo );

        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        //regresar un nuevo arreglo sin el todo del id
        this.todos = this.todos.filter( todo => todo.id != id);

        this.guardarLocalStorage();

    }
    marcarCompletado( id ){

        for( const todo of this.todos){
            //nomas dos iguales porque unos es numero y otro string
            if( todo.id == id){                
                todo.completado = !todo.completado;

                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        //regresa un array con todos los todos que NO esten completados
        this.todos = this.todos.filter( todo => !todo.completado);

        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        //al tener que almacenar un string, lo convertimos con JSON.stringify para que se almacene descompuesto
        //"objeto abierto" -> toda la representacion del objeto
        localStorage.setItem('todo', JSON.stringify(this.todos));
        //al almacenar en localStorage y recuperarlo, se pierden los metodos de las instancias, por eso se hara el 
        //fronJson en el todo.class

    }
    cargarLocalStorage(){    
        
        //parse convierte y al ya saber que es un JSON solo lo indicamos
        //devolvemos el string a JSON     
        this.todos = ( localStorage.getItem('todo') ) 
                    ? JSON.parse( localStorage.getItem('todo') )
                    : [];
        
        //map permite barrer cada uno de los elementos dentro de un arreglo y retornarlo con cada uno de sus elementos mutados
        // this.todos = this.todos.map( obj => Todo.fromJson(obj))//Todo con Mayusc porque fromJson es propiedad Statica
        this.todos = this.todos.map(Todo.fromJson); //convierte todos a instancias de todo

        // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    }
}