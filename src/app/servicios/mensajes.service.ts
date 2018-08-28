import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, single, refCount } from 'rxjs/operators';
import swal from 'sweetalert2';
import { SocketService } from './socket.service';
import { URL_SERVICIOS } from '../components/config/config';


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

  mensaje1:any = {
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
  Array_iduserNolike:any[]=[]

  barra:number = 0; 
  like: boolean = false ;
  no_like: boolean = false;
  resultado:number = 0;

  estado_like:number = 1;
  estado_nolike:number = 1;
  id_mensaje:string;
  texto_boton = 'Guardar';
  accion:string;
  ventana_ancho:number;
  ventana_alto:number;

  numero_like:number;
  numero_like_viejo:number;
  numero_nolike:number;
  numero_nolike_viejo:number;

  ejecutarHasta:boolean = true;
  proceso_like:boolean = true;
  proceso_nolike:boolean = true;

  
  id_Usuario:string;
  constructor(
    public _Http:HttpClient,
    public _socketService:SocketService
  ) {
    
    this.id_Usuario = localStorage.getItem('id')
    $(document).ready(()=>{
      this.ventana_ancho = $(window).width();
      this.ventana_alto = $(window).height();
    });

    
    this._socketService.socket.on('mensajesEmitido',(elMensajeEmitido)=>{
      this.mensajes = elMensajeEmitido.mensaje;
    })

    this._socketService.socket.on('ArrayNOLikesEmitido',(nolikesEmitidos)=>{
      this.proceso_nolike = true
      if(this.proceso_nolike == true){
        this.CargarNolikeDB().subscribe()
      }
      
    })

    this._socketService.socket.on('ArrayLikesEmitido',(likesEmitidos)=>{
      this.proceso_like = true
        if(this.proceso_like == true){
          this.CargarLikeDB().subscribe()
        }
      
    })
   }

   

   GuardarLike(){
    this.proceso_like = false;

    let id = localStorage.getItem('id')
    let url = URL_SERVICIOS + 'likes/likes/' + this.mensaje._id + '/' + id;


    return this._Http.post(url,this.mensaje).pipe(map((resp:any)=>{
      this._socketService.socket.emit('ArrayLikes',{
        likeDB: this.mensaje._id
      })

    }))
   }

   GuardarNolike(){
    this.proceso_nolike = false;

   let id = localStorage.getItem('id')
   let url = URL_SERVICIOS + 'likes/nolikes/' + this.mensaje._id + '/' + id

   return this._Http.post(url,this.mensaje).pipe(map((resp:any)=>{
     this._socketService.socket.emit('ArrayNoLikes',{
      NolikeDB: this.mensaje._id
    })
 
   }))
   }

   

   CargarLikesBarra(){
        this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
        if(this.Array_iduserNolike.length == 0 && this.Array_iduser.length == 0){
          this.barra = 50;
          return
        }
        this.barra = this.Array_iduser.length / this.resultado * 100

   }

   CargarNolikeBarra(){
    this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
    if(this.Array_iduserNolike.length == 0 && this.Array_iduser.length == 0){
      this.barra = 50;
      return
    }
    if(this.Array_iduserNolike.length > 0 && this.Array_iduser.length <= 0){
      this.barra = 0;
      return
    }
    this.barra = this.Array_iduserNolike.length / this.resultado * 100
   }

  likes(opcion:string){
    this.ejecutarHasta = true
    if(opcion == 'like' && !this.no_like){
      this.like = !this.like
      this.GuardarLike().subscribe()
        return
    }else if(opcion == 'no_like' && !this.like){
      this.no_like = !this.no_like;
      this.GuardarNolike().subscribe()
        return
    }else{
      this.like? this.GuardarLike().subscribe()? this.GuardarNolike().subscribe() : console.log('nada') : console.log('termino') 
      this.no_like? this.GuardarNolike().subscribe()? this.GuardarLike().subscribe() : console.log('nada') : console.log('termino') 
      this.like = !this.like
      this.no_like = !this.no_like
    }
  }

  CargarLikeDB(){
    let url = URL_SERVICIOS + 'likes/likes/' + this.mensaje._id
    return this._Http.get(url).pipe(map((resp:any)=>{
      for(let like in resp.like){
        if(resp.like[like].id_usuario == this.id_Usuario){
          this.like = true
          this.no_like = false
        }
      }
      if(resp.like.length >= 1){
        this.Array_iduser.length = resp.like.length
        this.CargarLikesBarra()
        return true
      }
      this.Array_iduser.length = 0
      this.CargarNolikeBarra()
      if(this.Array_iduser.length <= 0 && this.like == true){
        this.like = false;
      }
        return true
    }))
   
  }

  CargarNolikeDB(){
    let url = URL_SERVICIOS + 'likes/nolikes/' + this.mensaje._id
    return this._Http.get(url).pipe(map((resp:any)=>{
      for(let nolike in resp.nolike){
        if(resp.nolike[nolike].id_usuario == this.id_Usuario){
          this.like = false
          this.no_like = true
        }
      }
      
      if(resp.nolike.length >= 1){
        this.Array_iduserNolike.length = resp.nolike.length
        this.CargarNolikeBarra()        
        return true
      }
      this.Array_iduserNolike.length = 0
      this.CargarLikesBarra()
      if(this.Array_iduserNolike.length <= 0 && this.no_like == true){
        this.no_like = false;
      }
       return true;
    }))
  }



  

  BucarMensajes(busqueda:string){
    let url = URL_SERVICIOS + 'mensajes/buscar/' + busqueda;

    return this._Http.get(url).pipe(map((resp:any)=>{
      this.Resultado_busqueda = resp.mensaje;
    }))

  }

  CrearMensaje(){

    let id = localStorage.getItem('id')
    let id_on = localStorage.getItem('id')

    this.mensaje.hecho_id = id;
    this.mensaje.hecho_objeto = id_on;
    let url = URL_SERVICIOS + 'mensajes/';


    return this._Http.post(url,this.mensaje).pipe(map((resp:any)=>{

        swal(
            'Problema',
            'Registrado correctamente',
            'success'
          )
      this.TraerMensajeConId().subscribe((resp:any)=>{
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

 

  traerTodosLosMensajes(){
    let id = localStorage.getItem('id')
    let url = URL_SERVICIOS + 'mensajes';
    return this._Http.get(url).pipe(map((resp:any)=>{
      return resp.mensaje;
    })) 
  }

  TraerMensaje(id:string){
    let url = URL_SERVICIOS + 'mensajes/mensaje/' + id;
    
    return this._Http.get(url).pipe(map((resp:any)=>{
      return resp.mensaje;
    }))
  }

  TraerMensajeConId(){
    let id = localStorage.getItem('id');
    let url = URL_SERVICIOS + 'mensajes/' + id;
    
    return this._Http.get(url).pipe(map((resp:any)=>{
       return resp.mensaje;
    }))
  }



  ActualizarMensaje(){
    let url = URL_SERVICIOS + 'mensajes/' + this.mensaje._id;
    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
      this.TraerMensajeConId().subscribe((resp:any)=>{
        // this._socketService.socket.emit('mensajeDB',{
        //   mensajeActual: resp
        // })
        
      })
      
      swal(
        'Problema',
        'Actualizado correctamente',
        'success'
      )
  setTimeout(()=>{
    
    $('#problema').blur();
    $('#descripcion').blur();
    $('#solucion').blur();

  },1000)
    }))
 
  }

  BorrarMensaje(id:string){
    let url = URL_SERVICIOS + 'mensajes/borrar/' + id;

    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
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
            // this._socketService.socket.emit('mensajeDB',{
            //   mensajeActual: resp
            // })
            
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
