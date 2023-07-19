import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProyectoInvestigacionComponent } from './view-proyecto-investigacion.component';

describe('ViewProyectoInvestigacionComponent', () => {
  let component: ViewProyectoInvestigacionComponent;
  let fixture: ComponentFixture<ViewProyectoInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProyectoInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProyectoInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
