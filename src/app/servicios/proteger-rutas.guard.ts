import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ProtegerRutasGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuariosService,
    public router: Router
  ){}
    canActivate(){
      if(this._usuarioService.estaLogeado()){
      }else{
        this.router.navigate(['/login']);
        return false;
      }
    return true;
  }
}
