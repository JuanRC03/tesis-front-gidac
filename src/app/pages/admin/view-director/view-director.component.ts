import { AfterViewInit, Component, ViewChild, EventEmitter, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewDirectorDataSource, ViewDirectorItem } from './view-director-datasource';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-director',
  templateUrl: './view-director.component.html',
  styleUrls: ['./view-director.component.css']
})
export class ViewDirectorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewDirectorItem>;
  dataSource: ViewDirectorDataSource;

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];
  displayedColumnsEliminados = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];

  constructor(private userServicio: UserService,
    public dialog: MatDialog) {
    this.dataSource = new ViewDirectorDataSource();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminado();
  }

  listaUsuarios: any = []
  listaUsuariosEliminados: any = []

  listarVigentes() {
    this.userServicio.obtenerUsuarioRol(2).subscribe(
      res => {
        this.listaUsuarios = res;
      },
      err => console.log(err)
    )
  }

  listarEliminado() {
    this.userServicio.obtenerUsuarioRolEliminado(2).subscribe(
      res => {
        this.listaUsuariosEliminados = res;
      },
      err => console.log(err)
    )
  }

  eliminarUsuario(idUsuario: any) {
    Swal.fire({
      title: 'Eliminar información ',
      text: '¿Estás seguro de eliminar al director?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if(result.isConfirmed){
        Swal.fire({
          title:'Eliminar proyectos',
          text:'¿Quiere eliminar los proyectos del director?',
          icon:'warning',
          showCancelButton:true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor:'#d33',
          confirmButtonText:'Si',
          cancelButtonText:'No'
        }).then((result) => {

          if(result.isConfirmed){
            this.userServicio.eliminarDirector(idUsuario).subscribe(
              (data) => {
                this.listaUsuarios = this.listaUsuarios.filter((usuario:any) => usuario.idUsuario != idUsuario);
                Swal.fire('Información eliminada', 'El director ha sido eliminado', 'success');
                this.listarEliminado();
              },
              (error) => {
                Swal.fire('Error en el sistema', 'Error al eliminar el director', 'error');
              }
            )
          }else {
            this.userServicio.eliminarUsuario(idUsuario).subscribe(
              (data) => {
                this.listaUsuarios = this.listaUsuarios.filter((usuario:any) => usuario.idUsuario != idUsuario);
                Swal.fire('Información eliminada', 'El director ha sido eliminado', 'success');
                this.listarEliminado();
              },
              (error) => {
                Swal.fire('Error en el sistema', 'Error al eliminar el director', 'error');
              }
            )
          }
          
        })
      }

    })
  }

  restaurarUsuario(idUsuario: any) {
    Swal.fire({
      title: 'Restaurar información ',
      text: '¿Estás seguro de restaurar al director?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Restaurar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServicio.restaurarUsuario(idUsuario).subscribe(
          (data) => {
            this.listaUsuariosEliminados = this.listaUsuariosEliminados.filter((usuario: any) => usuario.idUsuario != idUsuario);
            Swal.fire('Información restaurada ', 'El director ha sido restaurado', 'success');
            this.listarVigentes();
          },
          (error) => {
            Swal.fire('Error', 'Error al restaurar el director', 'error');
          }
        )
      }
    })
  }



  //paginacion y busqueda
  page_size: number = 5
  page_number: number = 1
  page_size_options = [5, 10, 20, 50, 100]

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

  public search: string = '';

  onSearch(search: string) {
    this.search = search;
  }


  editar(id: any, dato1: any, dato2: any, dato3: any, dato4: any, dato5: any): void {
    const dialogRef = this.dialog.open(EditarDirector, {
      data: { idUsuario: id, nombreUsuario: dato1, apellidoUsuario: dato2, cedula: dato3, telefono: dato4, email: dato5},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }

  agregar(): void {
    const dialogRef = this.dialog.open(AgregarDirector, {});
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }

}



export interface dataEditar {
  idUsuario: 0,
  nombreUsuario: '',
  apellidoUsuario: '',
  cedula: '',
  telefono: '',
  email: '',
  vigencia: 1,
  idRol: 2
}



@Component({
  selector: 'agregar-director',
  templateUrl: 'agregar-director.html',
  styleUrls: ['./view-director.component.css']
})

export class AgregarDirector {
  constructor(
    public dialogRef: MatDialogRef<AgregarDirector>,
    private userService: UserService,
    private snack: MatSnackBar,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  public data = {
    nombreUsuario: '',
    apellidoUsuario: '',
    cedula: '',
    telefono: '',
    email: '',
    vigencia: 1,
    rol: {
      idRol: 2
    }
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {
    if (this.data.nombreUsuario.trim() == '' || this.data.nombreUsuario.trim() == null) {
      this.snack.open('El nombre del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.apellidoUsuario.trim() == '' || this.data.apellidoUsuario.trim() == null) {
      this.snack.open('El apellido del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.cedula.trim() == '' || this.data.cedula.trim() == null) {
      this.snack.open('La cédula del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.telefono.trim() == '' || this.data.telefono.trim() == null) {
      this.snack.open('El teléfono del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.email.trim() == '' || this.data.email.trim() == null) {
      this.snack.open('El email del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }


    this.userService.aniadirUsuario(this.data).subscribe(
      (data) => {
        Swal.fire('Información agregada', 'El director se agrego con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego el director', 'error');
        console.log(error);
      }
    );

  }

}





@Component({
  selector: 'editar-director',
  templateUrl: 'editar-director.html',
  styleUrls: ['./view-director.component.css']
})

export class EditarDirector {
  constructor(
    public dialogRef: MatDialogRef<EditarDirector>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private userService: UserService,
    private snack: MatSnackBar,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.data.idUsuario = this.data1.idUsuario;
    this.data.nombreUsuario = this.data1.nombreUsuario;
    this.data.apellidoUsuario = this.data1.apellidoUsuario;
    this.data.cedula = this.data1.cedula;
    this.data.telefono = this.data1.telefono;
    this.data.email = this.data1.email;
  }

  public data = {
    idUsuario: 0,
    nombreUsuario: '',
    apellidoUsuario: '',
    cedula: '',
    telefono: '',
    email: '',
    vigencia: 1,
    rol: {
      idRol: 2
    }
  }





  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public editar() {
    if (this.data.nombreUsuario.trim() == '' || this.data.nombreUsuario.trim() == null) {
      this.snack.open('El nombre del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.apellidoUsuario.trim() == '' || this.data.apellidoUsuario.trim() == null) {
      this.snack.open('El apellido del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.cedula.trim() == '' || this.data.cedula.trim() == null) {
      this.snack.open('La cédula del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.telefono.trim() == '' || this.data.telefono.trim() == null) {
      this.snack.open('El teléfono del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.email.trim() == '' || this.data.email.trim() == null) {
      this.snack.open('El email del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }


    this.userService.actualizarUsuario(this.data).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'El director se actualizado con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se actualizo el director', 'error');
        console.log(error);
      }
    );

  }

}

