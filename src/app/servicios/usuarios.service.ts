import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  UsuarioObjeto:any = {
    "correo":"",
    "usuario":"",
    "password":"",
    "google":"no google",
    "imagen":"nada",
    
  }

  UsuarioContra:any = {
    "password":"",
    "password1":""
  }

  login:any = {
    "usuario":"",
    "password":"",
    "sesiones":""
  }

  usuarioIniciado:any;
  
  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }

  CargarUsuarioID(){
    let id = localStorage.getItem('id');
    let url = 'http://localhost:3000/usuarios/usuario/' + id;
    return this._http.get(url).pipe(map((resp:any)=>{
      return resp.usuario
    }))

  }

  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  estaLogeado(){
    let token = localStorage.getItem('token');
    console.log(token)
    if(token == null || token == ''){
      this.router.navigate(['/login']);

    }else{

      return (token.length > 5) ? true : false;
    }

  }

  ConfirmarContrase(){
    if(this.UsuarioContra.password === this.UsuarioContra.password1){
      this.UsuarioObjeto.password = this.UsuarioContra.password;

      return "La contraseña son iguales";
    }else{
      return "La contraseña no son iguales";
    }
  }

  CrearUsuario(){
    let url = 'http://localhost:3000/usuarios';
   return this._http.post(url,this.UsuarioObjeto).pipe(map((resp:any)=>{
     return resp.usuarios;
   }))
  }

  EditarUsuario(){
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token')

    let url = 'http://localhost:3000/usuarios/' + id + '?token=' + token;

    return this._http.put(url,this.UsuarioObjeto).pipe(map((resp:any)=>{
      return resp.usuario;
    }))

  }

  Iniciar(){
    let url = 'http://localhost:3000/usuarios/login';
    return this._http.post(url,this.login).pipe(map((resp:any)=>{
      console.log(resp)
        localStorage.setItem('id', resp.usuario_id)
        localStorage.setItem('token', resp.token)
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));

      return true;
    }))

  }

  loginGoogle(token:string){
    let url = 'http://localhost:3000/usuarios/google';

    return this._http.post(url,{token})
               .pipe(map((resp:any)=>{
                localStorage.setItem('id', resp.usuario_id);
                localStorage.setItem('token', resp.token);
                localStorage.setItem('usuario', JSON.stringify(resp.usuario));
                return true;
        
               }))




  }

  renuevaToken(){
    let token =  localStorage.getItem('token')
    let url = 'http://localhost:3000/usuarios/renuevatoken?token=' + token;
    return this._http.get(url).pipe(map((resp:any)=>{
      token = resp.token;
      localStorage.setItem('token', token)
      console.log("se renovo el token")
      return true; 
      }))
  }

  expirado( fechaExp:number ){
    let hora = new Date().getTime() / 1000;

    if ( fechaExp < hora ){
      return true;
    }else{
      return false;
    }
  }

  VericaRenueva(fechaExp:number){
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000 ));

      // console.log(tokenExp);
      // console.log(ahora);

      if( tokenExp.getTime() > ahora.getTime() ){
        console.log("Todavia no se vence")
      }else{
        console.log("Token vencido")

        let valor_token =  localStorage.getItem('role_token');

        if(valor_token == 'activado'){

          this.renuevaToken()
              .subscribe( ()=>{
                console.log("Token renovado")
  
              }, () => {
                console.log("No se pudo renovar el token")
  
                this.router.navigate(['/login']);
  
              })
        }else{
          this.router.navigate(['/login']);
        }



      }
         
  }

}
