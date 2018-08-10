import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, id: string): any {

    let url = "http://localhost:3000/" + 'usuarios/';

    if(!imagen){
      return url + 'xxxxx';
    }

    let urlFinal = url + imagen;
    return urlFinal;
  }


}
