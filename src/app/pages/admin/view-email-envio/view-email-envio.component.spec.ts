import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmailEnvioComponent } from './view-email-envio.component';

describe('ViewEmailEnvioComponent', () => {
  let component: ViewEmailEnvioComponent;
  let fixture: ComponentFixture<ViewEmailEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmailEnvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmailEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
