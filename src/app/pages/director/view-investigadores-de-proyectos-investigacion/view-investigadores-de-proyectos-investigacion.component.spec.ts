import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvestigadoresDeProyectosInvestigacionComponent } from './view-investigadores-de-proyectos-investigacion.component';

describe('ViewInvestigadoresDeProyectosInvestigacionComponent', () => {
  let component: ViewInvestigadoresDeProyectosInvestigacionComponent;
  let fixture: ComponentFixture<ViewInvestigadoresDeProyectosInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInvestigadoresDeProyectosInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInvestigadoresDeProyectosInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
