import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UsuariosTableDataSource, UsuariosTableItem } from './usuarios-table-datasource';
import  Swal  from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html',
  styleUrls: ['./usuarios-table.component.css']
})
export class UsuariosTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UsuariosTableItem>;
  dataSource: UsuariosTableDataSource;
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'dato6',  'opciones'];

  constructor(private userServicio:UserService) {
    this.dataSource = new UsuariosTableDataSource();
  }

  listaUsuarios : any = []

  ngOnInit(): void {
    this.listar();
  }


  listar()
  {
    this.userServicio.listarUsuariosNormales().subscribe(
        res=>{
          this.listaUsuarios=res;
        },
        err=>console.log(err)
      )
  }

  eliminarUsuario(idUsuario:any){
    Swal.fire({
      title:'Eliminar ubicació',
      text:'¿Estás seguro de eliminar la ubicacion?',
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
            this.listaUsuarios = this.listaUsuarios.filter((usuario:any) => usuario.id != idUsuario);
            Swal.fire('Ubicacion eliminada','La ubicacion ha sido eliminado de la base de datos','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la ubicacion','error');
          }
        )
      }
    })
  }

  ngAfterViewInit(): void {
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
