import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
declare var $;

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  mensaje:any = {
    "nombre_error":"",
    "tipo_error":"",
    "solucion":"",
    "hecho_id":"",
    "hecho_objeto":""
  }
  mensajes:any[]=[]
  Resultado_busqueda:any[]=[]
  mensajeCreado:any={}
  texto_boton = 'Guardar';
  constructor(
    public _Http:HttpClient
  ) { }

  BucarMensajes(busqueda:string){
    let url = 'http://localhost:3000/mensajes/buscar/' + busqueda;

    return this._Http.get(url).pipe(map((resp:any)=>{
      this.Resultado_busqueda = resp.mensaje;
      console.log(this.Resultado_busqueda)
    }))

  }

  CrearMensaje(){

    let id = localStorage.getItem('id')
    // let token = localStorage.getItem('token')
    let id_on = localStorage.getItem('id')

    this.mensaje.hecho_id = id;
    this.mensaje.hecho_objeto = id_on;
    let url = 'http://localhost:3000/mensajes/';


    return this._Http.post(url,this.mensaje).pipe(map((resp:any)=>{
      console.log(this.mensajeCreado)
        swal(
            'Problema',
            'Registrado correctamente',
            'success'
          )
      this.mensajeCreado = resp.mensaje;
      this.mensaje = {
        "nombre_error":"",
        "tipo_error":"",
        "solucion":"",
        "hecho_id":""
      }
      setTimeout(()=>{
        
        $('#problema').blur();
        $('#descripcion').blur();
        $('#solucion').blur();

      },1000)
    }))

  }

  // AsignarMensaje(){
  //    let token = localStorage.getItem('token')
    
  //   let id = localStorage.getItem('id')
  //   this.mensaje.hecho_usuario = id
  //   this.mensajes.push(this.mensajeCreado)
  //   let url = 'http://localhost:3000/usuarios/mensaje/' + id + '/' + '?token=' + token;
  //   return this._Http.put(url,this.mensajes).pipe(map((resp:any)=>{
  //     this.mensajes = resp.usuario.mensajes;
  //     console.log(this.mensajes)

  //     // return resp.mensaje;
  //   }))
  // }

  traerTodosLosMensajes(){
    let id = localStorage.getItem('id')
    let url = 'http://localhost:3000/mensajes';
    return this._Http.get(url).pipe(map((resp:any)=>{
      this.mensajes = resp.mensaje;
      console.log(this.mensajes)
    })) 
  }

  TraerMensaje(id:string){
    let url = 'http://localhost:3000/mensajes/mensaje/' + id;
    
    return this._Http.get(url).pipe(map((resp:any)=>{
      this.mensaje = resp.mensaje;
      setTimeout(()=>{
        
        $('#problema').click();
        $('#descripcion').click();
        $('#solucion').click();

      },100)
      console.log(resp.mensaje)
    }))
  }

  TraerMensajeConId(){
    let id = localStorage.getItem('id');
    let url = 'http://localhost:3000/mensajes/' + id;
    
    return this._Http.get(url).pipe(map((resp:any)=>{
      this.mensajes = resp.mensaje;
    }))
  }


  ActualizarMensaje(){
    let url = 'http://localhost:3000/mensajes/' + this.mensaje._id;
    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
      this.traerTodosLosMensajes().subscribe()
      swal(
        'Problema',
        'Actualizado correctamente',
        'success'
      )
  this.texto_boton = 'Guardar';
  setTimeout(()=>{
    
    $('#problema').blur();
    $('#descripcion').blur();
    $('#solucion').blur();

  },1000)
      console.log(resp)
    }))
 
  }
}