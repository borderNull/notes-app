import { Component, Inject, OnInit } from '@angular/core';
import {TableService} from '.././table.service';
import {Note} from '.././models/Note';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, ErrorStateMatcher} from '@angular/material';
import {FormBuilder, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})

export class AddNoteComponent implements OnInit {

  note: Note;
  editState: false;
  noteForm: FormGroup;

  constructor(private tableService: TableService,
              private matDialogRef: MatDialogRef<AddNoteComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.createForm();
               }

  createForm() {
    this.noteForm = this.fb.group({
      id: {value: '', disabled: true},
      consumption: ['', [Validators.required, Validators.pattern('^-([1-9][0-9]{0,2}|1000)$')]],
      income: ['', [Validators.required, Validators.pattern('^([1-9][0-9]{0,2}|1000)$')]],
      comment: ['', [Validators.required, Validators.maxLength(512)]]
    });
  }

  ngOnInit() {

    this.note = (<any>Object).assign({}, this.data.note);
    this.editState = this.data.editState;
    this.noteForm.setValue({
       id: this.note.id,
       consumption: this.note.consumption,
       income: this.note.income,
       comment: this.note.comment
    });
  }
  get income() { return this.noteForm.get('income'); }

  get consumption() { return this.noteForm.get('consumption'); }

  get comment() { return this.noteForm.get('comment'); }

  close() {
    this.matDialogRef.close();
    this.rebuildForm();
  }

  rebuildForm() {
    this.noteForm.reset({
      consumption: this.note.consumption,
      income: this.note.income,
      comment: this.note.comment
    });
  }

  prepareSaveNote(): Note {
    const formModel = this.noteForm.value;
    const saveNote: Note = {
      id: this.note.id,
      key: this.note.key || null,
      consumption: +formModel.consumption as number,
      income: +formModel.income as number,
      comment: formModel.comment as string
    };

    return saveNote;
  }

  onSubmit() {

    if (!this.editState) {
      this.note = this.prepareSaveNote();
      this.tableService.addNote(this.note);
      this.rebuildForm();
      this.matDialogRef.close();
    } else {
      this.note = this.prepareSaveNote();
      this.tableService.updateNote(this.note);
      this.rebuildForm();
      this.matDialogRef.close();
    }
  }

  deleteNote(event, note) {
    this.tableService.deleteNote(note);
    this.matDialogRef.close();
  }

}


