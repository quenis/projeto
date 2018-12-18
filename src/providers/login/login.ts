import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginProvider {
  constructor(public http: Http) {
    console.log('Hello AuthenticateProvider Provider');
  }

  /**
   * Store user on local storage.
   * 
   * @param usuario User.
   */
  private setAuthenticatedUser(usuario: any) {
    if (usuario != null) {
      localStorage.setItem('usuarioLogado', 'true');
      localStorage.setItem('id', usuario.id);
      localStorage.setItem('nome', usuario.nome);
      localStorage.setItem('cpf', usuario.cpf);
    }
  }

  /**
   * Get user from local storage.
   * 
   * @return User.
   */
  public getAuthenticatedUser(): any {
    let usuario: any;
    if (localStorage.getItem('usuarioLogado')) {
      usuario = {
        id: localStorage.getItem('id'),
        nome: localStorage.getItem('nome'),
        cpf: localStorage.getItem('cpf')
      }
    }
    return usuario;
  }

  /**
   * Remove user from local storage.
   */
  public clearAuthenticatedUser(): void {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('id');
    localStorage.removeItem('nome');
    localStorage.removeItem('cpf');
  }

  /**
   * Perform authentication using credentials.
   * 
   * @param cpf Username.
   * @param senha Password.
   */
  public autenticarUsuario(cpf: string, senha: string) {

    // Creates Observable.
    return Observable.create(observer => {
      // Perform server request to validate user credentials.

      if(cpf === '123') {
        let usuario: any = {
          id: '1',
          nome: 'Quênis Chagas de Lima',
          cpf: '036.621.501-90'
        }

        this.setAuthenticatedUser(usuario);
        observer.next();
        observer.complete();
      } else if(cpf === '1234'){
        let usuario: any = {
          id: '1',
          nome: 'Centro de Seleção',
          cpf: '546.551.723-07'
        }

        this.setAuthenticatedUser(usuario);
        observer.next();
        observer.complete();
      }          
    });
  }
}
