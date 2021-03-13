import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-allocation',
  templateUrl: './create-allocation.component.html',
  styleUrls: ['./create-allocation.component.css']
})
export class CreateAllocationComponent implements OnInit {

  @Input() outerCardTitle = "Create Allocation";
  
  constructor() { }

  ngOnInit(): void {
  }

}
