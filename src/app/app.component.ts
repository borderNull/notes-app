import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddNoteComponent} from '../app/add-note/add-note.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('sumState', [
      state('change', style({
        fontSize: '64px',
        transform: 'translateY(0)'
      })),
      // state('on',   style({
      //   fontSize: '64px',
      //   transform: 'translateY(100%)'
      // })),
      // transition('off => on', [
      //   animate('2000ms ease-in', style({transform: 'translateY(-100%)'}))
      // ]),
      // transition('on => off',  [
      //   animate('2000ms ease-out', style({transform: 'translateY(100%)'}))
      // ]),
      transition(':enter', [
        style({transform: 'translateY(-100%) scale(1)'}),
        animate(2000)
      ]),
      transition(':leave', [
        animate(2000, style({transform: 'translateY(100%) scale(1.1)'}))
      ]),
    ])
  ]
})
export class AppComponent implements OnInit  {
  title = 'app';
  remain;
  sum;
  sumsState = 'change';
  state = 'change';

  parentNotes(notes) {
    this.remain = notes;
    // this.toggleState();
    this.getSummary();
    this.toggleState();
  }

  constructor() {}

  toggleState() {
    this.state = this.state === 'change' ? 'notchange' : 'change';
    console.log(this);
  }

  getSumReducer = (acc, note)  => {
    return acc += note.income + note.consumption;
  }

  getSummary() {
    if (this.remain) {
      this.sum = this.remain.reduce(this.getSumReducer, 0);
    }
  }

ngOnInit() {
  // this.toggleState();
  console.log(this)
}

}
