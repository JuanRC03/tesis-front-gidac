import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ParcelaService } from 'src/app/services/parcela.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-parcela',
  templateUrl: './add-parcela.component.html',
  styleUrls: ['./add-parcela.component.css']
})
export class AddParcelaComponent implements OnInit {

  constructor(private parcelaService:ParcelaService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  hidePass = true;

  public parcela = {
    coordenadaX: '',
    coordenadaY: '',
    sistemaCoordenada: '',
    conglomerado:{
      idConglomerado:0
    }
  }


  idConglomerado= 0;
  
  idProyecto=0;

  ngOnInit(): void {
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.parcela.conglomerado.idConglomerado=this.idConglomerado;
  }


  public agregarConglomerado() {
    if (this.parcela.coordenadaX.trim() == '' || this.parcela.coordenadaX.trim() == null) {
      this.snack.open('La coordenad "X" es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.parcela.coordenadaY.trim() == '' || this.parcela.coordenadaY.trim() == null) {
      this.snack.open('La coordenada "Y" es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.parcela.sistemaCoordenada.trim() == '' || this.parcela.sistemaCoordenada.trim() == null) {
      this.snack.open('El sistema de coordenadas es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.parcelaService.guardar(this.parcela).subscribe(
      (data) => {
        Swal.fire('Parcela añadida', 'La parsela se añadio con éxito', 'success').then(
          (e) => {
            this.parcela.coordenadaX='';
            this.parcela.coordenadaY='';
            this.parcela.sistemaCoordenada='';
          })
      }, (error) => {
        Swal.fire('Error al anadir la parcela', 'No se registro la nueva parcela', 'error');
        console.log(error);
      }
    );
  }
}
