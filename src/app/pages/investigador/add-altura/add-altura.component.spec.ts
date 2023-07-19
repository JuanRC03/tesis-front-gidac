import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlturaComponent } from './add-altura.component';

describe('AddAlturaComponent', () => {
  let component: AddAlturaComponent;
  let fixture: ComponentFixture<AddAlturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
