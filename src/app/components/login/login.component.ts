import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuariosService } from '../../servicios/usuarios.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var $;
declare const gapi:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth2:any;
  estado = 1;
  estado_ventana = 1;
  no_cerrar:boolean;
  estado_cerrar = 1;


  constructor(
    public UsuService: UsuariosService,
    public router:Router
  
  ) { }

  ngOnInit() {
    this.googleInit();
    $( document ).ready(() =>{
      setTimeout(function(){
        $('#nombre').trigger('click');
        $('#clave').trigger('click');
        if($("#clave").val() && $("#nombre").val() ){
        $("#label_clave").addClass("label_active");
        $("#label_nombre").addClass("label_active");
      }if($("#clave").val() ){
        $("#label_clave").addClass("label_active");
      }if($("#nombre").val() ) {
        $("#label_nombre").addClass("label_active");
      }
      }, 1000);


      // Las acciones del input nombre en el login
      
      // $('#nombre').keyup(function() {
      //  if($("#nombre").val().length > 0){
      //   $('.buttons').css("opacity","0");
      //   setTimeout(function(){
      //     $('.buttons').css("display","none")
      //   }, 1000)
      //  }else{
      //   $('.buttons').css("opacity","10");
      //   setTimeout(function(){
      //     $('.buttons').css("display","flex");
      //     $('.buttons').css("width","100%")
      //     $('.buttons').css("height","70px")
      //     $('.buttons').css("background","white")
      //   }, 500)
      //  }
      // });

      $('#nombre').click(function() {
        if ( $("#nombre").val() ) {
          $("#label_nombre").addClass("label_active");
        }
      });
      $('#nombre').focus(function(){
        $("#label_nombre").addClass("label_active");
        $(".label_active").css("color","#0275d8");
        $(this).css("border","2px solid #0275d8");

      });
      $('#nombre').blur(function(){
        if(this.value.length <= 0){
          $("#label_nombre").removeClass("label_active");
          $(".label").css("color","#aaaaaa");
          $(this).css("border","2px solid #999999");

        }else{
          $(".label_active").css("color","#0275d8");
          $(".label_active_clave").css("color","#0275d8");
          // $(".label").css("color","#0275d8");

          // $(this).css("border","2px solid #0275d8");


        }
      });
      
      // Las acciones del input contrase;a en el login

      $('#clave').click(function(){
        if($("#clave").val() ) {
          $("#label_clave").addClass("label_active_clave");

        }
      });
      $('#clave').focus(function(){
        $("#label_clave").addClass("label_active_clave");
        $(".label_active_clave").css("color","#0275d8");
        $(this).css("border","2px solid #0275d8");

      });
      $('#clave').blur(function(){
        if(this.value.length <= 0){
          $("#label_clave").removeClass("label_active_clave");
          $(".label_cla").css("color","#aaaaaa");
          $(this).css("border","2px solid #999999");

         }else{
          // $(".label_active_clave").css("color","#858484");
          $("#label_clave").addClass("label_active_clave");

          $(".label_active_clave").css("color","#0275d8");

         }
      });

      //No cerrar sesion
      
      $("#no_cerrar").click(()=>{
        if(this.estado_cerrar == 1){
          $("#no_cerrar").removeClass("fa-toggle-off");
          $("#no_cerrar").addClass("fa-toggle-on");
          this.estado_cerrar = 2;
        }else{
          $("#no_cerrar").removeClass("fa-toggle-on");
          $("#no_cerrar").addClass("fa-toggle-off");
          this.estado_cerrar = 1;
        }
      })

    

      // Jquery del formulario de registrar
  
      // Programacion del input nombre completo
      $('#nombreCom').click(function() {
        if ( $("#nombreCom").val() ) {
          $("#label_nombreCom").addClass("label_active");
        }
      });
      $('#nombreCom').focus(function(){
        $("#label_nombreCom").addClass("label_active");
        $("#label_nombreCom").css("color","#0275d8");
        $("#nombreCom").css("border","2px solid #457eac");
        


      });
      $('#nombreCom').blur(function(){
        if(this.value.length <= 0){
          $("#label_nombreCom").removeClass("label_active");
          $("#label_nombreCom").css("color","#999999");
          $("#nombreCom").css("border","2px solid #999999");

        }else{
          
          $("#label_nombreCom").css("color","#40af2d");
          $("#nombreCom").css("border","2px solid #40af2d");

        }
      });

      // Programacion del input correo
     
      $('#correo').click(function() {
        if ( $("#correo").val() ) {
          $("#label_correo").addClass("label_active");
        }
      });
      $('#correo').focus(function(){
        $("#label_correo").addClass("label_active");
        $("#label_correo").css("color","#0275d8");
        $("#correo").css("border","2px solid #457eac");

      });
      $('#correo').blur(function(){
        if(this.value.length <= 0){
          $("#label_correo").removeClass("label_active");
          $("#label_correo").css("color","#aaaaaa");
          $("#correo").css("border","2px solid #999999");

        }else{
          $("#label_correo").css("color","#40af2d");
          $("#correo").css("border","2px solid #40af2d");

        }
      });

       // Programacion del input usuario
     
       $('#usuario').click(function() {
        if ( $("#usuario").val() ) {
          $("#label_usuario").addClass("label_active");
        }
      });
      $('#usuario').focus(function(){
        $("#label_usuario").addClass("label_active");
        $("#label_usuario").css("color","#0275d8");
        $("#usuario").css("border","2px solid #457eac");

      });
      $('#usuario').blur(function(){
        if(this.value.length <= 0){
          $("#label_usuario").removeClass("label_active");
          $("#label_usuario").css("color","#aaaaaa");
          $("#usuario").css("border","2px solid #999999");

        }else{
          $("#label_usuario").css("color","#40af2d");
          $("#usuario").css("border","2px solid #40af2d");

        }
      });

       // Programacion del input contrase;a
     
       $('#contra').click(function() {
        if ( $("#contra").val() ) {
          $("#label_contra").addClass("label_active");
        }
      });
      $('#contra').focus(function(){
        $("#label_contra").addClass("label_active");
        $("#label_contra").css("color","#0275d8");
        $("#contra").css("border","2px solid #457eac");


      });
      $('#contra').blur(function(){
        if(this.value.length <= 0){
          $("#label_contra").removeClass("label_active");
          $("#label_contra").css("color","#aaaaaa");
          $("#contra").css("border","2px solid #999999");

        }else{
          $("#label_contra").css("color","#40af2d");
          $("#contra").css("border","2px solid #40af2d");

        }
      });

       // Programacion del input confirmar contrase;a
     
       $('#confir_contra').click(function() {
        if ( $("#confir_contra").val() ) {
          $("#label_confir_contra").addClass("label_active");
        }
      });
      $('#confir_contra').focus(function(){
        $("#label_confir_contra").addClass("label_active");
        $("#label_confir_contra").css("color","#0275d8");
        $("#confir_contra").css("border","2px solid #457eac");

      });
      $('#confir_contra').blur(function(){
        if(this.value.length <= 0){
          $("#label_confir_contra").removeClass("label_active");
          $("#label_confir_contra").css("color","#aaaaaa");
          $("#confir_contra").css("border","2px solid #999999");

        }else{
          $("#label_confir_contra").css("color","#40af2d");
          $("#confir_contra").css("border","2px solid #40af2d");

        }
      });



  });
  }

  CrearUsuario(){
  //  let contraConfir = this.UsuService.ConfirmarContrase()
  if(this.UsuService.UsuarioContra.password == this.UsuService.UsuarioContra.password1){
    this.UsuService.UsuarioObjeto.password = this.UsuService.UsuarioContra.password1
    console.log(this.UsuService.UsuarioObjeto)
    this.UsuService.CrearUsuario().subscribe(((resp:any)=>{
      swal(
        'Usuario: ' + resp.usuario,
        'Creado correctamente',
        'success'
      )
      // this.UsuService.UsuarioContra.password1 = "";

      setTimeout(()=>{
        
        $('input').blur();

      },1000)

     }), error=>{
      
      //  var texto = error.error.errors.message.split(":")
       console.log(error.error)
       
       swal(
        'Error',
         error.error.errors,
        
        'error'
      )
     })
    
   }else{
    swal({
      type: 'error',
      title: 'Error',
      text: 'Las contraseñas tienen que ser iguales'
      
    })
   }
   
  }

  cambiarDePantallas(valor:number){
    // Cambiar de pantallas
      
      
    if(valor == 1 && this.estado_ventana == 1){
      
        $(".registrar_pantalla").css("opacity","10");
        $(".login_pantalla").css("opacity","0");
        $(".pantallas").css("margin-left","-100%");
        $(".interior").css("height","600px");
  
        this.estado_ventana = 2;
  
     
    }else{
      if(valor == 2 && this.estado_ventana == 2){
        
          $(".registrar_pantalla").css("opacity","0");
          $(".login_pantalla").css("opacity","10");
          $(".pantallas").css("margin-left","0");
          $(".interior").css("height","500px");
    
          this.estado_ventana = 1;
       
      }
    }

  }

  login(){
    if(this.estado_cerrar == 1){
        this.UsuService.login.sesiones = "desactivado";
        this.UsuService.Iniciar().subscribe(((resp:any)=>{
          this.router.navigate(['/pages/inicio']);
          localStorage.setItem('role_token','desactivado')
          location.reload()
          this.UsuService.login.usuario = "";
          this.UsuService.login.password = "";



        }), error => {
          swal(
            'Error',
             'Error contraseña y/o usuario incorrecto',
            
            'error'
          )
        })
    }else{
      if(this.estado_cerrar == 2){
        this.UsuService.login.sesiones = "activado";
        this.UsuService.Iniciar().subscribe((resp => {
          localStorage.setItem('role_token','activado')

          this.router.navigate(['/pages/inicio']);

        }), error =>{
         
          swal(
            'Error',
             'Error contraseña y/o usuario incorrecto',
            
            'error'
          )
        })

      }
    }
    
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '203813453417-upjohav81gf30bsg8aqovr4p4t78vskq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
        // let profile = googleUser.getBasicProfile();
        let token = googleUser.getAuthResponse().id_token;

        this.UsuService.loginGoogle(token)
            .subscribe(resp => {
              this.router.navigate(['/pages/inicio']);
              location.reload()
            });

    })
  }



}
