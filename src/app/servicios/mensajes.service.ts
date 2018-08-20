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
  Array_iduser1:any[]=[]
  Array_iduserNolike1:any[]=[]

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
  en_proceso: boolean = false;
  ventana_ancho:number;
  ventana_alto:number;
  
  constructor(
    public _Http:HttpClient,
    public _socketService:SocketService
  ) {

    $(document).ready(()=>{
      this.ventana_ancho = $(window).width();
      this.ventana_alto = $(window).height();
    });

    
    this._socketService.socket.on('mensajesEmitido',(elMensajeEmitido)=>{
      // this.mensajes = []
      this.mensajes = elMensajeEmitido.mensaje;
      // console.log(this.mensaje)
      // this.confirmarLikes(this.mensaje._id).subscribe()
    })

    this._socketService.socket.on('mensajesObjetoEmitido',(elMensajeEmitido)=>{
      if(this.en_proceso == false && this.ventana_ancho >= 770){
        this.mensaje = elMensajeEmitido.mensaje.mensaje;
        this.Array_iduser = this.mensaje.likes;
        this.Array_iduserNolike = this.mensaje.no_megusta;
        this.cargarLikes1()
      }
      // this.cancularBarra('like')
      // this.cancularBarraNolike('no_like')
    })
   
   }

   

   continuasocket(){
     this.en_proceso = false;
     this.TraerMensaje(this.id_mensaje).subscribe((resp:any)=>{
      this.mensaje = resp;
      this.Array_iduser = this.mensaje.likes;
      this.Array_iduserNolike = this.mensaje.no_megusta;
      this.cargarLikes1()
     })

   }



   cargarLikes1(){
     
     if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
       this.barra = 50;
       return;
      }
      
      
      // this.cancularBarra('like')
      let id = localStorage.getItem('id');
      for(let idLike in this.Array_iduser){
        if(this.Array_iduser[idLike] == id){
          this.like = true;
          break
        }
      }
      this.cancularBarra('like')
    
    // this.cancularBarraNolike('no_like')
    for(let idNOLike in this.Array_iduserNolike){
      if(this.Array_iduserNolike[idNOLike] == id){
        this.no_like = true;
        break
      }
    }
    this.cancularBarraNolike('no_like')

    
  }
  
  cargarLikes(){
    if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
      this.barra = 50;
      return;
    }
    // this.cancularBarra('like')
    let id = localStorage.getItem('id');
    for(let idLike in this.Array_iduser){
      if(this.Array_iduser[idLike] == id){
        this.like = true;
        this.cancularBarra('like')
        return
      }
    }
    
    // this.cancularBarraNolike('no_like')
    for(let idNOLike in this.Array_iduserNolike){
      if(this.Array_iduserNolike[idNOLike] == id){
        this.no_like = true;
        this.cancularBarraNolike('no_like')
        return
      }
    }

    
  }
  
  cancularBarra(like:string){
    if(like == 'like'){
      this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
      this.barra = this.Array_iduser.length / this.resultado  * 100;
      if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
        this.barra = 50;
      }
    }
  }

  cancularBarraNolike(like:string){
    if(this.Array_iduserNolike.length == 0){
      return;
    }
    if(like == 'no_like'){
      this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
      this.barra = this.Array_iduserNolike.length / this.resultado  * 100;
      if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
        this.barra = 50;
      }else if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length >= 1){
        this.barra = 0;
      }
    }
  }


  GuardarLikes(like:string,no_like:string){
    let url = URL_SERVICIOS + 'mensajes/likes/'+ like + '/' + no_like + '/' + this.mensaje._id;
    return this._Http.put(url,this.Array_iduser).pipe(map((resp:any)=>{
      return resp;
      
    }))
  }

  GuardarNo_Likes(like:string,no_like:string){
    let url = URL_SERVICIOS  + 'mensajes/likes/'+ like + '/' + no_like + '/' + this.mensaje._id;
    return this._Http.put(url,this.Array_iduserNolike).pipe(map((resp:any)=>{
      return resp;
    }))
  }

  GuardarLikeEnArray(){
    let id = localStorage.getItem('id')
    if(this.Array_iduser.indexOf(id) > 0){
      return;
    }
    this.Array_iduser.push(id)
    for(let idCli in this.Array_iduser){
      if(this.Array_iduser[idCli] == id){
        // this.GuardarLikes('likes','no').subscribe()
        this.GuardarLikes('likes','no').subscribe(((resp:any)=>{
          this.cargarLikes1()

          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          
        }),error=>{

        })
        return
      }
    }
  }

  QuitarLikeEnArray(){
    let id = localStorage.getItem('id')
    for(let idCli in this.Array_iduser){
      if(this.Array_iduser[idCli] == id){
        
        this.Array_iduser.splice(parseInt(idCli),1)
        this.GuardarLikes('likes','no').subscribe(((resp:any)=>{
          this.cargarLikes1()
          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
        }),error =>{

        })
        return
      }
    }
  }

  QuitarLikeEnArray1(){
    let id = localStorage.getItem('id')
    
    for(let idCli in this.Array_iduser){
      if(this.Array_iduser[idCli] == id){
        this.Array_iduser.splice(parseInt(idCli),1)
        // this.no_like = !this.like;
        // this.no_like? this.like = false: this.like = true;
        this.GuardarLikes('likes','no').subscribe(((resp:any)=>{
          this.cargarLikes1()

          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          this.GuardarNo_LikeEnArray()
        }),error=>{

           
        })
        return
      }
    }
  }

  GuardarNo_LikeEnArray(){
    let id = localStorage.getItem('id')
    if(this.Array_iduserNolike.indexOf(id) > 0){
      return;
    }
    this.Array_iduserNolike.push(id)
    for(let idCli in this.Array_iduserNolike){
      if(this.Array_iduserNolike[idCli] == id){

        this.GuardarNo_Likes('no','no_like').subscribe(((resp:any)=>{
          this.cargarLikes1()

          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
        }),error=>{

            
        })
        return
      }
    }
  }

  QuitarNo_LikeEnArray(){
    let id = localStorage.getItem('id')
    for(let idCli in this.Array_iduserNolike){
      if(this.Array_iduserNolike[idCli] == id){
        this.Array_iduserNolike.splice(parseInt(idCli),1)
        this.GuardarNo_Likes('no','no_like').subscribe(((resp:any)=>{
          this.cargarLikes1()

          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
        }),error =>{

           

        })
        return
      }
    }
  }

  QuitarNo_LikeEnArray1(){
    
    let id = localStorage.getItem('id')
    for(let idCli in this.Array_iduserNolike){
      if(this.Array_iduserNolike[idCli] == id){
        this.Array_iduserNolike.splice(parseInt(idCli),1)
        // this.like = !this.no_like;
        // this.like? this.no_like = false: this.no_like = true;
        this.GuardarNo_Likes('no','no_like').subscribe(((resp:any)=>{
          this.cargarLikes1()

          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          this.GuardarLikeEnArray()
        }),error =>{

        })
        return
      }
    }
  }



  likes(opcion:string){
    if(opcion == 'like' && !this.no_like){
        this.like = !this.like;
        this.like? this.GuardarLikeEnArray() : this.QuitarLikeEnArray(); 
        return
    }else if(opcion == 'no_like' && !this.like ){
        this.no_like = !this.no_like;
        this.no_like? this.GuardarNo_LikeEnArray() : this.QuitarNo_LikeEnArray();
        return
    }else{
      if(this.no_like == true){
        this.QuitarNo_LikeEnArray1()
        this.no_like = false;
        this.like = true;
      }else if(this.like == true){
        this.QuitarLikeEnArray1()
        this.like = false;
        this.no_like = true;
      }
      
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
        this._socketService.socket.emit('mensajeDB',{
          mensajeActual: resp
        })
        setTimeout(()=>{
          this.en_proceso = false;
        },500)
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
        this._socketService.socket.emit('mensajeDB',{
          mensajeActual: resp
        })
        setTimeout(()=>{
          this.en_proceso = false;
        },500)
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
            this._socketService.socket.emit('mensajeDB',{
              mensajeActual: resp
            })
            setTimeout(()=>{
              this.en_proceso = false;
            },500)
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
