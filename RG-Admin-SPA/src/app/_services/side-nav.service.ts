import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  isOpen = false;
  componentName: string;

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() { }
  
  toggle(componentName: string) {
    this.componentName = componentName;
    //this.isOpen = !this.isOpen;
    this.change.emit(this.componentName);
  }
}
