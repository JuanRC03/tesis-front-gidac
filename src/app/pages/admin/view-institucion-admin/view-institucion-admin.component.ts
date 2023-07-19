import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewInstitucionAdminDataSource, ViewInstitucionAdminItem } from './view-institucion-admin-datasource';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { InstitucionService } from 'src/app/services/institucion.service';

@Component({
  selector: 'app-view-institucion-admin',
  templateUrl: './view-institucion-admin.component.html',
  styleUrls: ['./view-institucion-admin.component.css']
})
export class ViewInstitucionAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewInstitucionAdminItem>;
  dataSource: ViewInstitucionAdminDataSource;

  
  constructor(private route:ActivatedRoute,
              private institucionService:InstitucionService) {
    this.dataSource = new ViewInstitucionAdminDataSource();
  }
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
    
  ngOnInit(): void {
    
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.institucionService.listar().subscribe(
          (res:any)=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar institución',
        text:'¿Estás seguro de eliminar la institución?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.institucionService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idInstitucion!= id);
              Swal.fire('Institución eliminado','La institución ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la institución','error');
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
  