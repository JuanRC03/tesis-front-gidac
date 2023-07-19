import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-investigadores',
  templateUrl: './view-investigadores.component.html',
  styleUrls: ['./view-investigadores.component.css']
})
export class ViewInvestigadoresComponent implements OnInit {

  idInvestigacion:any;
  nombreInvestigacion:any;
  InvestigadorInvestigacion:any = [];

  constructor(private route:ActivatedRoute,private investigacionInvestigadoresService:InvestigacionInvestigadoresService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.idInvestigacion = this.route.snapshot.params['idInvestigacion'];
    this.nombreInvestigacion = this.route.snapshot.params['nombreInvestigacion'];
    this.investigacionInvestigadoresService.listarInvestigadoresEnProyectosInvestigacion(this.idInvestigacion).subscribe(
      (data:any) => {
        console.log(data);
        this.InvestigadorInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  
  eliminarInvestigador(idProyInv:any){
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
        this.investigacionInvestigadoresService.eliminarInvestigadorDeProyectoInvestigacion(idProyInv).subscribe(
          (data) => {
            this.snack.open('Investigador eliminado de la investigacion','',{
              duration:3000
            })
            this.InvestigadorInvestigacion = this.InvestigadorInvestigacion.filter((investigadorInvestigacion:any) => investigadorInvestigacion.idProyInv != idProyInv);
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
