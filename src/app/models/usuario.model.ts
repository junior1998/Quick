export class Usuario {
    constructor(
        public nombre: string,
        public correo: string,
        public usuario: string,
        public password: string,
        public google?: string,
        public imagen?: string,
        public estado?: string,
        public _id?: string,
        public token?: string
    ){
       
    }
}