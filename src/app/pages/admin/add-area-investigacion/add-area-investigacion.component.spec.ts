import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaInvestigacionComponent } from './add-area-investigacion.component';

describe('AddAreaInvestigacionComponent', () => {
  let component: AddAreaInvestigacionComponent;
  let fixture: ComponentFixture<AddAreaInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAreaInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAreaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
