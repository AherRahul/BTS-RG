import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../_services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appName = 'BTS RG';
  photoURL: string;
  currentUser = { text: 'Rahul Aher', id: 4, color: '#04ccf9', role: 'Developer' };

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.tokenService.GetToken();
  }

  logout() {
    this.router.navigate(['/login']);
    this.tokenService.DeleteToken();
  }
}
