import { Pipe, PipeTransform } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(
    public _usuarioService:UsuariosService
  ){}

  transform(imagen: string, id: string): any {

    if(imagen.indexOf('https') >= 0){
      return imagen;
    }else{
      let url = "http://localhost:3000/" + 'usuarios/';

    if(!imagen){
      return url + 'xxxxx';
    }

    let urlFinal = url + imagen;
    return urlFinal;
    }

    
  }


}
