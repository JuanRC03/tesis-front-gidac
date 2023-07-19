import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoVariableComponent } from './add-tipo-variable.component';

describe('AddTipoVariableComponent', () => {
  let component: AddTipoVariableComponent;
  let fixture: ComponentFixture<AddTipoVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipoVariableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTipoVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
