import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/_services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  currentProject: any = {
    clientId: {
      clientColorCode: ""
    }
  };
  segregateProjectList = [];
  projectList = []
  
  constructor ( private projectService: ProjectService ) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projectList = projects;
      
      this.sortProject();
      this.segregateProject();
    });
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
    console.log(this.currentProject);
    
  }
}
