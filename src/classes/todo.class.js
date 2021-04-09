
//export para usarla fuera de este archivo
export class Todo{

    //para poder recuperar las instancias perdidas por el localStorage (venian objetos pero no de todo (literales))
    //destructuracion de elementos {}
    static fromJson ({ id, tarea, completado, creado }){
        
        const tempTodo = new Todo (tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor (tarea){ 

        this.tarea = tarea;
        //en la vida real no se repetira el id
        this.id = new Date().getTime(); // 423423423 (sirve como id)(info de hora,min,seg,mil)
        this.completado = false;
        this.creado = new Date();

    }

    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}

