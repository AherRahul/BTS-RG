import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RG-Admin-SPA';
  LoggedIn = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  loggedIn(logIn) {
    this.LoggedIn = logIn;
    console.log(this.LoggedIn);
    
  }
}
