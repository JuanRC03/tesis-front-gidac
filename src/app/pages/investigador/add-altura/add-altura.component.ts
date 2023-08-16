import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlturaService } from 'src/app/services/altura.service';
import { MedidaService } from 'src/app/services/medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-altura',
  templateUrl: './add-altura.component.html',
  styleUrls: ['./add-altura.component.css']
})
export class AddAlturaComponent implements OnInit {

  constructor(
    private alturaService: AlturaService,
    private medidaService: MedidaService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  medida : any = []
  
  public altura = {
    alturaMinima: '',
    alturaMaxima: '',
    unidadMedida:{
      idUnidadMedida:0
    }
  }

  
  ngOnInit(): void {
    this.listarMedidas();
  }

  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            console.log(this.medida);
          },
          err=>console.log(err)
        )
    }

  public agregar() {
    if (this.altura.alturaMinima.trim() == '' || this.altura.alturaMinima.trim() == null) {
      this.snack.open('La altura minima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.altura.alturaMaxima.trim() == '' || this.altura.alturaMaxima.trim() == null) {
      this.snack.open('La altura maxima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.altura.unidadMedida.idUnidadMedida == 0) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.alturaService.guardar(this.altura).subscribe(
      (data) => {
        Swal.fire('Altura añadida', 'La altura se añadio con éxito', 'success').then(
          (e) => {
            this.altura.alturaMinima='';
            this.altura.alturaMaxima='';
            this.altura.unidadMedida.idUnidadMedida=0;
          })
      }, (error) => {
        Swal.fire('Error al anadir la altura', 'No se registro la altura', 'error');
        console.log(error);
      }
    );
  }
}

