import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConglomeradoComponent } from './add-conglomerado.component';

describe('AddConglomeradoComponent', () => {
  let component: AddConglomeradoComponent;
  let fixture: ComponentFixture<AddConglomeradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConglomeradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConglomeradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
