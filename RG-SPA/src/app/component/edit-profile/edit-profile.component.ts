import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  photoURL: string;
  currentUser = { text: 'Rahul Aher', id: 4, color: '#04ccf9', role: 'Developer' };

  constructor() { }

  ngOnInit(): void {
  }

}
