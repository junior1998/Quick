import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { SocketService } from './socket.service';

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
    "hecho_objeto":"",
    "likes":""
  }
  mensajes:any[]=[]
  Resultado_busqueda:any[]=[]
  mensajeCreado:any={}
  Array_iduser:any[]=[]
  texto_boton = 'Guardar';
  constructor(
    public _Http:HttpClient,
    public _socketService:SocketService
  ) {
    this._socketService.socket.on('mensajesEmitido',(elMensajeEmitido)=>{
      this.mensajes = []
      this.mensajes = elMensajeEmitido.mensaje;
    })
   }

   confirmarLikes(id:string){
      let url = 'http://localhost:3000/mensajes/likes/' + id ;
      let id_user = localStorage.getItem('id');


       return this._Http.get(url).pipe(map((resp:any)=>{
        console.log(resp)

        this.Array_iduser = resp.mensaje[0].likes;
        for(let id in this.Array_iduser){
          this.Array_iduser[id]
          if(this.Array_iduser[id] == id_user){
           return this.Array_iduser[id];
          }
        }
       }))
   }

   Likes_no_likes(like:string,no_like:string,id:string,no_like_envia:number,like_envia:number){
     if(like == "si"){
      console.log('entro en el si')
        let id_user = localStorage.getItem('id');
        this.Array_iduser.push(id_user);
        this.mensaje.likes = this.Array_iduser;
       let url = 'http://localhost:3000/mensajes/likes/'+  like + '/' + no_like + '/' + id;
      this.mensaje.like = like_envia;
       this.mensaje.no_like = no_like_envia;
       return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
         this.Array_iduser = resp.mensaje.likes;
         for(let id in this.Array_iduser){
           this.Array_iduser[id]
           if(this.Array_iduser[id] == id_user){
            console.log(this.Array_iduser[id])
            break
           }
         }

       }))
     }else{
       if(like == "no"){
         console.log('entro en el no')
         this.mensaje.like = like_envia;
         this.mensaje.no_like = no_like_envia;      
        let url = 'http://localhost:3000/mensajes/likes/'+  like + '/' + no_like + '/' + id;
        return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
          console.log(resp)
        }))
       }
     }

   }

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

        swal(
            'Problema',
            'Registrado correctamente',
            'success'
          )
      this.TraerMensajeConId().subscribe((resp:any)=>{
        this._socketService.socket.emit('mensajeDB',{
          mensajeActual: resp
        })
      })
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
      return resp.mensaje;
    }))
  }

  TraerMensajeConId(){
    let id = localStorage.getItem('id');
    let url = 'http://localhost:3000/mensajes/' + id;
    
    return this._Http.get(url).pipe(map((resp:any)=>{
       return resp.mensaje;
    }))
  }



  ActualizarMensaje(){
    let url = 'http://localhost:3000/mensajes/' + this.mensaje._id;
    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
      this.TraerMensajeConId().subscribe((resp:any)=>{
        console.log(resp)
        this._socketService.socket.emit('mensajeDB',{
          mensajeActual: resp
        })
      })
      
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
    }))
 
  }

  BorrarMensaje(id:string){
    let url = 'http://localhost:3000/mensajes/borrar/' + id;

    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
      console.log(resp)
      const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      })
      
      swalWithBootstrapButtons({
        title: 'Seguro que desea borrarlo?',
        text: "Si continua no podrá revertir los cambios",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          swalWithBootstrapButtons(
            'Borrado',
            'Tu solucion se ha borrado correctamente',
            'success'
          )

          this.TraerMensajeConId().subscribe((resp:any)=>{
            this._socketService.socket.emit('mensajeDB',{
              mensajeActual: resp
            })
          })
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons(
            'Cancelado',
            'Tu solucion no fue borrada',
            'error'
          )
        }
      })
      
    }))
  }
}
