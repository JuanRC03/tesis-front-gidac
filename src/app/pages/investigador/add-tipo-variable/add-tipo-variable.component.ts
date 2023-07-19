import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TipoVariableService } from 'src/app/services/tipo-variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tipo-variable',
  templateUrl: './add-tipo-variable.component.html',
  styleUrls: ['./add-tipo-variable.component.css']
})
export class AddTipoVariableComponent implements OnInit {

  constructor(
    private tipoVariableService:TipoVariableService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  medida : any = []
  
  public tipoVariable = {
    nombreTipoVariable: ''
  }

  ngOnInit(): void {
   
  }

  public agregar() {
    if (this.tipoVariable.nombreTipoVariable.trim() == '' || this.tipoVariable.nombreTipoVariable.trim() == null) {
      this.snack.open('El tipo de variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.tipoVariableService.guardar(this.tipoVariable).subscribe(
      (data) => {
        Swal.fire('Tipo de variable añadida', 'El tipo de variable se añadio con éxito', 'success').then(
          (e) => {
            this.tipoVariable.nombreTipoVariable='';
          })
      }, (error) => {
        Swal.fire('Error al anadir el tipo de variable', 'No se registro el tipo de variable', 'error');
        console.log(error);
      }
    );
  }
}

