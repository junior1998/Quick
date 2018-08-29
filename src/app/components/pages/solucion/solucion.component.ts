import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../../../servicios/mensajes.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


declare var $;
@Component({
  selector: 'app-solucion',
  templateUrl: './solucion.component.html',
  styleUrls: ['./solucion.component.scss']
})
export class SolucionComponent implements OnInit {
  

  constructor(
    public  activatedRoute:ActivatedRoute,
    public _mensajesService:MensajesService,
    public router:Router
  ) {
    activatedRoute.params
    .subscribe( params => {
      this.id = params['id']
      this._mensajesService.id_mensaje = this.id;
      // console.log(this.id)
    })
   }

  valor;
  id;

  ngOnInit() {

    

    // this._mensajesService.mensaje = {
    //   "nombre_error":"",
    //   "tipo_error":"",
    //   "solucion":"",
    //   "hecho_id":"",
    //   "hecho_objeto":"",
    //   "likes":""
    // }
      

    this._mensajesService.TraerMensaje(this.id).subscribe((resp:any)=>{
      this._mensajesService.mensaje = resp;
      this._mensajesService.CargarNolikeDB().subscribe()
      this._mensajesService.CargarLikeDB().subscribe()
        // this._mensajesService.Array_iduser = this._mensajesService.mensaje.likes;
        // this._mensajesService.Array_iduserNolike = this._mensajesService.mensaje.no_megusta;
        // this._mensajesService.cargarLikes()
        
    })

   
    

    

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
      })
    })
  }

  likes(opcion){
      if(this._mensajesService.proceso_like == true || this._mensajesService.proceso_nolike == true){
        this._mensajesService.likes(opcion)

      }
  }

  buscarSolucion(busqueda:string){
    this._mensajesService.BucarMensajes(busqueda).subscribe()

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
    
  }

  enviarAsolucion(id:string){
    $('#buscar_solucion1[type="text"]').val('');
    this.buscarSolucion('')
    $('#buscar_solucion1').keyup()
    this.router.navigate(['/pages/registrar-solucion'])
    this._mensajesService.TraerMensaje(this.id).subscribe((resp:any)=>{
      this.router.navigate(['/pages/solucion',id])
      this._mensajesService.mensaje = resp
      this._mensajesService.CargarNolikeDB().subscribe()
      this._mensajesService.CargarLikeDB().subscribe()
    })
    }
    goBack(){
      window.history.back();
    }
  
        


}
