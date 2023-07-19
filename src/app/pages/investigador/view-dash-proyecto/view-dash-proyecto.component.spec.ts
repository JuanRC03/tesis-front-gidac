import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDashProyectoComponent } from './view-dash-proyecto.component';

describe('ViewDashProyectoComponent', () => {
  let component: ViewDashProyectoComponent;
  let fixture: ComponentFixture<ViewDashProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDashProyectoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDashProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
