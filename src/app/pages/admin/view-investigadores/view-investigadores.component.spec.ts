import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvestigadoresComponent } from './view-investigadores.component';

describe('ViewInvestigadoresComponent', () => {
  let component: ViewInvestigadoresComponent;
  let fixture: ComponentFixture<ViewInvestigadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInvestigadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInvestigadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
