import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPuntoComponent } from './add-punto.component';

describe('AddPuntoComponent', () => {
  let component: AddPuntoComponent;
  let fixture: ComponentFixture<AddPuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPuntoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
