import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="isLoading$ | async as isLoading">
      <div class="lds-roller" *ngIf="isLoading">
        <div></div><div></div><div></div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {

  isLoading$ = this.spinnerService.isLoadin$;

  constructor(private spinnerService: SpinnerService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Forzar la detección de cambios después de asignar el valor a isLoadin$
    this.isLoading$.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }
}
