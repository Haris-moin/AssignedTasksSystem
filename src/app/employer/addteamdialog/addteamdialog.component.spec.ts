import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddteamdialogComponent } from './addteamdialog.component';

describe('AddteamdialogComponent', () => {
  let component: AddteamdialogComponent;
  let fixture: ComponentFixture<AddteamdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddteamdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddteamdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
