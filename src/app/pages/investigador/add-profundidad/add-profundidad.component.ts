import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MedidaService } from 'src/app/services/medida.service';
import { ProfundidadService } from 'src/app/services/profundidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-profundidad',
  templateUrl: './add-profundidad.component.html',
  styleUrls: ['./add-profundidad.component.css']
})
export class AddProfundidadComponent implements OnInit {

  constructor(
    private profundidadService: ProfundidadService,
    private medidaService: MedidaService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  medida : any = []
  
  public profundidad = {
    profundidadMinima: '',
    profundidadMaxima: '',
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

  public agregarConglomerado() {
    if (this.profundidad.profundidadMinima.trim() == '' || this.profundidad.profundidadMinima.trim() == null) {
      this.snack.open('La profundiad minima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.profundidad.profundidadMaxima.trim() == '' || this.profundidad.profundidadMaxima.trim() == null) {
      this.snack.open('La profundiad maxima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.profundidad.unidadMedida.idUnidadMedida == 0) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.profundidadService.guardar(this.profundidad).subscribe(
      (data) => {
        Swal.fire('Profundidad añadido', 'La profundidad se añadio con éxito', 'success').then(
          (e) => {
            this.profundidad.profundidadMinima='';
            this.profundidad.profundidadMaxima='';
            this.profundidad.unidadMedida.idUnidadMedida=0;
          })
      }, (error) => {
        Swal.fire('Error al anadir la profundidad', 'No se registro la profundidad', 'error');
        console.log(error);
      }
    );
  }
}

