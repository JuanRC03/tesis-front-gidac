import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-investigacion',
  templateUrl: './view-investigacion.component.html',
  styleUrls: ['./view-investigacion.component.css']
})
export class ViewInvestigacionComponent implements OnInit {

  investigaciones : any = []

  constructor(private investigacionService:InvestigacionService) { }

  ngOnInit(): void {
    this.investigacionService.listarInvestigaciones().subscribe(
      (dato:any) => {
        this.investigaciones = dato;
        console.log(this.investigaciones);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error','Error al cargar los exámenes','error');
      }
    )
  }

  eliminarInvestigacion(idInvestigacion:any){
    Swal.fire({
      title:'Eliminar examen',
      text:'¿Estás seguro de eliminar el examen?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.investigacionService.eliminarInvestigacion(idInvestigacion).subscribe(
          (data) => {
            this.investigaciones = this.investigaciones.filter((investigacion:any) => investigacion.idInvestigacion != idInvestigacion);
            Swal.fire('Examen eliminado','El examen ha sido eliminado de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar el examen','error');
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
