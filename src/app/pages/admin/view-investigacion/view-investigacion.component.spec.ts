import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvestigacionComponent } from './view-investigacion.component';

describe('ViewInvestigacionComponent', () => {
  let component: ViewInvestigacionComponent;
  let fixture: ComponentFixture<ViewInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
