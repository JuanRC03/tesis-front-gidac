import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewCantonAdminDataSource, ViewCantonAdminItem } from './view-canton-admin-datasource';
import Swal from 'sweetalert2';
import { CantonService } from 'src/app/services/canton.service';
import { ActivatedRoute } from '@angular/router';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(private route: ActivatedRoute,
    private cantonService: CantonService,
    private ubicacionService: UbicacionService,
    private matDialog: MatDialog) {
    this.dataSource = new ViewCantonAdminDataSource();
  }


  displayedColumns = ['dato1', 'dato2', 'opciones'];

  ngAfterViewInit(): void {
  }


  idPais = 0;
  idProvincia = 0;
  ngOnInit(): void {
    this.idPais = this.route.snapshot.params['idPais'];
    this.idProvincia = this.route.snapshot.params['idProvincia'];
    this.listarCantones();
  }

  listaDatos: any = []

  listarCantones() {
    this.ubicacionService.obtenerCantones(this.idPais, this.idProvincia).subscribe(
      (res: any) => {
        this.listaDatos = res;
      },
      err => console.log(err)
    )
  }
  eliminar(id: any) {
    Swal.fire({
      title: 'Eliminar información',
      text: '¿Estás seguro de eliminar el cantón?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ubicacionService.eliminarCantones(this.idPais, this.idProvincia, id).subscribe(
          (data) => {
            Swal.fire('Información eliminada', 'El cantón ha sido eliminado', 'success');
            this.listarCantones();
          },
          (error) => {
            Swal.fire('Error en el sistema', 'Error al eliminar el cantón', 'error');
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

  openDialogAgregar(): void {
    const dialogRef = this.matDialog.open(DialogAddCanton, {
      data: { codigoPais: this.idPais, codigoProvincia: this.idProvincia }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarCantones();
    });
  }

  openDialogEditar(codigo: any, nombre: any): void {
    const dialogRef = this.matDialog.open(DialogEditarCanton, {
      data: { codigoPais: this.idPais, codigoProvincia: this.idProvincia, codigoCanton: codigo, nombreCanton: nombre },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarCantones();
    });
  }
}



interface DatosActualizar {
  codigoPais: '',
  nombrePais: '',
  codigoProvincia: '',
  nombreProvincia: '',
  codigoCanton: '',
  nombreCanton: '',
  codigoParroquia: '',
  nombreParroquia: '',
}

@Component({
  selector: 'add-canton-admin',
  templateUrl: 'add-canton-admin.html',
  styleUrls: ['./view-canton-admin.component.css']
})
export class DialogAddCanton {
  constructor(
    public dialogRef: MatDialogRef<DialogAddCanton>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: UbicacionService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    this.nuevaLocalizacion.codigoPais = this.datos.codigoPais
    this.nuevaLocalizacion.nombrePais = this.datos.nombrePais
    this.nuevaLocalizacion.codigoProvincia = this.datos.codigoProvincia
    this.nuevaLocalizacion.nombreProvincia = this.datos.nombreProvincia
    this.nuevaLocalizacion.codigoCanton = this.datos.codigoCanton
    this.nuevaLocalizacion.nombreCanton = this.datos.nombreCanton
    this.nuevaLocalizacion.codigoParroquia = this.datos.codigoParroquia
    this.nuevaLocalizacion.nombreParroquia = this.datos.nombreParroquia
  }

  public nuevaLocalizacion = {
    codigoPais: '',
    nombrePais: '',
    codigoProvincia: '',
    nombreProvincia: '',
    codigoCanton: '',
    nombreCanton: '',
    codigoParroquia: '',
    nombreParroquia: '',
  }


  formSubmit() {

    if (this.nuevaLocalizacion.codigoCanton == '' || this.nuevaLocalizacion.codigoPais == null) {
      this.snack.open('El código del cantón es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.nuevaLocalizacion.nombreCanton == '' || this.nuevaLocalizacion.codigoPais == null) {
      this.snack.open('El nombre del cantón es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardarCanton(this.nuevaLocalizacion).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'El cantón se agrego con exito', 'success');
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El canton no se agrego', 'error');
      }
    )
  }
}


@Component({
  selector: 'editar-canton-admin',
  templateUrl: 'editar-canton-admin.html',
  styleUrls: ['./view-canton-admin.component.css']
})
export class DialogEditarCanton {
  constructor(
    public dialogRef: MatDialogRef<DialogEditarCanton>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: UbicacionService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    this.nuevaLocalizacion.codigoPais = this.datos.codigoPais
    this.nuevaLocalizacion.nombrePais = this.datos.nombrePais
    this.nuevaLocalizacion.codigoProvincia = this.datos.codigoProvincia
    this.nuevaLocalizacion.nombreProvincia = this.datos.nombreProvincia
    this.nuevaLocalizacion.codigoCanton = this.datos.codigoCanton
    this.nuevaLocalizacion.nombreCanton = this.datos.nombreCanton
    this.nuevaLocalizacion.codigoParroquia = this.datos.codigoParroquia
    this.nuevaLocalizacion.nombreParroquia = this.datos.nombreParroquia

    this.nuevaLocalizacion1.codigoPais = this.datos.codigoPais
    this.nuevaLocalizacion1.nombrePais = this.datos.nombrePais
    this.nuevaLocalizacion1.codigoProvincia = this.datos.codigoProvincia
    this.nuevaLocalizacion1.nombreProvincia = this.datos.nombreProvincia
    this.nuevaLocalizacion1.codigoCanton = this.datos.codigoCanton
    this.nuevaLocalizacion1.nombreCanton = this.datos.nombreCanton
    this.nuevaLocalizacion1.codigoParroquia = this.datos.codigoParroquia
    this.nuevaLocalizacion1.nombreParroquia = this.datos.nombreParroquia
  }

  public nuevaLocalizacion = {
    codigoPais: '',
    nombrePais: '',
    codigoProvincia: '',
    nombreProvincia: '',
    codigoCanton: '',
    nombreCanton: '',
    codigoParroquia: '',
    nombreParroquia: '',
  }

  public nuevaLocalizacion1 = {
    codigoPais: '',
    nombrePais: '',
    codigoProvincia: '',
    nombreProvincia: '',
    codigoCanton: '',
    nombreCanton: '',
    codigoParroquia: '',
    nombreParroquia: '',
  }


  formSubmit() {

    if (this.nuevaLocalizacion.codigoCanton == '' || this.nuevaLocalizacion.codigoPais == null) {
      this.snack.open('El código del cantón es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    if (this.nuevaLocalizacion.nombreCanton == '' || this.nuevaLocalizacion.codigoPais == null) {
      this.snack.open('El nombre del cantón es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }


    const formData = new FormData();
    formData.append('datosBusqueda', JSON.stringify(this.nuevaLocalizacion1));
    formData.append('datosActualizar', JSON.stringify(this.nuevaLocalizacion));

    this.service.actualizarCanton(formData).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'El cantón se ha actualizado con exito', 'success');
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El cantón no se ha actualizado', 'error');
      }
    )
  }
}

