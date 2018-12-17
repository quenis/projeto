import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'inscricoes.html'
})
export class InscricoesPage {
  selectedItem: any;
  icons: string[];
  public isRefreshing: boolean = false;
  public refresher;
  items: Array<{
    cargo: string, inscricao: string,
    pcd: string, datainscricao: string, datapagamento: string, cpf: string, title: string, note: string,
    status: string, icon: string
  }>;



  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private menu: MenuController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.menu.enable(true, 'myMenu')
    /*var myObject = {
      name: 'bob',
      age: '43',
      hair: 'purple'
    };*/

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.carregarItens();    
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarItens();
   
    setTimeout(() => {
      this.refresher.complete();
      this.isRefreshing = false;
    }, 2000);

  }

  carregarItens() {

    this.items = [{
      cargo: 'Anestesiologia', inscricao: '1702000003', pcd: 'Não',
      datainscricao: '12/11/2017', datapagamento: '28/11/2017', cpf: '03662150190', title: 'COREME - UFG', note: '2017', status: 'Inscrição Realizada', icon: ''
    },

    {
      cargo: 'Administração', inscricao: '1737016892', pcd: 'Não', datainscricao: '05/08/2018', datapagamento: '16/08/2018', cpf: '03662150190',
      title: 'PROCESSO SELETIVO PARA PREENCHIMENTO DE VAGAS 2018',
      note: '2018', status: 'Inscrição Não Homologada', icon: ''
    }];

  }

  itemTapped(event, item) {

    const alert = this.alertCtrl.create({
      title: 'Detalhes<br><br>',
      subTitle: '<b>PS/Concurso:</b> ' + item.title
        + '<br><b>CPF:</b> ' + item.cpf
        + '<br><b>Inscrição:</b> ' + item.inscricao
        + '<br><b>Cargo:</b> ' + item.cargo
        + '<br><b>PcD:</b> ' + item.pcd
        + '<br><b>Data de Inscrição:</b> ' + item.datainscricao
        + '<br><b>Data de Pagamento:</b> ' + item.datapagamento,
      buttons: ['OK']
    });
    alert.present();

  }

  ionViewDidEnter() {
    
  }
}
