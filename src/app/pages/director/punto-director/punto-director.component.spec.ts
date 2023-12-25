import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoDirectorComponent } from './punto-director.component';

describe('PuntoDirectorComponent', () => {
  let component: PuntoDirectorComponent;
  let fixture: ComponentFixture<PuntoDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntoDirectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntoDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
