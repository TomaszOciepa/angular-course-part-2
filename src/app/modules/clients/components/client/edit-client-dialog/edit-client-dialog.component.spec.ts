import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientDialogComponent } from './edit-client-dialog.component';

describe('EditClientDialogComponent', () => {
  let component: EditClientDialogComponent;
  let fixture: ComponentFixture<EditClientDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditClientDialogComponent]
    });
    fixture = TestBed.createComponent(EditClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
