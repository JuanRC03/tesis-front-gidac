import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigadoresInvestigacionComponent } from './add-investigadores-investigacion.component';

describe('AddInvestigadoresInvestigacionComponent', () => {
  let component: AddInvestigadoresInvestigacionComponent;
  let fixture: ComponentFixture<AddInvestigadoresInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvestigadoresInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestigadoresInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
