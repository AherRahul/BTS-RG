import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  currentClient: any = {};
  segregateClientList = [];
  ClientList = [
    {
      clientName: 'Microsoft',
      notes: '',
      colorCode: '#fc8e89'
    },
    {
      clientName: 'F5 Network',
      notes: '',
      colorCode: '#a6fa85'
    },
    {
      clientName: 'Abbot',
      notes: '',
      colorCode: '#a4bcff'
    },
    {
      clientName: 'Salesforce',
      notes: '',
      colorCode: '#fade4d'
    }
  ]
  
  constructor() { }

  ngOnInit(): void {
    this.sortClient();
    this.segregateClient();
  }

  sortClient(): void {
    this.ClientList.sort(function(a, b) {
      var textA = a.clientName.toUpperCase();
      var textB = b.clientName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  segregateClient() {
    let initialsWithClient = [];

    for (let i = 0; i < 26; i++) {
      let initialObj = {
        initial: '',
        Clients: []
      };
      initialObj.initial = String.fromCharCode(65 + i);
      for (let j = 0; j < this.ClientList.length; j++) {
        let projInitial = this.ClientList[j].clientName.charAt(0);

        if (initialObj.initial === projInitial) {
          initialObj.Clients.push(this.ClientList[j]);
        }
      }
      initialsWithClient.push(initialObj);
    }
    this.segregateClientList = initialsWithClient;
  }

  modePopUp(Client){
    this.currentClient = Client;
  }

}
