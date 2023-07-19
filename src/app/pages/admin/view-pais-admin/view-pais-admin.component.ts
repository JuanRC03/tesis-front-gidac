import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewPaisAdminDataSource, ViewPaisAdminItem } from './view-pais-admin-datasource';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from 'src/app/services/pais.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-view-pais-admin',
  templateUrl: './view-pais-admin.component.html',
  styleUrls: ['./view-pais-admin.component.css']
})
export class ViewPaisAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewPaisAdminItem>;
  dataSource: ViewPaisAdminDataSource;

  
  constructor(private route:ActivatedRoute,
    private paisService:PaisService,
    private ubicacionService:UbicacionService) {
    this.dataSource = new ViewPaisAdminDataSource();
  }
  
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
    
  ngOnInit(): void {
    
    this.listarPaises();
  }

    listaDatos : any = []

  listarPaises()
    {
      
      this.ubicacionService.obtenerPaises().subscribe(
          (res:any)=>{
            this.listaDatos=res;
            
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar provincia',
        text:'¿Estás seguro de eliminar la provincia?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.paisService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.codigoPais!= id);
              Swal.fire('Provincia eliminado','La provincia ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la provincia','error');
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
  
