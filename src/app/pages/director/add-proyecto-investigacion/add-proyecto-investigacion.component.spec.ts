import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProyectoInvestigacionComponent } from './add-proyecto-investigacion.component';

describe('AddProyectoInvestigacionComponent', () => {
  let component: AddProyectoInvestigacionComponent;
  let fixture: ComponentFixture<AddProyectoInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProyectoInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProyectoInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
