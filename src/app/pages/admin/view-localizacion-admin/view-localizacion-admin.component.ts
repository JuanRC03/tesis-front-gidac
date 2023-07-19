import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewLocalizacionAdminDataSource, ViewLocalizacionAdminItem } from './view-localizacion-admin-datasource';
import Swal from 'sweetalert2';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-view-localizacion-admin',
  templateUrl: './view-localizacion-admin.component.html',
  styleUrls: ['./view-localizacion-admin.component.css']
})
export class ViewLocalizacionAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewLocalizacionAdminItem>;
  dataSource: ViewLocalizacionAdminDataSource;

 

  constructor(private ubicacionService:UbicacionService) {
    this.dataSource = new ViewLocalizacionAdminDataSource();
  }

  displayedColumns = ['dato1', 'dato2','dato3', 'dato4', 'dato5', 'opciones'];
  
  ngAfterViewInit(): void {
  }
    
  ngOnInit(): void {
    
    this.listar();
  }

    listaDatos : any = []
    listaDatosEliminados : any = []

  listar()
    {
      
      this.ubicacionService.listarVigente().subscribe(
          (res:any)=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    listarEliminados()
    {
      
      this.ubicacionService.listarEliminado().subscribe(
          (res:any)=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar localización',
        text:'¿Estás seguro de eliminar la localización?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.ubicacionService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idLocalizacion!= id);
              Swal.fire('Localización eliminada','La localización ha sido eliminada','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la localización','error');
            }
          )
        }
      })
    }
  
    //paginacion y busqueda
    page_size:number=10
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
  
