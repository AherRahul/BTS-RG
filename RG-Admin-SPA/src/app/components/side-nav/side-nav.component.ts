import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Output() componentName = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  launchComponent(component) {
    this.componentName.emit(component);
  }
}
