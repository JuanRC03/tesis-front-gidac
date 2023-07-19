import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewCantonAdminDataSource, ViewCantonAdminItem } from './view-canton-admin-datasource';
import Swal from 'sweetalert2';
import { CantonService } from 'src/app/services/canton.service';
import { ActivatedRoute } from '@angular/router';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-view-canton-admin',
  templateUrl: './view-canton-admin.component.html',
  styleUrls: ['./view-canton-admin.component.css']
})
export class ViewCantonAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewCantonAdminItem>;
  dataSource: ViewCantonAdminDataSource;


  constructor(private route:ActivatedRoute,
              private cantonService:CantonService,
              private ubicacionService:UbicacionService) {
    this.dataSource = new ViewCantonAdminDataSource();
  }

  
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  

  idPais= 0;
  idProvincia=0;
  ngOnInit(): void {
    this.idPais = this.route.snapshot.params['idPais'];
    this.idProvincia = this.route.snapshot.params['idProvincia'];
    this.listarCantones();
  }

    listaDatos : any = []

    listarCantones()
    {
      this.ubicacionService.obtenerCantones(this.idPais,this.idProvincia).subscribe(
          (res:any)=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }
    eliminar(id:any){
      Swal.fire({
        title:'Eliminar cantón',
        text:'¿Estás seguro de eliminar el cantón?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.cantonService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.codigoCanton!= id);
              Swal.fire('Cantón eliminado','El canton ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el cantón','error');
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
  
