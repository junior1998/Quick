import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  mensaje:any = {
    "nombre_error":"",
    "tipo_error":"",
    "solucion":"",
    "hecho_usuario":""
  }
  constructor(
    public _Http:HttpClient
  ) { }

  CrearMensaje(){

    let token = localStorage.getItem('token')
    
    let id = localStorage.getItem('id')
    let url = 'http://localhost:3000/usuarios/mensaje/' + id + '/' + '?token=' + token;
    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
      return resp.mensaje;
    }))
  }

  traerTodosLosMensajes(){
    let url = 'http://localhost:3000/usuarios';
    return this._Http.get(url).pipe(map((resp:any)=>{
      console.log(resp)
    })) 
  }
}
