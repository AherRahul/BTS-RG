import { Component, Input, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/_services/side-nav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  componentName = 'dashboard';
  isOpen = false;
  
  constructor(
    private sideNavService: SideNavService
  ) { }

  ngOnInit(): void {
    this.sideNavService.change.subscribe(componentName => {
      this.componentName = componentName;
    });
  }
}
