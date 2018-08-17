import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, single } from 'rxjs/operators';
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
  Array_iduserNolike:any[]=[]

  barra:number = 0; 
  like: number = 0;
  no_like: number = 0;
  resultado:number = 0;

  estado_like:number = 1;
  estado_nolike:number = 1;
  id_mensaje:string;

  texto_boton = 'Guardar';
  constructor(
    public _Http:HttpClient,
    public _socketService:SocketService
  ) {
   
    this._socketService.socket.on('mensajesEmitido',(elMensajeEmitido)=>{
      // this.mensajes = []
      this.mensajes = elMensajeEmitido.mensaje;
      // console.log(this.mensaje)
      // this.confirmarLikes(this.mensaje._id).subscribe()
    })

    this._socketService.socket.on('mensajesObjetoEmitido',(elMensajeEmitido)=>{
      this.mensaje = elMensajeEmitido.mensaje.mensaje;
      this.Array_iduser = this.mensaje.likes;
      this.Array_iduserNolike = this.mensaje.no_megusta;
      this.cancularBarraNolike('no_like')
      this.cancularBarra('like')
    })
   }

  //  agregarLikeQuitarYmover(valor:number,accion?:string){
  //   if(valor == 1){
  //     console.log('Agregando a los likes')
  //   }else if(valor == 2){
  //     console.log('Agregando a los no like')
  //   }else if(valor == 3){

  //     if(accion == 'quitar_like'){
  //       console.log('quitando el id del usuario del ArrayLikeId')
  //     }else if(accion == 'quitar_nolike'){
  //       console.log('quitando el id del usuario del ArrayNoLikeId')
  //     }
  //   }
  //  }
  
  cargarLikes(){
    let id = localStorage.getItem('id');
    for(let idLike in this.Array_iduser){
      if(this.Array_iduser[idLike] == id){
        $('.fa-thumbs-up').css('color','red');
        this.estado_like = 2;
        this.cancularBarra('like')
        return 'like';
      }
    }

    for(let idNOLike in this.Array_iduserNolike){
      if(this.Array_iduserNolike[idNOLike] == id){
        $('.fa-thumbs-down').css('color','red');
        this.estado_nolike = 2;
        this.cancularBarraNolike('no_like')
        return 'no_like';
      }
    }

  }

  cancularBarraNolike(like:string){
    if(like == 'no_like'){
      this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
      this.barra = this.Array_iduserNolike.length / this.resultado  * 100;
      if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
        this.barra = 0;
      }
      console.log(this.resultado,this.barra)
    }
  }

  cancularBarra(like:string){
    if(like == 'like'){
      this.resultado = this.Array_iduser.length + this.Array_iduserNolike.length;
      this.barra = this.Array_iduser.length / this.resultado  * 100;
      if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
        this.barra = 0;
      }
    }
  }

  GuardarLikes(like:string,no_like){
    console.log(like,no_like)
    let url = 'http://localhost:3000/mensajes/' + this.mensaje._id;
    return this._Http.put(url,this.mensaje).pipe(map((resp:any)=>{
      if(like == 'si'){
        this._socketService.socket.emit('MensajeObjeto',{
          mensajeActual: resp
        })
      }else if(no_like == 'si'){
        this._socketService.socket.emit('MensajeObjeto',{
          mensajeActual: resp
        })
      }
    }))
  }



  Identificar_lik_O_noLIke(like,no_like){
    if(like == 1){

      if(this.estado_like == 2){
        $('.fa-thumbs-up').css('color','gray');
        let id = localStorage.getItem('id')
        for(let idLike in this.Array_iduser){
          if(this.Array_iduser[idLike] == id){

            this.Array_iduser.splice(this.Array_iduser[idLike],1)
            this.mensaje.likes = this.Array_iduser;
            
            this.GuardarLikes('si','no').subscribe()
            this.cancularBarra('like')

            break
          }
        }
        this.estado_like = 1;
        return
      }

      if(this.estado_nolike == 2){
        $('.fa-thumbs-down').css('color','gray');
        this.estado_nolike = 1;
        let id = localStorage.getItem('id');
        for(let idLike in this.Array_iduserNolike){
          if(this.Array_iduserNolike[idLike] == id){

            this.Array_iduserNolike.splice(this.Array_iduserNolike[idLike],1)
            this.mensaje.likes = this.Array_iduserNolike;
            console.log(this.mensaje)

            this.GuardarLikes('no','si').subscribe()
            this.cancularBarraNolike('no_like')
            break
          }
        }
        console.log('contar barra ejecutada por segunda ves')
      }

      setTimeout(()=>{

        let id = localStorage.getItem('id')
        this.Array_iduser.push(id)
        for(let idLike in this.Array_iduser){
          if(this.Array_iduser[idLike] == id){
              this.mensaje.likes = this.Array_iduser;
              this.GuardarLikes('si','no').subscribe()
              this.cancularBarra('like')
              $('.fa-thumbs-up').css('color','red');
              break
            }
          }
          this.estado_like = 2;
      },200)

        return
    }else if(like == 2){

      if(this.estado_nolike == 2){
        $('.fa-thumbs-down').css('color','gray');
        this.estado_nolike = 1;
        let id = localStorage.getItem('id');
        for(let idLike in this.Array_iduserNolike){
          if(this.Array_iduserNolike[idLike] == id){

            this.Array_iduserNolike.splice(this.Array_iduserNolike[idLike],1)
            this.mensaje.likes = this.Array_iduserNolike;

            this.GuardarLikes('no','si').subscribe()
            this.cancularBarraNolike('no_like')
            break
          }
        }
        return
      }

      if(this.estado_like == 2){
        $('.fa-thumbs-up').css('color','gray');
        this.estado_like = 1;
        let id = localStorage.getItem('id')
        for(let idLike in this.Array_iduser){
          if(this.Array_iduser[idLike] == id){

            this.Array_iduser.splice(this.Array_iduser[idLike],1)
            this.mensaje.likes = this.Array_iduser;
            
            this.GuardarLikes('si','no').subscribe()
            this.cancularBarra('like')

            break
          }
        }
      }
        setTimeout(()=>{

          let id = localStorage.getItem('id')
          this.Array_iduserNolike.push(id)
          for(let idLike in this.Array_iduserNolike){
            if(this.Array_iduserNolike[idLike] == id){
                this.mensaje.no_megusta = this.Array_iduserNolike;
                this.GuardarLikes('no','si').subscribe()
                this.cancularBarraNolike('no_like')
                $('.fa-thumbs-down').css('color','red');
                break
              }
            }
            this.estado_nolike = 2;
        },200)
        return
    }


    // if(like == false && this.estado_nolike == 2){
    //   $('.fa-thumbs-up').css('color','#747474');
    //   this.estado_nolike = 1;
    //   console.log(like + ' Cuando el estado del like es 2')
    //   return;
    // }else if(no_like == false &&  this.estado_like == 2){
    //   $('.fa-thumbs-down').css('color','#747474');
    //   this.estado_like = 1;
    //   console.log(no_like + ' Cuando el estado de nolike es 2')
    //   return
    // }else if(like == true){
    //   $('.fa-thumbs-up').css('color','red');
    //   this.estado_like = 2;
    //   console.log(this.estado_like)
    //   return
    // }else if(no_like == true){
    //   $('.fa-thumbs-down').css('color','red');
    //   this.estado_nolike = 2;
    //   console.log(this.estado_nolike)
    //   return
    // }else if(like == false){
    //   $('.fa-thumbs-down').css('color','#747474');
    //   this.estado_like = 1;
    //   console.log(this.estado_like)
    // }else if(no_like == false){
    //   $('.fa-thumbs-up').css('color','#747474');
    //   this.estado_nolike = 1;
    //   console.log(no_like)
    // }

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
      return resp.mensaje;
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
