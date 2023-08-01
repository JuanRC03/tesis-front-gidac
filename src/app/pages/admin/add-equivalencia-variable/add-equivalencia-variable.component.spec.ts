import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquivalenciaVariableComponent } from './add-equivalencia-variable.component';

describe('AddEquivalenciaVariableComponent', () => {
  let component: AddEquivalenciaVariableComponent;
  let fixture: ComponentFixture<AddEquivalenciaVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEquivalenciaVariableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEquivalenciaVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
