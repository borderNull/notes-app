import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from './../environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule, MatIconRegistry  } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


// import {AddNoteDialogComponent} from './add-note/add-note.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSortModule, MatPaginatorIntl,
       MatPaginatorModule, MatTableDataSource, MatProgressSpinnerModule
      } from '@angular/material';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { TableNotesComponent, MatPaginatorIntlRu } from './table-notes/table-notes.component';
import { TableService} from './table.service';
import { AddNoteComponent } from './add-note/add-note.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    TableNotesComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'segmento-app'),
    AngularFirestoreModule.enablePersistence(),
    NgbModule.forRoot(),
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    // MatPaginatorIntl,
    // MatPaginatorIntlRu

  ],
  providers: [TableService, MatIconRegistry, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRu}],
  bootstrap: [AppComponent],
  entryComponents: [ AddNoteComponent]
})
export class AppModule { }
