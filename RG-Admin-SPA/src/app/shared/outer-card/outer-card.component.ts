import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-outer-card',
  templateUrl: './outer-card.component.html',
  styleUrls: ['./outer-card.component.css']
})
export class OuterCardComponent implements OnInit {

  @Input() title = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
