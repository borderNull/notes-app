import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from './../environments/environment.prod';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule, MatIconRegistry  } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { TableNotesComponent, MatPaginatorIntlRu } from './table-notes/table-notes.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { TableService} from './table.service';
// import { MessagingService} from './messaging.service';
// import { AuthService} from './auth.service';
import { CoreModule } from './core/core.module';
import { AddNoteComponent } from './add-note/add-note.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSortModule,
  MatPaginatorIntl,
  MatPaginatorModule,
  MatTableDataSource,
  MatProgressSpinnerModule
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    TableNotesComponent,
    AddNoteComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    MatTableModule,
    CoreModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [TableService, MatIconRegistry, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlRu}],
  bootstrap: [AppComponent],
  entryComponents: [ AddNoteComponent]
})
export class AppModule { }
