import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  componentName;
  isOpen = false;
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.change.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }
}
