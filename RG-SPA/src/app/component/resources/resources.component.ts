import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  photoURL: string;
  roles= [ 
    { role: 'Director', resource: []}, 
    { role: 'Functional Head', resource: []}, 
    { role: 'Project Manager', resource: []}, 
    { role: 'Developer', resource: []}, 
    { role: 'Designer', resource: []}, 
    { role: 'QA', resource: []}
  ];
  
  public resourceDataSource = [
    { text: 'Akhil Ben', id: 1, color: '#56ca85', role: 'Designer'},
    { text: 'Rahul Aher', id: 4, color: '#04ccf9', role: 'Developer' },
    { text: 'Divya Nair', id: 7, color: '#db6be8', role: 'Project Manager' },
    { text: 'Prashant Kutty', id: 8, color: '#df5286', role: 'Director' },
    { text: 'Ajay Chayya', id: 9, color: '#f97504', role: 'Functional Head'},
    { text: 'Amruta Deshmukh', id: 10, color: '#f4086a', role: 'QA'}
  ];
  currentResource: any = {};

  constructor() { }

  ngOnInit(): void {
    this.segregateData();
  }

  segregateData() {
    for (let i = 0; i < this.roles.length; i++) {
      for (let j = 0; j < this.resourceDataSource.length; j++) {
        if (this.roles[i].role === this.resourceDataSource[j].role) {
            this.roles[i].resource.push(this.resourceDataSource[j]);
        }
      }
    }
  }

  modePopUp(resource) {
    this.currentResource = resource;
    console.log(this.currentResource);
  }
}
