import { AfterViewInit, Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewInvestigadorDataSource, ViewInvestigadorItem } from './view-investigador-datasource';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  
  

  constructor(private userServicio:UserService,
    public dialog: MatDialog) {
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
  

    
    editar(id:any, dato1:any, dato2:any, dato3:any, dato4:any, dato5:any): void {
      const dialogRef = this.dialog.open(EditarInvestigador, {
        data: { idUsuario: id, nombreUsuario:dato1,apellidoUsuario:dato2,cedula:dato3,telefono:dato4,email:dato5},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }

  }
  

  
export interface dataEditar {
  idUsuario:0,
  nombreUsuario: '',
  apellidoUsuario: '',
  cedula:'',
  telefono:'',
  email: '',
  vigencia: 1,
  idRol: 1
}





@Component({
selector: 'editar-investigador',
templateUrl: 'editar-investigador.html',
styleUrls: ['./view-investigador.component.css']
})

export class EditarInvestigador {
constructor(
  public dialogRef: MatDialogRef<EditarInvestigador>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private userService:UserService,
  private snack: MatSnackBar,
) { }

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.data.idUsuario=this.data1.idUsuario;
  this.data.nombreUsuario=this.data1.nombreUsuario;
  this.data.apellidoUsuario=this.data1.apellidoUsuario;
  this.data.cedula=this.data1.cedula;
  this.data.telefono=this.data1.telefono;
  this.data.email=this.data1.email;
  this.data.rol.idRol=this.data1.idRol;
}

public data = {
  idUsuario:0,
  nombreUsuario: '',
  apellidoUsuario: '',
  cedula:'',
  telefono:'',
  email: '',
  vigencia: 1,
  rol: {
    idRol: 1
  }
}





public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public editar() {
  if (this.data.nombreUsuario.trim() == '' || this.data.nombreUsuario.trim() == null) {
    this.snack.open('El nombre del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.apellidoUsuario.trim() == '' || this.data.apellidoUsuario.trim() == null) {
    this.snack.open('El apellido del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.cedula.trim() == '' || this.data.cedula.trim() == null) {
    this.snack.open('La cédula del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  if (this.data.telefono.trim() == '' || this.data.telefono.trim() == null) {
    this.snack.open('El teléfono del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.email.trim() == '' || this.data.email.trim() == null) {
    this.snack.open('El email del administrador es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  

  this.userService.editarPerfil(this.data).subscribe(
    (data) => {
      Swal.fire('Administrador actualizado', 'El administrador se actualizado con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error al actualizadar al administrador', 'No se actualizado al administrador', 'error');
      console.log(error);
    }
  );
    
  }

}
  

