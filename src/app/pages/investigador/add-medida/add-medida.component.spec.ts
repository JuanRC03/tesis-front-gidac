import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedidaComponent } from './add-medida.component';

describe('AddMedidaComponent', () => {
  let component: AddMedidaComponent;
  let fixture: ComponentFixture<AddMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
