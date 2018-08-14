import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../../../servicios/mensajes.service';
import { map } from 'rxjs/operators';

declare var $;
@Component({
  selector: 'app-solucion',
  templateUrl: './solucion.component.html',
  styleUrls: ['./solucion.component.scss']
})
export class SolucionComponent implements OnInit {

  constructor(
    public  activatedRoute:ActivatedRoute,
    public _mensajesService:MensajesService
  ) {
    activatedRoute.params
    .subscribe( params => {
      this.id = params['id']
      // console.log(this.id)
    })
   }


  barra:number = 0; 
  like: number = 0;
  no_like: number = 0;
  valor;
  id;
  estado_like:number = 1;
  estado_nolike:number = 1;
  resultado:number = 0;
  ngOnInit() {
    this._mensajesService.TraerMensaje(this.id).subscribe((resp:any)=>{
      this._mensajesService.mensaje = resp;

      // this._mensajesService.Array_iduser = this._mensajesService.mensaje.likes;
      // this.cargar_like()
      this._mensajesService.confirmarLikes(this.id).subscribe((resp:any)=>{
        if(resp == 'arraylike' ){
          this.cargar_like()
          $('.fa-thumbs-up').css('color','#007bff')  
          this.estado_like = 2;
        }else{
          if(resp == 'arraynolike'){
            this.cargar_like()
          $('.fa-thumbs-down').css('color','#007bff')  
          this.estado_nolike = 2;
          }
        }

        if(resp == undefined){
          this.cargar_like()
          return;
        }
                  
      })
    })

   
    

    $("#buscar_solucion1").keyup(()=>{
      if($("#buscar_solucion1").val().length >= 1){
        $(".content_bottom_solucion").css("opacity","0");
        $(".content_bottom_buscar_solucion").css("opacity","10");

        setTimeout(function(){
          $(".content_bottom_solucion").css("display","none");
        $(".content_bottom_buscar_solucion").css("display","flex");
        }, 300)

        
      }else{
        if($("#buscar_solucion1").val().length <= 0){
          $(".content_bottom_solucion").css("opacity","10");
          $(".content_bottom_buscar_solucion").css("opacity","0");

          setTimeout(function(){
            $(".content_bottom_buscar_solucion").css("display","none");
            $(".content_bottom_solucion").css("display","flex");
          }, 300)


        }
      }
    })

    this.likes(0)
    $(document).ready(()=>{

      $('#problema_ver').click(function() {
        if ( $("#problema_ver").val() ) {
          $("#label_problema_ver").addClass("label_active");
        }
      });
      $('#problema_ver').focus(function(){
        $("#label_problema_ver").addClass("label_active");
        $("#label_problema_ver").css("color","#0275d8");
        // $("#problema").css("border","2px solid #457eac");
        


      });
      $('#problema_ver').blur(function(){
        if(this.value.length <= 0){
          $("#label_problema_ver").removeClass("label_active");
          $("#label_problema_ver").css("color","#999999");
          // $("#problema").css("border","2px solid #999999");

        }else{
          
          $("#label_problema_ver").css("color","#40af2d");
          // $("#problema").css("border","2px solid #40af2d");

        }
      });
    })
  }

