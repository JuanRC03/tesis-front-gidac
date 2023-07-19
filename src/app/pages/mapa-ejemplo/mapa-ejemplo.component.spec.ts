import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEjemploComponent } from './mapa-ejemplo.component';

describe('MapaEjemploComponent', () => {
  let component: MapaEjemploComponent;
  let fixture: ComponentFixture<MapaEjemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaEjemploComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaEjemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
