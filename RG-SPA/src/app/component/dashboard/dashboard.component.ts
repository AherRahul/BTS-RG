import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  photoURL: string;
  currentAllocation: any = {};

  todaysAllocation = [
    {
      Resource: "Rahul Aher",
      photoURL: '',
      Project: "Microsoft ITO Phase 3",
      ProjectCode: '(MI69)',
      Client: "Microsoft",
      Total: "4h confirmed",
      Details: "MSFT Phase 3",
      Billable: "Yes",
      Booker: "Divya Nair",
      Date: "10 Feb 2021"
    },
    {
      Resource: "Rahul Aher",
      photoURL: '',
      Project: "Salesforce SKO 2021 Customiza...",
      ProjectCode: '(CX01)',
      Client: "Salesforce",
      Total: "4h confirmed",
      Details: "Content updates",
      Billable: "Yes",
      Booker: "Kinjal Gadani",
      Date: "10 Feb 2021"
    },
    {
      Resource: "Rahul Aher",
      photoURL: '',
      Project: "BP Contract Management Essentials",
      ProjectCode: '(BC27)',
      Client: "BP",
      Total: "3h confirmed",
      Details: "Content updates",
      Billable: "Yes",
      Booker: "Kinjal Gadani",
      Date: "10 Feb 2021"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  modePopUp(allocation) { 
    this.currentAllocation = allocation;
  }
}