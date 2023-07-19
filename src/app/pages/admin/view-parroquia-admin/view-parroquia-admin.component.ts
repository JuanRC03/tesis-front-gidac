import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewParroquiaAdminDataSource, ViewParroquiaAdminItem } from './view-parroquia-admin-datasource';
import { ActivatedRoute } from '@angular/router';
import { CantonService } from 'src/app/services/canton.service';
import { ParroquiaService } from 'src/app/services/parroquia.service';
import Swal from 'sweetalert2';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-view-parroquia-admin',
  templateUrl: './view-parroquia-admin.component.html',
  styleUrls: ['./view-parroquia-admin.component.css']
})
export class ViewParroquiaAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewParroquiaAdminItem>;
  dataSource: ViewParroquiaAdminDataSource;

  constructor(private route:ActivatedRoute,
              private parroquiaService:ParroquiaService,
              private ubicacionService:UbicacionService ) {

    this.dataSource = new ViewParroquiaAdminDataSource();
  }

  
  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  

  idPais= 0;
  idProvincia=0;
  idCanton=0;
  ngOnInit(): void {
    this.idPais = this.route.snapshot.params['idPais'];
    this.idProvincia = this.route.snapshot.params['idProvincia'];
    this.idCanton = this.route.snapshot.params['idCanton'];
    this.listarParroquias();
  }

    listaDatos : any = []

    listarParroquias()
    {
      this.ubicacionService.obtenerParroquias(this.idPais,this.idProvincia,this.idCanton).subscribe(
          (res:any)=>{
            this.listaDatos = res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar parroquia',
        text:'¿Estás seguro de eliminar la parroquia?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.parroquiaService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.codigoParroquia!= id);
              Swal.fire('Parroquia eliminado','La parroquia ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la parroquia','error');
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
  


