
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InscricoesPage } from '../pages/inscricoes/inscricoes';
import { LoginPage } from './../pages/login/login';
import { LoginProvider } from '../providers/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authenticateProvider: LoginProvider) {
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [      
      { title: 'Últimas Inscrições', component: InscricoesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#003359');



      if (localStorage.getItem('usuarioLogado')) {
        this.nav.setRoot(InscricoesPage);

        document.getElementById("nomeUsuarioLogado").innerHTML = localStorage.getItem('nome');
        document.getElementById("cpfUsuarioLogado").innerHTML = localStorage.getItem('cpf');
      }


      this.splashScreen.hide();
    });
  }

  /**
   * Logout user.
   */
  public logout(): any {
    this.authenticateProvider.clearAuthenticatedUser();
    this.nav.setRoot(LoginPage);    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
