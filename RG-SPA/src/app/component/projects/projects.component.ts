import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  currentProject: any = {};
  segregateProjectList = [];
  projectList = [
    {
      projectName: 'Microsoft ITO Phase 3',
      projectCode: 'X016',
      clientName: 'Microsoft',
      billable: 'Yes',
      goLive: '15 July 2021',
      cr: '2021',
      dr: '26 June 2021',
      devStart: '17 June 2021',
      qa: '08 July 2021',
      notes: '',
      colorCode: '#fc8e89'
    },
    {
      projectName: 'F5 Network Sprint 3',
      projectCode: 'FN63',
      clientName: 'F5 Network',
      billable: 'Yes',
      goLive: '15 July 2021',
      cr: '2021',
      dr: '26 June 2021',
      devStart: '17 June 2021',
      qa: '08 July 2021',
      notes: '',
      colorCode: '#a6fa85'
    },
    {
      projectName: 'Abbot MBS',
      projectCode: 'AX80',
      clientName: 'Abbot',
      billable: 'Yes',
      goLive: '15 July 2021',
      cr: '2021',
      dr: '26 June 2021',
      devStart: '17 June 2021',
      qa: '08 July 2021',
      notes: '',
      colorCode: '#a4bcff'
    },
    {
      projectName: 'Salesforce_LFS (BA1)_Post pilot',
      projectCode: 'SB44',
      clientName: 'Salesforce',
      billable: 'Yes',
      goLive: '15 July 2021',
      cr: '2021',
      dr: '26 June 2021',
      devStart: '17 June 2021',
      qa: '08 July 2021',
      notes: '',
      colorCode: '#fade4d'
    }
  ]
  
  constructor() { }

  ngOnInit(): void {
    this.sortProject();
    this.segregateProject();
  }

  sortProject(): void {
    this.projectList.sort(function(a, b) {
      var textA = a.projectName.toUpperCase();
      var textB = b.projectName.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  segregateProject() {
    let initialsWithProject = [];

    for (let i = 0; i < 26; i++) {
      let initialObj = {
        initial: '',
        projects: []
      };
      initialObj.initial = String.fromCharCode(65 + i);
      for (let j = 0; j < this.projectList.length; j++) {
        let projInitial = this.projectList[j].projectName.charAt(0);

        if (initialObj.initial === projInitial) {
          initialObj.projects.push(this.projectList[j]);
        }
      }
      initialsWithProject.push(initialObj);
    }
    this.segregateProjectList = initialsWithProject;
  }

  modePopUp(project){
    this.currentProject = project;
  }
}
