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
      // console.log(this.mensaje)
    })

    this._socketService.socket.on('mensajesObjetoEmitido',(elMensajeEmitido)=>{
      console.log(elMensajeEmitido.mensaje)
      this.mensaje = elMensajeEmitido.mensaje;
      this.Array_iduser = this.mensaje.likes;
      this.Array_iduserNolike = this.mensaje.no_megusta;

      this.cargarLikes()
      
      
      if(this.numero_like_viejo == this.Array_iduser.length){
        if(this.ejecutarHasta == true){

          this.TraerMensaje(this.mensaje._id).subscribe((resp:any)=>{
            console.log(resp)
            this._socketService.socket.emit('MensajeObjeto',{
              mensajeActual: resp
            })
          })
          this.ejecutarHasta = false;
        }

        return
      }else if(this.numero_nolike_viejo == this.Array_iduserNolike.length){
        if(this.ejecutarHasta == true){
          this.TraerMensaje(this.mensaje._id).subscribe((resp:any)=>{
            console.log(resp)
            this._socketService.socket.emit('MensajeObjeto',{
              mensajeActual: resp
            })
            return
          })
          this.ejecutarHasta = false;
        }
        
      }

    })
   }

   cargarLikes(){
    if(this.Array_iduser.indexOf(this.id_Usuario) >= 0){
      this.like = true;
    }else {
      this.like = false
    }
    this.CargarLikes()

    if(this.Array_iduserNolike.indexOf(this.id_Usuario) >= 0){
      this.no_like =  true;
    }else{
      this.no_like = false;
    }
    this.CargarNoLikes()

    if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
      this.barra = 50
    }

   }

   CargarLikes(){
    if(this.Array_iduserNolike.length == 0 && this.Array_iduser.length == 0){
      this.barra = 50;
      console.log('entro en cargar no likes')
      return
    }
    this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
    this.barra =  this.Array_iduser.length / this.resultado  * 100
    console.log(this.barra)
   }

   CargarNoLikes(){
    if(this.Array_iduserNolike.length == 0 && this.Array_iduser.length == 0){
      this.barra = 50;
      console.log('entro en cargar no likes')
      return
    }
    if(this.Array_iduserNolike.length >= 0 && this.Array_iduser.length <= 0){
      this.barra = 0;
      console.log('entro en cargar no likes')
      return
    }
    this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
    this.barra =   this.Array_iduserNolike.length / this.resultado * 100
    console.log(this.barra)
   }

   GuardarLike(likes:string,no_like:string,id:string){
     let id_usu = localStorage.getItem('id')
     this.mensaje.id_temp = id_usu;
    let url = URL_SERVICIOS + 'mensajes/likes' + '/' + likes + '/' + no_like + '/' + id
  
    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
       this._socketService.socket.emit('MensajeObjeto',{
          mensajeActual: resp.mensaje
        })
  
    }))
   }

   

  likes(opcion:string){
    this.ejecutarHasta = true
    if(opcion == 'like'){
      console.log(this.like)
        this.numero_like_viejo = this.Array_iduser.length;
        this.numero_nolike_viejo = this.Array_iduserNolike.length;
        this.GuardarLike('likes','no',this.mensaje._id).subscribe()
        return
    }else if(opcion == 'no_like'){
      console.log(this.like)
      this.numero_like_viejo = this.Array_iduser.length;
        this.numero_nolike_viejo = this.Array_iduserNolike.length;
      this.GuardarLike('no','no_like',this.mensaje._id).subscribe()
        return
    }
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
        // this._socketService.socket.emit('mensajeDB',{
        //   mensajeActual: resp
        // })
        
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
