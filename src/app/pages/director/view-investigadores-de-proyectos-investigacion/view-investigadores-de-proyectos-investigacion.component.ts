import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-investigadores-de-proyectos-investigacion',
  templateUrl: './view-investigadores-de-proyectos-investigacion.component.html',
  styleUrls: ['./view-investigadores-de-proyectos-investigacion.component.css']
})
export class ViewInvestigadoresDeProyectosInvestigacionComponent implements OnInit {

  idProyectoInvestigacion:any;
  nombreProyectoInvestigacion:any;
  grupoInvestigacion:any = [];
  grupoInvestigacionEliminar:any = {
    proyectoInvestigacion:{
      idProyectoInvestigacion:0
    },
    usuario:{
      idUsuario:0
    }
  }
  

  constructor(private route:ActivatedRoute,
              private investigacionInvestigadoresService:InvestigacionInvestigadoresService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.idProyectoInvestigacion = this.route.snapshot.params['idProyectoInvestigacion'];
    this.nombreProyectoInvestigacion = this.route.snapshot.params['nombreProyectoInvestigacion'];
    this.grupoInvestigacionEliminar.proyectoInvestigacion.idProyectoInvestigacion = this.idProyectoInvestigacion;
    this.investigacionInvestigadoresService.listarInvestigadoresEnProyectosInvestigacion(this.idProyectoInvestigacion).subscribe(
      (data:any) => {
        console.log(data);
        this.grupoInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  
  eliminarInvestigador(idUsuario:any){
    Swal.fire({
      title:'Eliminar investigador del proyecto',
      text:'¿Estás seguro , quieres eliminar este investigador del proyecto?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((resultado) => {
      if(resultado.isConfirmed){
        this.grupoInvestigacionEliminar.usuario.idUsuario = idUsuario;
        console.log(idUsuario);
        this.investigacionInvestigadoresService.eliminarInvestigadorDeProyectoInvestigacion(this.grupoInvestigacionEliminar).subscribe(
          (data) => {
            this.snack.open('Investigador eliminado de la investigacion','',{
              duration:3000
            })
            this.grupoInvestigacion = this.grupoInvestigacion.filter((grupoInvestigacion:any) => grupoInvestigacion.usuario.idUsuario != idUsuario);
          },
          (error) => {
            this.snack.open('Error al eliminar el investigador','',{
              duration:3000
            })
            console.log(error);
          }
        )
      }
    })
  }
  

  //paginacion y busqueda
  page_size:number=5
  page_number:number=1
  page_size_options=[5,10,20,50,100]

  handlePage(e: PageEvent){
    this.page_size=e.pageSize
    this.page_number=e.pageIndex + 1
  }
  
  public search: string = '';

  onSearch( search: string ) {
    this.search = search;
  }
}

