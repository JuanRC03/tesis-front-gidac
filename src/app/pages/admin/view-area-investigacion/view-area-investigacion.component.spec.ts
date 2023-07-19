import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAreaInvestigacionComponent } from './view-area-investigacion.component';

describe('ViewAreaInvestigacionComponent', () => {
  let component: ViewAreaInvestigacionComponent;
  let fixture: ComponentFixture<ViewAreaInvestigacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAreaInvestigacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAreaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
