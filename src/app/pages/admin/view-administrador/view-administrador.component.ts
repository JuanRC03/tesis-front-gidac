import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAdministradorDataSource, ViewAdministradorItem } from './view-administrador-datasource';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-administrador',
  templateUrl: './view-administrador.component.html',
  styleUrls: ['./view-administrador.component.css']
})
export class ViewAdministradorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewAdministradorItem>;
  dataSource: ViewAdministradorDataSource;

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];

  constructor(private userServicio:UserService) {
    this.dataSource = new ViewAdministradorDataSource();
  }

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminado();
  }

    listaUsuarios : any = []
    usuarios : any = []
    listaUsuariosEliminados : any = []

    listarVigentes()
    {
      this.userServicio.obtenerUsuarioRol(1).subscribe(
          res=>{
            this.usuarios=res;
            this.listaUsuarios = this.usuarios.filter((usuario: any) => usuario.idUsuario !== 1);
          },
          err=>console.log(err)
        )
    }

    listarEliminado()
    {
      this.userServicio.obtenerUsuarioRolEliminado(1).subscribe(
          res=>{
            this.listaUsuariosEliminados=res;
          },
          err=>console.log(err)
        )
    }
  
    eliminarUsuario(idUsuario:any){
      Swal.fire({
        title:'Eliminar administrador',
        text:'¿Estás seguro de eliminar al administrador?',
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
              Swal.fire('Administrador eliminado','El administrador ha sido eliminado','success');
              this.listarEliminado();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el administrador','error');
            }
          )
        }
      })
    }

    restaurarUsuario(idUsuario:any){
      Swal.fire({
        title:'Restaurar administrador',
        text:'¿Estás seguro de restaurar al administrador?',
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
              Swal.fire('Administrador restaurado','El administrador ha sido restaurado','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar el administrador','error');
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
  
