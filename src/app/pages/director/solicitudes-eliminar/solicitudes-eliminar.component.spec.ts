import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesEliminarComponent } from './solicitudes-eliminar.component';

describe('SolicitudesEliminarComponent', () => {
  let component: SolicitudesEliminarComponent;
  let fixture: ComponentFixture<SolicitudesEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesEliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
