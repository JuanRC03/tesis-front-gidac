import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigacionComponent } from './add-investigacion.component';

describe('AddInvestigacionComponent', () => {
  let component: AddInvestigacionComponent;
  let fixture: ComponentFixture<AddInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
