import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-dato-recolectado',
  templateUrl: './add-dato-recolectado.component.html',
  styleUrls: ['./add-dato-recolectado.component.css']
})
export class AddDatoRecolectadoComponent implements OnInit {

  constructor(
    private equivalenciaVariableService: EquivalenciaVariableService,
    private datoRecolectadoService: DatoRecolectadoService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  equivalenciaVariable : any = []
  public datoRecolectado = {
    valor: 0,
    vigencia: 1,
    dataset:{
      idDataset:0
    },
    variable:{
      idVariable:0
    }
  }

  idPunto= 0;
  idParcela= 0;
  idConglomerado= 0;
  idProyecto= 0;
  ngOnInit(): void {
    this.idPunto = this.route.snapshot.params['idPunto'];
    this.idParcela = this.route.snapshot.params['idParcela'];
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.datoRecolectado.dataset.idDataset=this.idPunto;
    this.listarVariables();
  }

  listarVariables()
    {
      this.equivalenciaVariableService.listar().subscribe(
          res=>{
            this.equivalenciaVariable=res;
            console.log(res);
          },
          err=>console.log(err)
        )
    }

  public agregarConglomerado() {
    if (this.datoRecolectado.valor== 0) {
      this.snack.open('EL valor del dato recolectado es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.datoRecolectado.variable.idVariable== 0) {
      this.snack.open('El tipo de variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.datoRecolectadoService.guardar(this.datoRecolectado).subscribe(
      (data) => {
        Swal.fire('Dato recolectado añadido', 'El dato recolectado se añadio con éxito', 'success').then(
          (e) => {
            this.datoRecolectado.valor=0;
            this.datoRecolectado.variable.idVariable=0;
          })
      }, (error) => {
        Swal.fire('Error al anadir el dato recolectado', 'No se registro el dato recolectado', 'error');
        console.log(error);
      }
    );
  }
}

