import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SocketService } from '../../../servicios/socket.service';
import { MensajesService } from '../../../servicios/mensajes.service';

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


  constructor(
    public _UsuarioService:UsuariosService,
    public router:Router,
    public socket:SocketService,
    public _ServicioMensaje:MensajesService
  ) { }
  
  ngOnDestroy() {
    this._ServicioMensaje.Resultado_busqueda = []
  }

  ngOnInit() {

    this.socket.socket.on('usuariosEmitidos',(ElusuarioEmitido)=>{
      this._UsuarioService.UsuarioObjeto = ElusuarioEmitido.usuario
    })

    this._UsuarioService.CargarUsuarioID().subscribe((resp:any)=>{
      
      this._UsuarioService.UsuarioObjeto = resp;
      this._UsuarioService.google = this._UsuarioService.UsuarioObjeto.google;

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

    
  

        this._UsuarioService.renuevaToken()
    
        this.ventana_ancho = $(window).width();
        this.ventana_alto = $(window).height();
       

       //Ventana mayor width a 960
      

      
   




  
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
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    })

    swal({
      title: '¿Seguro que desea salir de Quick?',
      text: "Esta saliendo de Quick",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir'
    }).then((result) => {
      if (result.value) {
        this._UsuarioService.logout()
      }else if (
    // Read more about handling dismissals
    result.dismiss === swal.DismissReason.cancel
      ) {}
    })
    
  }

  actualizarUsuario(){
    let contraConfir = this._UsuarioService.ConfirmarContrase();
    
    if(contraConfir == "La contraseña no son iguales"){

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

          this._UsuarioService.EditarUsuario().subscribe(((resp:any)=>{
            this.socket.socket.emit('usuarioBD',{
              usuarioActua: resp
            })
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

  enviarAsolucion(id:string){
    this.router.navigate(['/pages/solucion',id])
    }

    buscarSolucion(busqueda:string){
      this._ServicioMensaje.BucarMensajes(busqueda).subscribe()
    }

 

  


}
