import { MyApp } from './../../app/app.component';

import { Component } from '@angular/core';
import { NavController, 
  NavParams, 
  ToastController, 
  MenuController, 
  LoadingController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';
import { InscricoesPage } from './../inscricoes/inscricoes';


/**
 * Authenticate page.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loader;

  public usuario: any = {
    cpf: '',
    senha: ''
  };

  /**
   * Constructor.
   * 
   * @param navCtrl Navigation controller.
   * @param navParams Navigation params.
   * @param authenticateProvider Authenticate provider.
   */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authenticateProvider: LoginProvider,
    private toastCtrl: ToastController,
    private menu: MenuController,
    public loadingCtrl: LoadingController) {


  }

  abrirCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loader.present();
  }

  fecharCarregando() {
    this.loader.dismiss();
  }

  public formatarCPF(): void {
    
    if(this.usuario.cpf !== undefined
      && this.usuario.cpf !== ""){

      if(this.usuario.cpf.length == 3) 
        this.usuario.cpf = this.usuario.cpf + '.'; 
      
      if(this.usuario.cpf.length == 7) 
        this.usuario.cpf = this.usuario.cpf + '.';
      
      if(this.usuario.cpf.length == 11) 
        this.usuario.cpf = this.usuario.cpf + '-';      
    }
  }

  /**
   * Call authenticator.
   */
  public login(): void {
    
    let cpfSemCaracteresEspeciais: string = this.usuario.cpf.split('.').join('').replace('-', '');

    if ((cpfSemCaracteresEspeciais !== '123' || this.usuario.senha !== '123')
      && (cpfSemCaracteresEspeciais !== '1234' || this.usuario.senha !== '1234')) {
      let toast = this.toastCtrl.create({
        message: 'Usuário ou senha inválido.',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    } else {
      this.abrirCarregando();

      setTimeout(() => {
        this.authenticateProvider.autenticarUsuario(cpfSemCaracteresEspeciais, this.usuario.senha)
          .subscribe(
            data => {
              this.navCtrl.setRoot(InscricoesPage);
              this.navCtrl.setRoot(MyApp);
              this.navCtrl.setRoot(InscricoesPage);
              this.fecharCarregando();
            }, error => {
              console.log(error);
              this.fecharCarregando();
            }
          )
      }, 2000);


    }
  }

  ionViewDidEnter() {
    this.menu.enable(false, 'myMenu');
  }
}
