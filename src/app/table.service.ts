import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {Note} from './models/Note';






@Injectable()
export class TableService {
   notesCollection: AngularFirestoreCollection<Note>;
   notes: Observable<Note[]>;
   noteDoc: AngularFirestoreDocument<Note>;


  constructor(public afs: AngularFirestore)  {
    this.notesCollection = this.afs.collection('income', ref => ref.orderBy('id', 'asc'));

    this.notes = this.notesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Note;
        data.key = a.payload.doc.id;

        // console.log(data);
        return data;
      });
    });
   }

   getNotes() {
     return this.notes;
   }


   addNote(note: Note) {
     this.notesCollection.add(note);
   }

   deleteNote(note: Note) {
     this.noteDoc = this.afs.doc(`income/${note.key}`);
     this.noteDoc.delete();
   }

   updateNote(note: Note) {
    this.noteDoc = this.afs.doc(`income/${note.key}`);
    this.noteDoc.update(note);
   }


}

