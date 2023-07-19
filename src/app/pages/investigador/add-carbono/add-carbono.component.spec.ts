import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarbonoComponent } from './add-carbono.component';

describe('AddCarbonoComponent', () => {
  let component: AddCarbonoComponent;
  let fixture: ComponentFixture<AddCarbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarbonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
