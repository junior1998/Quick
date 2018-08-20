import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../components/config/config';
@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {

  constructor() { }

  

  subirArchivo( archivo: File, id: string ) {


    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            // console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            // console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };
      let token = localStorage.getItem('token');
      let url = URL_SERVICIOS + 'usuarios/imagen/' + id;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }
}
