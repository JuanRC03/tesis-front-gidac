import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MedidaService } from 'src/app/services/medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-medida',
  templateUrl: './add-medida.component.html',
  styleUrls: ['./add-medida.component.css']
})
export class AddMedidaComponent implements OnInit {

  constructor(
    private medidaService: MedidaService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  
  hidePass = true;

  idBusqueda= 0;

  public medida = {
    idUnidadMedida: 500,
    abreviatura: '',
    magnitud: '',
    unidadMedida: '',
    vigencia:1
  }

  ngOnInit(): void {
  }


  public agregarConglomerado() {

    if (this.medida.abreviatura.trim() == '' || this.medida.abreviatura.trim() == null) {
      this.snack.open('El  es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.medida.unidadMedida.trim() == '' || this.medida.unidadMedida.trim() == null) {
      this.snack.open('El  es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.medida.magnitud.trim() == '' || this.medida.magnitud.trim() == null) {
      this.snack.open('El  es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.medidaService.guardar(this.medida).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'La unidad de medida se agrego con éxito', 'success').then(
          (e) => {
            this.medida.abreviatura='';
            this.medida.magnitud='';
            this.medida.unidadMedida='';
          })
      }, (error) => {
        Swal.fire('Error', 'No se registro la nueva unidad de medida', 'error');
        console.log(error);
      }
    );
  }
}

