import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlturaService } from 'src/app/services/altura.service';
import { ConglomeradoService } from 'src/app/services/conglomerado.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-conglomerado',
  templateUrl: './add-conglomerado.component.html',
  styleUrls: ['./add-conglomerado.component.css']
})
export class AddConglomeradoComponent implements OnInit {

  constructor(
    private conglomeradoService: ConglomeradoService,
    private alturaService:AlturaService,
    private snack: MatSnackBar,
    private route:ActivatedRoute,
    private investigacionService:InvestigacionService) { }

  idProyecto= 0;

  estadoProyectoInvestigacion:any = [];
  
  public conglomerado = {
    nombreConglomerado: '',
    sector: '',
    proyectoInvestigacion:{
      idProyecto:0
    },
    altura:{
      idAltura:0
    }
  }

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.conglomerado.proyectoInvestigacion.idProyecto=this.idProyecto;
    this.listarAltitud();
    this.listarProyectosVigentes();
  }

  datos : any = []
    listarProyectosVigentes()
    {
      this.investigacionService.obtenerProyectoInvestigacion(this.idProyecto).subscribe(
          res=>{
            this.datos=res;
          },
          err=>console.log(err)
        )
    }

  altitud : any = []

  listarAltitud()
    {
      this.alturaService.listar().subscribe(
          res=>{
            this.altitud=res;
          },
          err=>console.log(err)
        )
    }


  public agregarConglomerado() {
    if (this.conglomerado.nombreConglomerado.trim() == '' || this.conglomerado.nombreConglomerado.trim() == null) {
      this.snack.open('El nombre del conglomerado es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.conglomerado.sector.trim() == '' || this.conglomerado.sector.trim() == null) {
      this.snack.open('El sector del conglomerado es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.conglomeradoService.guardar(this.conglomerado).subscribe(
      (data) => {
        Swal.fire('Conglomerado añadido', 'El conglomerado se añadio con éxito', 'success').then(
          (e) => {
            this.conglomerado.nombreConglomerado='';
            this.conglomerado.sector='';
          })
      }, (error) => {
        Swal.fire('Error al anadir el conglomerado', 'No se registro el nuevo conglomerado', 'error');
        console.log(error);
      }
    );
  }
}

