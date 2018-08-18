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
      
      console.log(elMensajeEmitido)
      this.mensaje = elMensajeEmitido.mensaje.mensaje;
      this.Array_iduser = this.mensaje.likes;
      this.Array_iduserNolike = this.mensaje.no_megusta;
      
      this.cargarLikes()
      // this.cancularBarra('like')
      // this.cancularBarraNolike('no_like')
    })
   
   }
  //  cargarLikes1(){

  //   if(this.Array_iduser.length == 0 && this.Array_iduserNolike.length == 0){
  //     this.barra = 50;
  //     return;
  //   }
  //   // this.cancularBarra('like')
  //   let id = localStorage.getItem('id');
  //   for(let idLike in this.Array_iduser){
  //     if(this.Array_iduser[idLike] == id){
  //       this.like = true;
  //       console.log( 'estado like ' + this.like)
  //       this.cancularBarra('like')
  //       return
  //     }
  //   }
    
  //   // this.cancularBarraNolike('no_like')
  //   for(let idNOLike in this.Array_iduserNolike){
  //     if(this.Array_iduserNolike[idNOLike] == id){
  //       this.no_like = true;
  //       console.log( 'estado no_like ' + this.no_like)
  //       this.cancularBarraNolike('no_like')
  //       return
  //     }
  //   }

    
  // }
  
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
        console.log( 'estado like ' + this.like)
        break
      }
    }
    this.cancularBarra('like')
    
    // this.cancularBarraNolike('no_like')
    for(let idNOLike in this.Array_iduserNolike){
      if(this.Array_iduserNolike[idNOLike] == id){
        this.no_like = true;
        console.log( 'estado no_like ' + this.no_like)
        break
      }
    }
    this.cancularBarraNolike('no_like')

    
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
          setTimeout(()=>{
            console.log('entro en la condicion que existe el like en el array no like')
                this.QuitarNo_LikeEnArray()
              },3000)
          
          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          setTimeout(()=>{

            if(this.like == true && this.no_like == true){
              this.like = false;
              this.no_like = false;
              this.accion == 'like'? this.like = true: this.no_like = true;
            }

            this.en_proceso = false;
          },500)
        }),error=>{

            this.like = false;
            this.no_like = false;
            this.likes(this.accion)

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
          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          setTimeout(()=>{

      if(this.like == true && this.no_like == true){
        this.like = false;
        this.no_like = false;
        this.accion == 'like'? this.like = true: this.no_like = true;
      }      

            this.en_proceso = false;
          },500)
        }),error =>{

            this.like = false;
            this.no_like = false;
            this.likes(this.accion)

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
          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          this.GuardarNo_LikeEnArray()
          setTimeout(()=>{

      if(this.like == true && this.no_like == true){
        this.like = false;
        this.no_like = false;
        this.accion == 'like'? this.like = true: this.no_like = true;
      }
            this.en_proceso = false;

          },500)
        }),error=>{

            // let id = localStorage.getItem('id');
                while(this.Array_iduser.indexOf(id) > 0){
                  this.Array_iduser.splice(this.Array_iduser.indexOf(id),1)
                }
              
            

            this.like = false;
            this.no_like = false;
            this.likes(this.accion)

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
          
              setTimeout(()=>{
                console.log('entro en la condicion que existe el like en el array like')
                this.QuitarLikeEnArray()
              },2000)
      
          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          setTimeout(()=>{

      if(this.like == true && this.no_like == true){
        this.like = false;
        this.no_like = false;
        this.accion == 'like'? this.like = true: this.no_like = true;
      }
            this.en_proceso = false;

          },500)
        }),error=>{

            this.like = false;
            this.no_like = false;
            this.likes(this.accion)

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
          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          setTimeout(()=>{

      if(this.like == true && this.no_like == true){
        this.like = false;
        this.no_like = false;
        this.accion == 'like'? this.like = true: this.no_like = true;
      }
            this.en_proceso = false;

          },500)
        }),error =>{

            this.like = false;
            this.no_like = false;
            this.likes(this.accion)

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
          this._socketService.socket.emit('MensajeObjeto',{
            mensajeActual: resp
          })
          setTimeout(()=>{

      if(this.like == true && this.no_like == true){
        this.like = false;
        this.no_like = false;
        this.accion == 'like'? this.like = true: this.no_like = true;
      }
            this.en_proceso = false;

          },500)
          this.GuardarLikeEnArray()
        }),error =>{

            while(this.Array_iduserNolike.indexOf(id) > 0){
              this.Array_iduserNolike.splice(this.Array_iduserNolike.indexOf(id),1)
            }

            this.like = false;
            this.no_like = false;
            this.likes(this.accion)

        })
        return
      }
    }
  }



  likes(opcion:string){
    if(opcion == 'like' && !this.no_like){
        this.accion = 'like';
        this.like = !this.like;
        this.like? this.GuardarLikeEnArray() : this.QuitarLikeEnArray(); 
        // this.GuardarLikes('likes','no').subscribe()
        return
    }else if(opcion == 'no_like' && !this.like ){
        this.accion = 'no_like';
        this.no_like = !this.no_like;
        this.no_like? this.GuardarNo_LikeEnArray() : this.QuitarNo_LikeEnArray();
        // this.GuardarNo_Likes('no','no_like').subscribe()
        return
    }else{
      if(this.no_like == true){
        this.accion = 'like';
        this.QuitarNo_LikeEnArray1()
        this.no_like = false;
        this.like = true;
      }else if(this.like == true){
        this.accion = 'no_like';
        this.QuitarLikeEnArray1()
        this.like = false;
        this.no_like = true;
      }
      // this.like? this.QuitarNo_LikeEnArray1():
      // this.like = !this.like;
      // this.GuardarLikes('likes','no').subscribe()
      // this.no_like? this.QuitarLikeEnArray1(): 
      // this.no_like = !this.no_like;
      // this.GuardarNo_Likes('no','no_like').subscribe()
    }
  }




  // Identificar_lik_O_noLIke(like,no_like){
  //   if(like == 1){

  //     if(this.estado_like == 2){
  //       $('.fa-thumbs-up').css('color','gray');
  //       let id = localStorage.getItem('id')
  //       for(let idLike in this.Array_iduser){
  //         if(this.Array_iduser[idLike] == id){

  //           this.Array_iduser.splice(this.Array_iduser[idLike],1)
  //           this.mensaje.likes = this.Array_iduser;
            
  //           this.GuardarLikes('si','no').subscribe()

  //           break
  //         }
  //       }
  //       this.estado_like = 1;
  //       return
  //     }

  //     if(this.estado_nolike == 2){
  //       $('.fa-thumbs-down').css('color','gray');
  //       this.estado_nolike = 1;
  //       let id = localStorage.getItem('id');
  //       for(let idLike in this.Array_iduserNolike){
  //         if(this.Array_iduserNolike[idLike] == id){

  //           this.Array_iduserNolike.splice(this.Array_iduserNolike[idLike],1)
  //           this.mensaje.likes = this.Array_iduserNolike;
  //           console.log(this.mensaje)

  //           this.GuardarLikes('no','si').subscribe()
  //           break
  //         }
  //       }
  //       console.log('contar barra ejecutada por segunda ves')
  //     }
      
  //     setTimeout(()=>{
  //       let id = localStorage.getItem('id')
  //       this.Array_iduser.push(id)
  //       this.mensaje.likes = this.Array_iduser;
  //       this.GuardarLikes('si','no').subscribe()
        
  //         this.estado_like = 2;
  //     },200)

  //       return
  //   }else if(like == 2){

  //     if(this.estado_nolike == 2){
  //       $('.fa-thumbs-down').css('color','gray');
  //       this.estado_nolike = 1;
  //       let id = localStorage.getItem('id');
  //       for(let idLike in this.Array_iduserNolike){
  //         if(this.Array_iduserNolike[idLike] == id){

  //           this.Array_iduserNolike.splice(this.Array_iduserNolike[idLike],1)
  //           this.mensaje.likes = this.Array_iduserNolike;

  //           this.GuardarLikes('no','si').subscribe()
  //           break
  //         }
  //       }
  //       return
  //     }

  //     if(this.estado_like == 2){
  //       $('.fa-thumbs-up').css('color','gray');
  //       this.estado_like = 1;
  //       let id = localStorage.getItem('id')
  //       for(let idLike in this.Array_iduser){
  //         if(this.Array_iduser[idLike] == id){
  //           this.Array_iduser.splice(this.Array_iduser[idLike],1)
  //           this.mensaje.likes = this.Array_iduser;
  //           this.GuardarLikes('si','no').subscribe()
  //           break
  //         }
  //       }
  //     }
  //       setTimeout(()=>{
  //         let id = localStorage.getItem('id')
  //         this.Array_iduserNolike.push(id)
  //         this.mensaje.no_megusta = this.Array_iduserNolike;
  //         this.GuardarLikes('no','si').subscribe()
  //         this.estado_nolike = 2;
  //       },200)
  //       return
  //   }


  // }

  BucarMensajes(busqueda:string){
    let url = URL_SERVICIOS + 'mensajes/buscar/' + busqueda;

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
        console.log(resp)
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
