import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewInvestigadorDataSource, ViewInvestigadorItem } from './view-investigador-datasource';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-investigador',
  templateUrl: './view-investigador.component.html',
  styleUrls: ['./view-investigador.component.css']
})
export class ViewInvestigadorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewInvestigadorItem>;
  dataSource: ViewInvestigadorDataSource;

  
  

  constructor(private userServicio:UserService) {
    this.dataSource = new ViewInvestigadorDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminado();
  }

    listaUsuarios : any = []
    listaUsuariosEliminados : any = []

    listarVigentes()
    {
      this.userServicio.obtenerUsuarioRol(3).subscribe(
          res=>{
            this.listaUsuarios=res;
          },
          err=>console.log(err)
        )
    }

    listarEliminado()
    {
      this.userServicio.obtenerUsuarioRolEliminado(3).subscribe(
          res=>{
            this.listaUsuariosEliminados=res;
          },
          err=>console.log(err)
        )
    }
  
    eliminarUsuario(idUsuario:any){
      Swal.fire({
        title:'Eliminar investigador',
        text:'¿Estás seguro de eliminar al investigador?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.userServicio.eliminarUsuario(idUsuario).subscribe(
            (data) => {
              this.listaUsuarios = this.listaUsuarios.filter((usuario:any) => usuario.idUsuario != idUsuario);
              Swal.fire('Investigador eliminado','El investigador ha sido eliminado','success');
              this.listarEliminado();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el investigador','error');
            }
          )
        }
      })
    }

    restaurarUsuario(idUsuario:any){
      Swal.fire({
        title:'Restaurar investigador',
        text:'¿Estás seguro de restaurar al investigador?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.userServicio.restaurarUsuario(idUsuario).subscribe(
            (data) => {
              this.listaUsuariosEliminados = this.listaUsuariosEliminados.filter((usuario:any) => usuario.idUsuario != idUsuario);
              Swal.fire('Investigador restaurado','El investigador ha sido restaurado','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar el investigador','error');
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
  

