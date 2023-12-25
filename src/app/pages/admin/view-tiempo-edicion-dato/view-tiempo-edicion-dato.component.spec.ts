import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTiempoEdicionDatoComponent } from './view-tiempo-edicion-dato.component';

describe('ViewTiempoEdicionDatoComponent', () => {
  let component: ViewTiempoEdicionDatoComponent;
  let fixture: ComponentFixture<ViewTiempoEdicionDatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTiempoEdicionDatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTiempoEdicionDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
