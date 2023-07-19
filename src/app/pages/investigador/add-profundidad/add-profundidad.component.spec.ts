import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfundidadComponent } from './add-profundidad.component';

describe('AddProfundidadComponent', () => {
  let component: AddProfundidadComponent;
  let fixture: ComponentFixture<AddProfundidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfundidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProfundidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
