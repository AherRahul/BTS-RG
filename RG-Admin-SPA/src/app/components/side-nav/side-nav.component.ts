import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Output() componentName = new EventEmitter<any>();
  @Input() sideBar: DashboardComponent;
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  launchComponent(component) {
    this.componentName.emit(component);
  }

  @HostListener('click')
  click() {
    this.authService.toggle();
  }

}
