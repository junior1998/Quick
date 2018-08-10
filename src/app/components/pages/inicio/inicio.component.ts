import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SocketService } from '../../../servicios/socket.service';

declare var $;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  estado_ventana = 1;
  ventana_ancho;
  ventana_alto;
  estado_ventana_resultado = 1;

  SubirImagen: File;
  texto = "Registrar datos";
  imgTemporal: string;
  google:boolean;

  constructor(
    public _UsuarioService:UsuariosService,
    public router:Router,
    public socket:SocketService
  ) { }


  ngOnInit() {

    this.socket.socket.on('usuariosEmitidos',(ElusuarioEmitido)=>{
      this._UsuarioService.UsuarioObjeto = ElusuarioEmitido.usuario
    })

    this._UsuarioService.CargarUsuarioID().subscribe((resp:any)=>{
      
      this._UsuarioService.UsuarioObjeto = resp;
      this.google = this._UsuarioService.UsuarioObjeto.google;

    })
   
  
    $(document).ready(function () {
      
      // Programacion del input nombre completo en el formulario actualizar
      $('#nombreAct').click(function() {
        if ( $("#nombreAct").val() ) {
          $("#label_nombreAct").addClass("label_active");
        }
      });
      $('#nombreAct').focus(function(){
        $("#label_nombreAct").addClass("label_active");
        $("#label_nombreAct").css("color","#0275d8");
        $("#nombreAct").css("border","2px solid #457eac");
        


      });
      $('#nombreAct').blur(function(){
        if(this.value.length <= 0){
          $("#label_nombreAct").removeClass("label_active");
          $("#label_nombreAct").css("color","#999999");
          $("#nombreAct").css("border","2px solid #999999");

        }else{
          
          $("#label_nombreAct").css("color","#40af2d");
          $("#nombreAct").css("border","2px solid #40af2d");

        }
      });



       // Programacion del input correo en el formulario actualizar
       $('#correoAct').click(function() {
        if ( $("#correoAct").val() ) {
          $("#label_correoAct").addClass("label_active");
        }
      });
      $('#correoAct').focus(function(){
        $("#label_correoAct").addClass("label_active");
        $("#label_correoAct").css("color","#0275d8");
        $("#correoAct").css("border","2px solid #457eac");
        


      });
      $('#correoAct').blur(function(){
        if(this.value.length <= 0){
          $("#label_correoAct").removeClass("label_active");
          $("#label_correoAct").css("color","#999999");
          $("#correoAct").css("border","2px solid #999999");

        }else{
          
          $("#label_correoAct").css("color","#40af2d");
          $("#correoAct").css("border","2px solid #40af2d");

        }
      });



      // Programacion del input usuario en el formulario actualizar
      $('#usuarioAct').click(function() {
        if ( $("#usuarioAct").val() ) {
          $("#label_usuarioAct").addClass("label_active");
        }
      });
      $('#usuarioAct').focus(function(){
        $("#label_usuarioAct").addClass("label_active");
        $("#label_usuarioAct").css("color","#0275d8");
        $("#usuarioAct").css("border","2px solid #457eac");
        


      });
      $('#usuarioAct').blur(function(){
        if(this.value.length <= 0){
          $("#label_usuarioAct").removeClass("label_active");
          $("#label_usuarioAct").css("color","#999999");
          $("#usuarioAct").css("border","2px solid #999999");

        }else{
          
          $("#label_usuarioAct").css("color","#40af2d");
          $("#usuarioAct").css("border","2px solid #40af2d");

        }
      });

       // Programacion del input usuario en el formulario actualizar
       $('#usuarioAct').click(function() {
        if ( $("#usuarioAct").val() ) {
          $("#label_usuarioAct").addClass("label_active");
        }
      });
      $('#usuarioAct').focus(function(){
        $("#label_usuarioAct").addClass("label_active");
        $("#label_usuarioAct").css("color","#0275d8");
        $("#usuarioAct").css("border","2px solid #457eac");
        


      });
      $('#usuarioAct').blur(function(){
        if(this.value.length <= 0){
          $("#label_usuarioAct").removeClass("label_active");
          $("#label_usuarioAct").css("color","#999999");
          $("#usuarioAct").css("border","2px solid #999999");

        }else{
          
          $("#label_usuarioAct").css("color","#40af2d");
          $("#usuarioAct").css("border","2px solid #40af2d");

        }
      });


       // Programacion del input contrase;a en el formulario actualizar
       $('#contraAct').click(function() {
        if ( $("#contraAct").val() ) {
          $("#label_contraAct").addClass("label_active");
        }
      });
      $('#contraAct').focus(function(){
        $("#label_contraAct").addClass("label_active");
        $("#label_contraAct").css("color","#0275d8");
        $("#contraAct").css("border","2px solid #457eac");
        


      });
      $('#contraAct').blur(function(){
        if(this.value.length <= 0){
          $("#label_contraAct").removeClass("label_active");
          $("#label_contraAct").css("color","#999999");
          $("#contraAct").css("border","2px solid #999999");

        }else{
          
          $("#label_contraAct  ").css("color","#40af2d");
          $("#contraAct").css("border","2px solid #40af2d");

        }
      });


      // Programacion del input confirmar contrase;a en el formulario actualizar
      $('#confir_contra_Act').click(function() {
        if ( $("#confir_contra_Act").val() ) {
          $("#label_confir_contra_Act").addClass("label_active");
        }
      });
      $('#confir_contra_Act').focus(function(){
        $("#label_confir_contra_Act").addClass("label_active");
        $("#label_confir_contra_Act").css("color","#0275d8");
        $("#confir_contra_Act").css("border","2px solid #457eac");
        


      });
      $('#confir_contra_Act').blur(function(){
        if(this.value.length <= 0){
          $("#label_confir_contra_Act").removeClass("label_active");
          $("#label_confir_contra_Act").css("color","#999999");
          $("#confir_contra_Act").css("border","2px solid #999999");

        }else{
          
          $("#label_confir_contra_Act").css("color","#40af2d");
          $("#confir_contra_Act").css("border","2px solid #40af2d");

        }
      });


    })
  
    $("#buscar").keyup(()=>{
        this._UsuarioService.renuevaToken()
    
        this.ventana_ancho = $(window).width();
        this.ventana_alto = $(window).height();
        // console.log(this.ventana_ancho);
        // console.log(this.ventana_alto);

       //Ventana mayor width a 960
      
      if( $("#buscar").val().length >= 1 && this.ventana_ancho >= 960){

        $(".interior_buscar").css("height","70px");

        $(".imagen").css("width","25%");
      $(".imagen").css("height","70px");

      $(".img").css("width","200px");
     if (this.estado_ventana_resultado == 1 ) {
      $(".img").css("opacity","0");
      $(".img").css("display","none");
     }


      // // animacion del buscador
      $(".input_buscar").css("width","50%");
      $(".input_buscar").css("height","70px");

      $(".input_bus").css("width","95%");

      $(".input_buscar").css("height","70px");


      // // animacion del boton

      $(".buttons").css("width","25%");
      $(".buttons").css("height","70px");

      if (this.estado_ventana_resultado == 1 ) {

        $(".button_nuevo").css("opacity","0");
        $(".button_nuevo").css("display","none");
      }


      //Cerrando la pantalla
      

      $(".buscador").css("height","100px");
      $(".buscador").css("width","calc(100% - 0px)");
      $(".buscador").css("top","0%");
      $(".buscador").css("left","0%");

      setTimeout(function(){
        $(".resultado").css("display","inline-block");
        $(".resultado").css("width","100%");
        $(".resultado").css("height","calc(100% - 120px)");
        $(".resultado").css("position","absolute");
        $(".resultado").css("top","80px");
        $(".buttons").css("border-bottom","none");

        
        $(".img").css("opacity","10");

        $(".button_nuevo").css("opacity","10");
        
        
        
      }, 300)
      
      setTimeout(function(){
        $(".img").css("display","flex");

        $(".button_nuevo").css("display","flex");

      }, 100)
      this.estado_ventana_resultado = 2;

       
      }else{
       if(this.ventana_ancho >= 960){
        $(".resultado").css("display","none");

        $(".buscador").css("width","80%");
        $(".buscador").css("height","240px");
        $(".buscador").css("top","calc(45% - 120px)");
        $(".buscador").css("left","calc(50% - 40%)");

        // // animacion del logo
        $(".imagen").css("width","100%");
        $(".img").css("width","350px");

        // // animacion del buscador
        $(".input_buscar").css("width","100%");
        $(".input_buscar").css("height","70px");
        $(".input_bus").css("width","80%");

        // // animacion del boton
        $(".buttons").css("width","100%");
        $(".buttons").css("height","70px");
        $(".buttons").css("border-bottom","none");


        this.estado_ventana_resultado = 1;

        return;
       }
      }

      //Ventana mayor width a 960
      if($("#buscar").val().length >= 1 && this.ventana_ancho >= 915 && this.ventana_ancho <= 960){
        
        $(".interior_buscar").css("height","60px");


        // // animacion del logo

        $(".imagen").css("width","25%");
        $(".imagen").css("height","60px");
        $(".img").css("width","180px");
        if (this.estado_ventana_resultado == 1 ) {
          $(".img").css("opacity","0");
          $(".img").css("display","none");
         }

        // // animacion del buscador
        $(".input_buscar").css("width","50%");
        $(".input_bus").css("width","95%");
        $(".input_bus").css("height","45px");

        $(".input_buscar").css("height","60px");


        // // animacion del boton
        $(".buttons").css("width","25%");
        $(".buttons").css("height","60px");

        
        if (this.estado_ventana_resultado == 1 ) {

          $(".button_nuevo").css("opacity","0");
          $(".button_nuevo").css("display","none");
        }



        $(".button_nuevo").css("height","45px");
        $(".button_nuevo").css("font-size","17px");



        //Cerrando la pantalla
        

        $(".buscador").css("height","60px");
        $(".buscador").css("width","calc(100% - 0px)");
        $(".buscador").css("top","0%");
        $(".buscador").css("left","0%");

        setTimeout(function(){
          $(".resultado").css("display","inline-block");
          $(".resultado").css("width","100%");
          $(".resultado").css("height","calc(100% - 110px)");
          $(".resultado").css("position","absolute");
          $(".resultado").css("top","75px");
          $(".img").css("opacity","10");

          $(".button_nuevo").css("opacity","10");

        }, 500)

        setTimeout(function(){
          $(".img").css("display","flex");

          $(".button_nuevo").css("display","flex");

        }, 100)
        this.estado_ventana_resultado = 2;
      }else{
        if(this.ventana_ancho <= 960 && this.ventana_ancho >= 915){
          $(".resultado").css("display","none");
  
          $(".buscador").css("width","80%");
          $(".buscador").css("height","240px");
          $(".buscador").css("top","calc(50% - 110px)");
          $(".buscador").css("left","calc(50% - 40%)");
  
          // // animacion del logo
          $(".imagen").css("width","100%");
          $(".img").css("width","350px");
  
          // // animacion del buscador
          $(".input_buscar").css("width","100%");
          $(".input_buscar").css("height","70px");
  
          // // animacion del boton
          $(".buttons").css("width","100%");
          $(".buttons").css("height","70px");
          $(".buttons").css("border-bottom","none");

          this.estado_ventana_resultado = 1;

          return;
         }
      }

       //Ventana mayor width a 0
       if($("#buscar").val().length >= 1 && this.ventana_ancho >= 0 && this.ventana_ancho <= 915){
        // // animacion del logo
        $(".imagen").css("width","100%");
        $(".imagen").css("height","65px");
        $(".img").css("width","250px");

        

        $(".input_buscar").css("height","65px");
        $(".input_bus").css("width","80%");
        $(".input_bus").css("height","50px");

       


        // // animacion del boton
        $(".buttons").css("width","100%");
        $(".buttons").css("height","65px");
        $(".buttons").css("border-bottom","1px solid rgb(211, 211, 211)");

       


        $(".button_nuevo").css("height","45px");
        $(".button_nuevo").css("font-size","17px");



        //Cerrando la pantalla
        

        $(".buscador").css("height","100px");
        $(".buscador").css("width","calc(100% - 0px)");
        $(".buscador").css("top","0%");
        $(".buscador").css("left","0%");

        setTimeout(function(){
          $(".resultado").css("display","inline-block");
          $(".resultado").css("width","100%");
          $(".resultado").css("height","calc(100% - 232px)");
          $(".resultado").css("position","absolute");
          $(".resultado").css("top","195px");

        }, 500)
      }else{
        if(this.ventana_ancho <= 915 && this.ventana_ancho >= 0){
          $(".resultado").css("display","none");
  
          $(".buscador").css("width","80%");
          $(".buscador").css("height","240px");
          $(".buscador").css("top","calc(50% - 110px)");
          $(".buscador").css("left","calc(50% - 40%)");
  
          // // animacion del logo
          $(".imagen").css("width","100%");
          $(".imagen").css("height","100px");

          $(".img").css("width","350px");
  
          // // animacion del buscador
          $(".input_buscar").css("width","100%");
          $(".input_buscar").css("height","70px");
  
          // // animacion del boton
          $(".buttons").css("width","100%");
          $(".buttons").css("height","70px");
          $(".buttons").css("border-bottom","none");

          return;
         }
      }

      
   



    })
  
  }

  abrir_pantalla(){
    if(this.estado_ventana == 1){
      $("#abrir").addClass("fa-sign-out-alt");
      $("#abrir").removeClass("fa-sign-in-alt");
      $(".general").css("margin-left","-360px");
      $(".izquierda").css("opacity","0.5");

        $('#nombreAct').click();
        $('#nombreAct').blur();

        $('#correoAct').click();
        $('#correoAct').blur();

        $('#usuarioAct').click();
        $('#usuarioAct').blur();
      


      this.estado_ventana = 2;

    }else{
      $("#abrir").addClass("fa-sign-in-alt");
      $("#abrir").removeClass("fa-sign-out-alt");
      $(".general").css("margin-left","0");
      $(".izquierda").css("opacity","10");
      this.estado_ventana = 1;

    }
  }

  probando(){
    let token = localStorage.getItem('token');
    let payload = JSON.parse( atob(token.split('.')[1]));

    let expirado = this.expirado(payload.exp);

    if(expirado){
      console.log("El token expiro")
      this.router.navigate(['/login']);
      return false;
    }

    this._UsuarioService.VericaRenueva(payload.exp);
  }

  expirado( fechaExp:number ){
    let hora = new Date().getTime() / 1000;

    if ( fechaExp < hora ){
      return true;
    }else{
      return false;
    }
  }

  salir(){
    this._UsuarioService.logout()
    
  }

  actualizarUsuario(){
    let contraConfir = this._UsuarioService.ConfirmarContrase();
    
    if(contraConfir == "La contraseña no son iguales"){
      console.log(contraConfir)

      swal({
        type: 'error',
        title: 'Error',
        text: 'Las contraseñas tienen que ser iguales'
        
      })
     }else{
       if(contraConfir == "La contraseña son iguales"){
         this._UsuarioService.EditarUsuario().subscribe(((resp:any)=>{
           this.socket.socket.emit('usuarioBD',{
             usuarioActua: resp
           })
           console.log(contraConfir)
          swal(
            'Usuario: ' + resp.usuario,
            'Actualizado correctamente',
            'success'
          )
  
          this._UsuarioService.UsuarioObjeto = "";
         
          this._UsuarioService.UsuarioContra.password1 = "";
          setTimeout(()=>{
            
            $('input').blur();
  
          },1000)
  
         }))

        
       }else{
        if(contraConfir == "esta vacio"){
          console.log(contraConfir)

          this._UsuarioService.EditarUsuario().subscribe(((resp:any)=>{
            this.socket.socket.emit('usuarioBD',{
              usuarioActua: resp
            })
            console.log(resp)
           swal(
             'Usuario: ' + resp.usuario,
             'Actualizado correctamente',
             'success'
           )

           this._UsuarioService.UsuarioObjeto = "";
           this._UsuarioService.UsuarioContra.password1 = "";
           setTimeout(()=>{
             
             $('input').blur();
    
           },1000)
    
          }))


         
        }
       }

     }
  
  }


  imagen(archivo:File){
    console.log(archivo)
    if(!archivo){
      this._UsuarioService.archivoPrinService = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0){
      this._UsuarioService.archivoPrinService = null;
      
      return;
    }

    this._UsuarioService.archivoPrinService = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {

      
      this.imgTemporal = reader.result;

      
        this._UsuarioService.EditarYSubirFoto(this._UsuarioService.archivoPrinService)
      
      
    }
  }

 

  


}