  likes(valor){
    if(valor == 1 && this.estado_like == 1){
      this.like = this.like + 1;
       this.resultado = this.like + this.no_like;
      this.barra = this.like / this.resultado * 100;
      console.log(this.resultado,this.barra)


      // if(this.no_like >= 1 && this.estado_nolike == 2){
      //   this.no_like = this.no_like - 1;
      //  this.resultado = this.like + this.no_like;
      // $('.fa-thumbs-down').css('color','#747474')
      // this.barra = this.like / this.resultado * 100;
      // this.estado_nolike = 1;

      // //quitar like de no like
      //   if(this.no_like <= 0){
      //     this.barra = this.no_like / this.resultado * 100;
      //   }

      //   for(let id in this._mensajesService.Array_iduserNolike){
      //     this._mensajesService.Array_iduserNolike[id]
      //     let id_user =  localStorage.getItem('id')
      //     if(this._mensajesService.Array_iduserNolike[id] == id_user){
      //       this._mensajesService.Array_iduserNolike.splice(this._mensajesService.Array_iduserNolike[id])
      //      console.log(this._mensajesService.Array_iduserNolike[id])
      //      break
      //     }
      //   }

      //   this.estado_nolike = 1;
      //   $('.fa-thumbs-down').css('color','#747474')
      //   this._mensajesService.Likes_no_likes('no','si',this.id,this.no_like,this.like,'quitar').subscribe()       
      // }

      setTimeout(()=>{
        
        this.estado_like = 2;
        $('.fa-thumbs-up').css('color','#007bff')
        this._mensajesService.Likes_no_likes('si','no',this.id,this.no_like,this.like,'poner').subscribe()
        this.cargar_like()
      },100);
      
      return;
    }else{
      if(valor == 1 && this.estado_like == 2){
        this.like = this.like - 1;
         this.resultado = this.like + this.no_like;
         this.barra = this.like / this.resultado * 100;

         if(this.barra == NaN){
          this.barra = 0
          console.log(this.barra)
        }


        if(this.no_like <= 0){
          this.barra = this.like / this.resultado * 100;
        }


        for(let id in this._mensajesService.Array_iduser){
          this._mensajesService.Array_iduser[id]
          let id_user =  localStorage.getItem('id')
          if(this._mensajesService.Array_iduser[id] == id_user){
            this._mensajesService.Array_iduser.splice(this._mensajesService.Array_iduser[id])
           console.log(this._mensajesService.Array_iduser[id])
           break
          }
        }

       

        
        this.estado_like = 1;
        $('.fa-thumbs-up').css('color','#747474')
        this._mensajesService.Likes_no_likes('si','no',this.id,this.no_like,this.like,'quitar').subscribe()
        this.cargar_like()
        return;
      }
    }
    
    if(valor == 2 && this.estado_nolike == 1){
      this.no_like = this.no_like + 1;

      this.resultado = this.like + this.no_like;

      this.barra = this.no_like / this.resultado * 100;
        

       



      // if(this.like >= 1 && this.estado_like == 2){
      //   this.like = this.like - 1;
      // this.resultado = this.like + this.no_like;
      // this.barra = this.no_like / this.resultado * 100;

      // $('.fa-thumbs-up').css('color','#747474')
      // this.barra = this.like / this.resultado * 100;
      // this.estado_like = 1;


      // if(this.no_like <= 0){
      //   this.barra = this.like / this.resultado * 100;
      // }


      // for(let id in this._mensajesService.Array_iduser){
      //   this._mensajesService.Array_iduser[id]
      //   let id_user =  localStorage.getItem('id')
      //   if(this._mensajesService.Array_iduser[id] == id_user){
      //     this._mensajesService.Array_iduser.splice(this._mensajesService.Array_iduser[id])
      //    console.log(this._mensajesService.Array_iduser[id])
      //    break
      //   }
      // }

      // console.log(this.barra)
      // this.estado_like = 1;
      // $('.fa-thumbs-up').css('color','#747474')
      // this._mensajesService.Likes_no_likes('si','no',this.id,this.no_like,this.like,'quitar').subscribe()


      // }

      setTimeout(()=>{
        this.estado_nolike = 2;
        $('.fa-thumbs-down').css('color','#007bff')
        this._mensajesService.Likes_no_likes('no','si',this.id,this.no_like,this.like,'poner').subscribe()
        // this.cargar_like()
      },100);
      
      return;
    }else{
      if(valor == 2 && this.estado_nolike == 2){
        this.no_like = this.no_like - 1;
        this.resultado = this.like + this.no_like;
        console.log(this.like,this.no_like)

        console.log(this.resultado)

        this.barra = this.no_like / this.resultado * 100;
        console.log(this.barra)

        if(this.barra == NaN){
          this.barra = 0;
          console.log(this.barra)
        }

        if(this.no_like <= 0){
          this.barra = this.no_like / this.resultado * 100;
        }

        for(let id in this._mensajesService.Array_iduserNolike){
          this._mensajesService.Array_iduserNolike[id]
          let id_user =  localStorage.getItem('id')
          if(this._mensajesService.Array_iduserNolike[id] == id_user){
            this._mensajesService.Array_iduserNolike.splice(this._mensajesService.Array_iduserNolike[id])
           break
          }
        }

        this.estado_nolike = 1;
        $('.fa-thumbs-down').css('color','#747474')
        this._mensajesService.Likes_no_likes('no','si',this.id,this.no_like,this.like,'quitar').subscribe()
        // this.cargar_like()
        return;
      }
    }
    

      // this.resultado = this.like + this.no_like;
      // this.barra = this.no_like / this.resultado * 100;



      // var resultado = this.like + this.no_like;
      // this.barra = this.like / this.resultado * 100;

      // console.log(this.resultado, this.barra)

    
  }

  cargar_like(){
    this.like = this._mensajesService.mensaje.like;
    this.no_like = this._mensajesService.mensaje.no_like;

    // if(this.like == null){
    //   this.like = 0;
    // }else{
    //   if(this.no_like == undefined){
    //     this.no_like = 0;
    //   }
    // }

    

    this.resultado = this.like + this.no_like;
    this.barra = this.like / this.resultado * 100;
    if(this.barra == 0){
      this.barra = 0
      // console.log(this.barra)
    }
    this.barra = this.no_like / this.resultado * 100;

    console.log(this.barra)
  }



}
