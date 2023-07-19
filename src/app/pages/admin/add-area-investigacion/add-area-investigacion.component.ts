import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreasInvestigacionService } from 'src/app/services/areas-investigacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-area-investigacion',
  templateUrl: './add-area-investigacion.component.html',
  styleUrls: ['./add-area-investigacion.component.css']
})
export class AddAreaInvestigacionComponent implements OnInit {

  constructor(
    private areasInvestigacionService: AreasInvestigacionService,
    private snack: MatSnackBar) { }

  
  hidePass = true;

  public areaInvestigacion = {
    nombreAreaInvestigacion: '',
    descripcion: ''
  }

  ngOnInit(): void {

  }


  public agregarAreaInvestigacion() {
    if (this.areaInvestigacion.nombreAreaInvestigacion.trim() == '' || this.areaInvestigacion.nombreAreaInvestigacion.trim() == null) {
      this.snack.open('El nombre del area de investigación es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.areaInvestigacion.descripcion.trim() == '' || this.areaInvestigacion.descripcion.trim() == null) {
      this.snack.open('La descripción de area de investigación es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.areasInvestigacionService.aniadirAreaInvestigacion(this.areaInvestigacion).subscribe(
      (data) => {
        Swal.fire('Director añadido', 'El director se añadio con éxito', 'success').then(
          (e) => {
            this.areaInvestigacion.nombreAreaInvestigacion='';
            this.areaInvestigacion.descripcion='';
          })
      }, (error) => {
        Swal.fire('Error al anadir director', 'No se registro el nuevo director', 'error');
        console.log(error);
      }
    );
  }

  
}
