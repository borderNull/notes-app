import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNotesComponent } from './table-notes.component';

describe('TableNotesComponent', () => {
  let component: TableNotesComponent;
  let fixture: ComponentFixture<TableNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
