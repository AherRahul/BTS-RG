import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  LoggedIn = false;

  constructor() { }

  ngOnInit(): void {
  }

  loggedIn(logIn) {
    this.LoggedIn = logIn;
    console.log(this.LoggedIn);
    
  }
}
