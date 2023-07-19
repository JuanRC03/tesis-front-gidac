import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestigadorComponent } from './add-investigador.component';

describe('AddInvestigadorComponent', () => {
  let component: AddInvestigadorComponent;
  let fixture: ComponentFixture<AddInvestigadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInvestigadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
