import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarTokenGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuariosService,
    public router: Router
  ){}
  
  canActivate(): Promise<boolean> | boolean {



    let token = localStorage.getItem('token');
    let payload = JSON.parse( atob(token.split('.')[1]));

    let expirado = this.expirado(payload.exp);

    if(expirado){
      this.router.navigate(['/login']);
      return false;
    }

    return this.VericaRenueva(payload.exp);
  }

  VericaRenueva(fechaExp:number):Promise<boolean>{
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000 ));

      // console.log(tokenExp);
      // console.log(ahora);

      if( tokenExp.getTime() > ahora.getTime() ){
        resolve(true);
      }else{
        let valor_token =  localStorage.getItem('role_token');

        if(valor_token == 'activado'){

          this._usuarioService.renuevaToken()
              .subscribe( ()=>{
                resolve(true);
              }, () => {
                reject(false);
                this.router.navigate(['/login']);
  
              })
        }

        this.router.navigate(['/login']);

      }
      
      resolve(true);

    });
  }

  expirado( fechaExp:number ){
    let hora = new Date().getTime() / 1000;

    if ( fechaExp < hora ){
      return true;
    }else{
      return false;
    }
  }
}
