import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddNoteComponent} from '../app/add-note/add-note.component';
import { MessagingService } from './core/messaging.service';
import { AuthService } from './core/auth.service';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  remain;
  sum;
  message;

  parentNotes(notes) {
    this.remain = notes;
    this.getSummary();
  }

  constructor(public msg: MessagingService, public auth: AuthService) {}


  getSumReducer = (acc, note)  => {
    return acc += note.income + note.consumption;
  }

  getSummary() {
    if (this.remain) {
      this.sum = this.remain.reduce(this.getSumReducer, 0);
    }
  }

  ngOnInit() {
    console.log(this);
    this.auth.user
    .filter(user => !!user) // filter null
    .take(1) // take first real user
    .subscribe(user => {
      if (user) {
        console.log(this);
        console.log(user);
        this.msg.getPermission(user);
        this.msg.monitorRefresh(user);
        this.msg.receiveMessages();
        this.message = this.msg.currentMessage;
      }
    });
  }
  }


