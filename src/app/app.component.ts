import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddNoteComponent} from '../app/add-note/add-note.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  remain;
  sum;

  parentNotes(notes) {
    this.remain = notes;
    this.getSummary();
  }

  constructor() {}


  getSumReducer = (acc, note)  => {
    return acc += note.income + note.consumption;
  }

  getSummary() {
    if (this.remain) {
      this.sum = this.remain.reduce(this.getSumReducer, 0);
    }
  }

}
