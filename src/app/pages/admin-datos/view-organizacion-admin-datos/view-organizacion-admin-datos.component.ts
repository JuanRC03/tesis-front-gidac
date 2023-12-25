import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-organizacion-admin-datos',
  templateUrl: './view-organizacion-admin-datos.component.html',
  styleUrls: ['./view-organizacion-admin-datos.component.css']
})
export class ViewOrganizacionAdminDatosComponent implements OnInit {

  constructor(private service:OrganizacionService,
    public dialog: MatDialog) {
  }

  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
    this.listarEliminados();
  }

    listaDatos : any = []

    listar()
    {
      this.service.listar().subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    listaDatosEliminados : any = []

    listarEliminados()
    {
      this.service.listarEliminados().subscribe(
          res=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }
  
    //paginacion y busqueda
    page_size:number=5
    page_number:number=1
    page_size_options=[5,10,20,50,100]
  
    handlePage(e: PageEvent){
      this.page_size=e.pageSize
      this.page_number=e.pageIndex + 1
    }

    page_number1: number = 1
    handlePage1(e: PageEvent) {
      this.page_size = e.pageSize
      this.page_number1 = e.pageIndex + 1
    }
    
    public search: string = '';
  
    onSearch( search: string ) {
      this.search = search;
    }


    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información ',
        text:'¿Estás seguro de eliminar la organización?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.service.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datosAux:any) => datosAux.idOrganizacion != id);
              Swal.fire('Información eliminada','La organización ha sido eliminada','success');
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la organización','error');
            }
          )
        }
      })
    }

    restablecer(id:any){
      Swal.fire({
        title:'Restaurar información',
        text:'¿Estás seguro de restaurar la organización?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.service.restablecer(id).subscribe(
            (data) => {
              this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idOrganizacion!= id);
              Swal.fire('Información restaurada','La organización ha sido restaurada','success');
              this.listar();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar la organización','error');
            }
          )
        }
      })
    }
    
    openDialogAgregar(): void {
      const dialogRef = this.dialog.open(DialogAddOrganizacionAdminDatos, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listar();
      });
      
    }

    openDialogEditar(id:any, nombre:any, siglas:any, descripcion:any): void {
      const dialogRef = this.dialog.open(DialogActualizarOrganizacionAdminDatos, {
        data: { idOrganizacion: id, nombreOrganizacion:nombre, siglas:siglas, descripcion:descripcion},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listar();
      });
    }
}

interface DatosActualizar {
  idOrganizacion: 0,
  nombreOrganizacion: '',
  siglas: '',
  descripcion: '',
}
  
@Component({
  selector: 'add-organizacion-admin-datos',
  templateUrl: 'add-organizacion-admin-datos.html',
  styleUrls: ['./view-organizacion-admin-datos.component.css']
})
export class DialogAddOrganizacionAdminDatos {
  constructor(
    public dialogRef: MatDialogRef<DialogAddOrganizacionAdminDatos>,
    private snack: MatSnackBar,
    private service: OrganizacionService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    nombreOrganizacion: '',
    siglas: '',
    descripcion: '',
  }

  ngOnInit(): void {
    
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  formSubmit() {
    if (this.datos.nombreOrganizacion == '' || this.datos.nombreOrganizacion == null) {
      this.snack.open('El nombre de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datos.siglas == '' || this.datos.siglas == null) {
      this.snack.open('La sigla de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datos.descripcion == '' || this.datos.descripcion == null) {
      this.snack.open('La descripción de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información guardada ', 'La organización se ha guardado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'La organización no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-organizacion-admin-datos',
  templateUrl: 'actualizar-organizacion-admin-datos.html',
  styleUrls: ['./view-organizacion-admin-datos.component.css']
})
export class DialogActualizarOrganizacionAdminDatos {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarOrganizacionAdminDatos>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: OrganizacionService,

  ) { }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    
  }

  formSubmit() {
    if (this.datos.nombreOrganizacion == '' || this.datos.nombreOrganizacion == null) {
      this.snack.open('El nombre de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datos.siglas == '' || this.datos.siglas == null) {
      this.snack.open('La sigla de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datos.descripcion == '' || this.datos.descripcion == null) {
      this.snack.open('La descripción de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.actualizar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'La organización se ha actualizado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'La organización no se ha actualizado', 'error');
      }
    )
  }
}
