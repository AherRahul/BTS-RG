import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SideNavService } from 'src/app/_services/side-nav.service';
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
    private sideNavService: SideNavService
  ) { }

  ngOnInit(): void {
  }

  launchComponent(component) {
    this.componentName.emit(component);
  }

  @HostListener('call')
  call(componentName: string) {
    this.sideNavService.toggle(componentName);
  }

}
