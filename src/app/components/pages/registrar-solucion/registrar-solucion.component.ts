import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../../servicios/mensajes.service';
import swal from 'sweetalert2';

declare var $;
@Component({
  selector: 'app-registrar-solucion',
  templateUrl: './registrar-solucion.component.html',
  styleUrls: ['./registrar-solucion.component.scss']
})
export class RegistrarSolucionComponent implements OnInit {

  constructor(
    public _mensaje:MensajesService
  ) { }

  estado_ventana_ = 1;

  ngOnInit() {
  this._mensaje.traerTodosLosMensajes().subscribe()



    $(document).ready(()=>{

      $('#problema').click(function() {
        if ( $("#problema").val() ) {
          $("#label_problema").addClass("label_active");
        }
      });
      $('#problema').focus(function(){
        $("#label_problema").addClass("label_active");
        $("#label_problema").css("color","#0275d8");
        // $("#problema").css("border","2px solid #457eac");
        


      });
      $('#problema').blur(function(){
        if(this.value.length <= 0){
          $("#label_problema").removeClass("label_active");
          $("#label_problema").css("color","#999999");
          // $("#problema").css("border","2px solid #999999");

        }else{
          
          $("#label_problema").css("color","#40af2d");
          // $("#problema").css("border","2px solid #40af2d");

        }
      });

      



      $('#descripcion').click(function() {
        if ( $("#descripcion").val() ) {
          $("#label_descripcion").addClass("label_active");
          
        }
      });
      $('#descripcion').focus(function(){
        $("#label_descripcion").addClass("label_active");
        $("#label_descripcion").css("color","#0275d8");
        $(".input_formulario1").css("height","150px");

        // $("#problema").css("border","2px solid #457eac");
        


      });
      $('#descripcion').blur(function(){
        if(this.value.length <= 0){
          $("#label_descripcion").removeClass("label_active");
          $("#label_descripcion").css("color","#999999");
          $(".input_formulario1").css("height","60px");
          // $("#problema").css("border","2px solid #999999");

        }else{
          
          $("#label_descripcion").css("color","#40af2d");

        }
      });



      $('#solucion').click(function() {
        if ( $("#solucion").val() ) {
          $("#label_solucion").addClass("label_active");
          
        }
      });
      $('#solucion').focus(function(){
        $("#label_solucion").addClass("label_active");
        $("#label_solucion").css("color","#0275d8");
        $(".input_formulario2").css("height","150px");

        // $("#problema").css("border","2px solid #457eac");
        


      });
      $('#solucion').blur(function(){
        if(this.value.length <= 0){
          $("#label_solucion").removeClass("label_active");
          $("#label_solucion").css("color","#999999");
          $(".input_formulario2").css("height","60px");

          // $("#problema").css("border","2px solid #999999");

        }else{
          
          $("#label_solucion").css("color","#40af2d");

        }
      });



    })





    $("#buscar_registrar").keyup(()=>{
      if($("#buscar_registrar").val().length >= 1){
        $(".resultado_en_registrar").css("opacity","0");
        $(".registrar_solucion").css("opacity","10");

        setTimeout(function(){
          $(".resultado_en_registrar").css("display","none");
        $(".registrar_solucion").css("display","flex");
        }, 300)

        
      }else{
        if($("#buscar_registrar").val().length <= 0){
          $(".resultado_en_registrar").css("opacity","10");
          $(".registrar_solucion").css("opacity","0");

          setTimeout(function(){
            $(".registrar_solucion").css("display","none");
            $(".resultado_en_registrar").css("display","flex");
          }, 300)


        }
      }
    })
  }


  abrir_pantalla(){
    if(this.estado_ventana_ == 1){
      $("#abrir_mis_solucion").addClass("fa-sign-out-alt");
      $("#abrir_mis_solucion").removeClass("fa-sign-in-alt");
      $(".resultado_en_registrar").css("margin-left","-315px");
      // $(".izquierda_content_bottom").css("opacity","0");


      this.estado_ventana_ = 2;

    }else{
      $("#abrir_mis_solucion").addClass("fa-sign-in-alt");
      $("#abrir_mis_solucion").removeClass("fa-sign-out-alt");
      $(".resultado_en_registrar").css("margin-left","0");
      // $(".izquierda_content_bottom").css("opacity","10");
      this.estado_ventana_ = 1;

    }
  }

  registrar(){
    this._mensaje.CrearMensaje().subscribe((resp:any)=>{
      swal(
        'Problema',
        'Registrado correctamente',
        'success'
      )
    })
  }


}
