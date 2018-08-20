import { Pipe, PipeTransform } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../components/config/config';



@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(
    public _usuarioService:UsuariosService
  ){}

  transform(imagen: string, id: string): any {

  
    if(!imagen){
      let url = URL_SERVICIOS + 'usuarios/';
      return url + 'xxxxx';
    }else if(imagen && imagen.indexOf('https') >= 0){
      return imagen;
    }else{
      let url = URL_SERVICIOS + 'usuarios/';
      let urlFinal = url + imagen;
      return urlFinal;      
    }
    
    
  }


}
