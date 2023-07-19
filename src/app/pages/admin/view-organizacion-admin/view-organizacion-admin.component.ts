import { AfterViewInit, Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewOrganizacionAdminDataSource, ViewOrganizacionAdminItem } from './view-organizacion-admin-datasource';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-organizacion-admin',
  templateUrl: './view-organizacion-admin.component.html',
  styleUrls: ['./view-organizacion-admin.component.css']
})
export class ViewOrganizacionAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewOrganizacionAdminItem>;
  dataSource: ViewOrganizacionAdminDataSource;

  constructor(private service:OrganizacionService,
    public dialog: MatDialog,) {
    this.dataSource = new ViewOrganizacionAdminDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
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


    eliminar(id:any){
      Swal.fire({
        title:'Eliminar organización',
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
              Swal.fire('Organización eliminada','la organización ha sido eliminada','success');
              //this.listarEliminado();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la organización','error');
            }
          )
        }
      })
    }
    
    openDialogAgregar(): void {
      const dialogRef = this.dialog.open(DialogAddOrganizacionAdmin, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listar();
      });
      
    }

    openDialogEditar(id:any, nombre:any, siglas:any, descripcion:any): void {
      const dialogRef = this.dialog.open(DialogActualizarOrganizacionAdmin, {
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
  selector: 'add-organizacion-admin',
  templateUrl: 'add-organizacion-admin.html',
  styleUrls: ['./view-organizacion-admin.component.css']
})
export class DialogAddOrganizacionAdmin {
  constructor(
    public dialogRef: MatDialogRef<DialogAddOrganizacionAdmin>,
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
      this.snack.open('Las siglas de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datos.descripcion == '' || this.datos.descripcion == null) {
      this.snack.open('El email es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Organización guardada', 'La organización se ha guardado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error al guardar la organización', 'La organización no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-organizacion-admin',
  templateUrl: 'actualizar-organizacion-admin.html',
  styleUrls: ['./view-organizacion-admin.component.css']
})
export class DialogActualizarOrganizacionAdmin {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarOrganizacionAdmin>,
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
      this.snack.open('Las siglas de la organización es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.datos.descripcion == '' || this.datos.descripcion == null) {
      this.snack.open('El email es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Organización actualizada', 'La organización se ha actualizado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error al actualizar la organización', 'La organización no se ha actualizado', 'error');
      }
    )
  }
}
