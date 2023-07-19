import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigadorEnProyectoInvestigacionComponent } from './add-investigador-en-proyecto-investigacion.component';

describe('AddInvestigadorEnProyectoInvestigacionComponent', () => {
  let component: AddInvestigadorEnProyectoInvestigacionComponent;
  let fixture: ComponentFixture<AddInvestigadorEnProyectoInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvestigadorEnProyectoInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestigadorEnProyectoInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
