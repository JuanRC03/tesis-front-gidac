import { AfterViewInit, Component, Inject, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAdministradorDataSource, ViewAdministradorItem } from './view-administrador-datasource';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private userServicio: UserService,
    public dialog: MatDialog,
    public login:LoginService) {
    this.dataSource = new ViewAdministradorDataSource();
  }

  ngAfterViewInit(): void {
  }

  usuarioAdmin: any = null;
  ngOnInit(): void {
    this.usuarioAdmin = this.login.getUser();
    this.listarVigentes();
    this.listarEliminado();
  }

  listaUsuarios: any = []
  usuarios: any = []
  listaUsuariosEliminados: any = []

  listarVigentes() {
    this.userServicio.obtenerUsuarioRol(1).subscribe(
      res => {
        this.usuarios = res;
        this.listaUsuarios = this.usuarios.filter((usuario: any) => usuario.idUsuario !== 1);
        this.listaUsuarios = this.listaUsuarios.filter((usuario: any) => usuario.idUsuario !== this.usuarioAdmin.idUsuario)
        console.log(res)
      },
      err => console.log(err)
    )
  }

  listarEliminado() {
    this.userServicio.obtenerUsuarioRolEliminado(1).subscribe(
      res => {
        this.listaUsuariosEliminados = res;
      },
      err => console.log(err)
    )
  }

  eliminarUsuario(idUsuario: any) {
    Swal.fire({
      title: 'Eliminar información',
      text: '¿Estás seguro de eliminar al administrador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServicio.eliminarUsuario(idUsuario).subscribe(
          (data) => {
            this.listaUsuarios = this.listaUsuarios.filter((usuario: any) => usuario.idUsuario != idUsuario);
            Swal.fire('Información eliminada', 'El administrador ha sido eliminado', 'success');
            this.listarEliminado();
          },
          (error) => {
            Swal.fire('Error en el sistema', 'Error al eliminar el administrador', 'error');
          }
        )
      }
    })
  }

  restaurarUsuario(idUsuario: any) {
    Swal.fire({
      title: 'Restaurar información',
      text: '¿Estás seguro de restaurar al administrador?',
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
            Swal.fire('Información restaurada', 'El administrador ha sido restaurado', 'success');
            this.listarVigentes();
          },
          (error) => {
            Swal.fire('Error en el sistema', 'Error al restaurar el administrador', 'error');
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
    const dialogRef = this.dialog.open(EditarAdministrador, {
      data: { idUsuario: id, nombreUsuario: dato1, apellidoUsuario: dato2, cedula: dato3, telefono: dato4, email: dato5 },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }

  agregar(): void {
    const dialogRef = this.dialog.open(AgregarAdministrador, {
    });
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
  vigencia: 1
}

@Component({
  selector: 'agregar-administrador',
  templateUrl: 'agregar-administrador.html',
  styleUrls: ['./view-administrador.component.css']
})

export class AgregarAdministrador {
  constructor(
    public dialogRef: MatDialogRef<AgregarAdministrador>,
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
      idRol: 1
    }
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {
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


    this.userService.actualizarUsuario(this.data).subscribe(
      (data) => {
        Swal.fire('Información agregada', 'El administrador agregado con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego el administrador', 'error');
        console.log(error);
      }
    );

  }

}



@Component({
  selector: 'editar-administrador',
  templateUrl: 'editar-administrador.html',
  styleUrls: ['./view-administrador.component.css']
})

export class EditarAdministrador {
  constructor(
    public dialogRef: MatDialogRef<EditarAdministrador>,
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


    this.userService.actualizarUsuario(this.data).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'El administrador actualizado con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se actualizo el administrador', 'error');
        console.log(error);
      }
    );

  }

}