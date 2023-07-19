import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from 'src/app/services/dataset.service';
import { ProfundidadService } from 'src/app/services/profundidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-punto',
  templateUrl: './add-punto.component.html',
  styleUrls: ['./add-punto.component.css']
})
export class AddPuntoComponent implements OnInit {

  constructor(
    private profundidadService:ProfundidadService,
    private datasetService: DatasetService,
    private snack: MatSnackBar,
    private route:ActivatedRoute) { }

  profundidad : any = []
  
  public dataset = {
    descripcion: '',
    fechaInicio: new Date(0),
    fechaFin: new Date(0),
    profundidadParcela:{
      idProfundidad:0,
      idParcela:0
    }
  }

  idParcela= 0;
  idConglomerado=0;
  idProyecto=0;
  ngOnInit(): void {
    this.idParcela = this.route.snapshot.params['idParcela'];
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.dataset.profundidadParcela.idParcela=this.idParcela;
    this.listarMedidas();
  }

  listarMedidas()
    {
      this.profundidadService.listar().subscribe(
          res=>{
            this.profundidad=res;
          },
          err=>console.log(err)
        )
    }

  public agregarConglomerado() {
    if (this.dataset.descripcion.trim() == '' || this.dataset.descripcion.trim() == null) {
      this.snack.open('La descripcion del punto es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if(this.dataset.fechaInicio == null){
      this.snack.open("La dehca de inico es requerida !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.dataset.fechaFin == null){
      this.snack.open("La fecha de fin es requerida !!",'',{
        duration:3000
      })
      return ;
    }
    
    if (this.dataset.profundidadParcela.idProfundidad == 0) {
      this.snack.open('La profundidad es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.datasetService.guardar(this.dataset).subscribe(
      (data) => {
        Swal.fire('Punto añadido', 'El punto se añadio con éxito', 'success').then(
          (e) => {
            this.dataset.descripcion="";
            this.dataset.profundidadParcela.idProfundidad=0;
            this.dataset.fechaInicio = new Date(0);
            this.dataset.fechaFin = new Date(0);
          })
      }, (error) => {
        Swal.fire('Error al anadir el punto', 'No se registro el nuevo punto', 'error');
        console.log(error);
      }
    );
  }
}
