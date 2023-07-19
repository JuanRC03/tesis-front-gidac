import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewProvinciaAdminDataSource, ViewProvinciaAdminItem } from './view-provincia-admin-datasource';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-view-provincia-admin',
  templateUrl: './view-provincia-admin.component.html',
  styleUrls: ['./view-provincia-admin.component.css']
})
export class ViewProvinciaAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewProvinciaAdminItem>;
  dataSource: ViewProvinciaAdminDataSource;


  constructor(private route:ActivatedRoute,
    private provinciaService:ProvinciaService,
    private ubicacionService:UbicacionService) {
    this.dataSource = new ViewProvinciaAdminDataSource();
  }

  
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  

  idPais= 0;
  ngOnInit(): void {
    this.idPais = this.route.snapshot.params['idPais'];
    this.listarProvincias();
  }

    listaDatos : any = []

    listarProvincias()
    {
      this.ubicacionService.obtenerProvincias(this.idPais).subscribe(
          (res:any)=>{
            this.listaDatos=res
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
          this.provinciaService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.codigoProvincia!= id);
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
  
