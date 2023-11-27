import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreasInvestigacionService } from 'src/app/services/areas-investigacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-area-investigaciones-admin',
  templateUrl: './view-area-investigaciones-admin.component.html',
  styleUrls: ['./view-area-investigaciones-admin.component.css']
})
export class ViewAreaInvestigacionesAdminComponent implements OnInit {

  listaDatosVigentes: any = []

  listaDatosEliminados: any = []

  constructor(private areasInvestigacionService: AreasInvestigacionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminados();
  }

  listarVigentes() {

    this.areasInvestigacionService.obtenerAreasInvestigacionVigentes().subscribe(
      (dato: any) => {
        this.listaDatosVigentes = dato;
      },
      (error) => {
        console.log(error);

      }
    )

  }
  listarEliminados() {
    this.areasInvestigacionService.obtenerAreasInvestigacionEliminadas().subscribe(
      (dato: any) => {
        this.listaDatosEliminados = dato;
      },
      (error) => {
        console.log(error);

      }
    )
  }

  //paginacion y busqueda
  page_size: number = 5
  page_number: number = 1
  page_size_options = [5, 10, 20, 50, 100]

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

  page_number1: number = 1
  handlePage1(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number1 = e.pageIndex + 1
  }

  public search: string = '';

  onSearch(search: string) {
    this.search = search;
  }

  eliminar(idAreaInvestigacion: any) {
    Swal.fire({
      title: 'Eliminar información',
      text: '¿Esta seguro de eliminar el área de investigación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areasInvestigacionService.eliminarAreaInvestigacion(idAreaInvestigacion).subscribe(
          (data) => {
            this.listaDatosVigentes = this.listaDatosVigentes.filter((areasInvestigaciones: any) => areasInvestigaciones.idAreaInvestigacion != idAreaInvestigacion);
            Swal.fire('Información eliminada', 'El área de investigación ha sido eliminada', 'success');
            this.listarEliminados();
          },
          (error) => {
            Swal.fire('Error en el sistema', 'Error al eliminar el área de investigación', 'error');
          }
        )
      }
    })
  }

  restablecer(idAreaInvestigacion: any) {
    Swal.fire({
      title: 'Restaurar información',
      text: '¿Esta seguro de restaurar el área de investigación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Restaurar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areasInvestigacionService.restaurarAreaInvestigacion(idAreaInvestigacion).subscribe(
          (data) => {
            this.listaDatosEliminados = this.listaDatosEliminados.filter((areasInvestigacionesEliminadas: any) => areasInvestigacionesEliminadas.idAreaInvestigacion != idAreaInvestigacion);
            Swal.fire('Información restaurada', 'El área de investigación ha sido restaurada', 'success');
            this.listarVigentes();
          },
          (error) => {
            Swal.fire('Error en el sistema', 'Error al restaurar el área de investigacion', 'error');
          }
        )
      }
    })
  }

  openDialogAgregar(): void {
    const dialogRef = this.dialog.open(DialogAddAreaInvestigacionAdmin, {});
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });

  }

  openDialogEditar(id: any, nombre: any): void {
    const dialogRef = this.dialog.open(DialogActualizarAreaInvestigacionAdmin, {
      data: { idAreaInvestigacion: id, nombreAreaInvestigacion: nombre },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }
}

interface DatosActualizar {
  idAreaInvestigacion: 0,
  nombreAreaInvestigacion: '',
}

@Component({
  selector: 'add-area-investigacion-admin',
  templateUrl: 'add-area-investigacion-admin.html',
  styleUrls: ['./view-area-investigaciones-admin.component.css']
})
export class DialogAddAreaInvestigacionAdmin {
  constructor(
    public dialogRef: MatDialogRef<DialogAddAreaInvestigacionAdmin>,
    private snack: MatSnackBar,
    private service: AreasInvestigacionService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    nombreAreaInvestigacion: ''
  }

  ngOnInit(): void {

  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  formSubmit() {
    if (this.datos.nombreAreaInvestigacion == '' || this.datos.nombreAreaInvestigacion == null) {
      this.snack.open('El nombre del área de investigación es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.aniadirAreaInvestigacion(this.datos).subscribe(
      (data) => {
        Swal.fire('Información guardada ', 'El área de investigación se agrego con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El área de investigación no se agrego', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-area-investigacion-admin',
  templateUrl: 'actualizar-area-investigacion-admin.html',
  styleUrls: ['./view-area-investigaciones-admin.component.css']
})
export class DialogActualizarAreaInvestigacionAdmin {
  constructor(

    public dialogRef: MatDialogRef<DialogActualizarAreaInvestigacionAdmin>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: AreasInvestigacionService,

  ) { }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {

  }

  formSubmit() {
    if (this.datos.nombreAreaInvestigacion == '' || this.datos.nombreAreaInvestigacion == null) {
      this.snack.open('El nombre del área de investigación es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.actualizarAreaInvestigacion(this.datos).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'El área de investigación se ha actualizado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El área de investigación no se ha actualizado', 'error');
      }
    )
  }
}




