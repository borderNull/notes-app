import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import {TableService} from '../table.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource, MatSort, MatPaginatorIntl} from '@angular/material';
import {AddNoteComponent} from '../add-note/add-note.component';
import {Note} from '../models/note';
import {NgModule} from '@angular/core';
import 'rxjs/add/operator/map';

export class MatPaginatorIntlRu extends MatPaginatorIntl {
  itemsPerPageLabel = 'Записей на странице';
  nextPageLabel = 'вперед';
  previousPageLabel = 'назад';
  lastPageLabel = 'в конец';
  firstPageLabel = 'в начало';
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 из ${length}`;
    } length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} из ${length}`;
    }

}

@Component({
  selector: 'app-table-notes',
  templateUrl: './table-notes.component.html',
  styleUrls: ['./table-notes.component.css']
})


export class TableNotesComponent implements OnInit {

  notes: Note[];
  displayedColumns = ['id', 'funds', 'comment', 'buttons'];
  maxId: number;
  dataSource: any;
  private ELEMENT_DATA: Note[] = [];
  public tbDataSource;
  @Output() parentNotes: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public tableService: TableService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.tableService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.ELEMENT_DATA = notes;
      this.tbDataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.tbDataSource.paginator = this.paginator;
      this.tbDataSource.sort = this.sort;
      this.parentNotes.emit(notes);
    });

  }

  addNote() {
    this.maxId = Math.max(...this.notes.map(note => note.id));
    this.dialog.open(AddNoteComponent, {
                       data: {
                         editState: false,
                         note: {
                           id: ++this.maxId,
                           consumption: -100,
                           income: 150,
                           comment: 'Ваш комментарий'
                          }
                      }
                    }
                  );
                }

  editNote(event, note) {
    this.dialog.open(AddNoteComponent, {
                      data: {
                        editState: true,
                        note: note
                      }
                    }
                  );
                }
}
