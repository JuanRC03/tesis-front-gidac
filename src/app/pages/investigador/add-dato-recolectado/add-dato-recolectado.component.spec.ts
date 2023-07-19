import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDatoRecolectadoComponent } from './add-dato-recolectado.component';

describe('AddDatoRecolectadoComponent', () => {
  let component: AddDatoRecolectadoComponent;
  let fixture: ComponentFixture<AddDatoRecolectadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDatoRecolectadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDatoRecolectadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
