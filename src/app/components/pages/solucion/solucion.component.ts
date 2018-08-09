import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-solucion',
  templateUrl: './solucion.component.html',
  styleUrls: ['./solucion.component.scss']
})
export class SolucionComponent implements OnInit {

  constructor() { }
  barra:number = 0; 
  like: number = 0;
  no_like: number = 0;
  valor;
  ngOnInit() {
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
    if(valor == 1){
      this.like = this.like + 1;
      var resultado = this.like + this.no_like;
      this.barra = this.like / resultado * 100;
      return;
    }else{
      if(valor == 2){
        this.no_like = this.no_like + 1;
      var resultado = this.like + this.no_like;
      this.barra = this.no_like / resultado * 100;
      
      }
    }

      var resultado = this.like + this.no_like;
      this.barra = this.no_like / resultado * 100;



      var resultado = this.like + this.no_like;
      this.barra = this.like / resultado * 100;


    
  }



}
