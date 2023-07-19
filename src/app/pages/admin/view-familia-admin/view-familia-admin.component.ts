import { AfterViewInit, Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewFamiliaAdminDataSource, ViewFamiliaAdminItem } from './view-familia-admin-datasource';
import { FamiliaService } from 'src/app/services/familia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-familia-admin',
  templateUrl: './view-familia-admin.component.html',
  styleUrls: ['./view-familia-admin.component.css']
})
export class ViewFamiliaAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewFamiliaAdminItem>;
  dataSource: ViewFamiliaAdminDataSource;

  constructor(private familiaService:FamiliaService,public dialog: MatDialog,) {
    this.dataSource = new ViewFamiliaAdminDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
  }

    listaDatos : any = []
    listaDatosEliminados : any = []

    listarVigentes()
    {
      this.familiaService.listarVigentes().subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    listarEliminados()
    {
      this.familiaService.listarEliminados().subscribe(
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
    
    public search: string = '';
  
    onSearch( search: string ) {
      this.search = search;
    }
  
  eliminar(id:any){
    Swal.fire({
      title:'Eliminar clasificación',
      text:'¿Esta seguro de eliminar la clasificación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.familiaService.eliminar(id).subscribe(
          (data) => {
            this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idFamilia != id);
            Swal.fire('Clasificación eliminada', 'La clasificación ha sido eliminada', 'success');
            this.listarEliminados();
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la clasificación','error');
          }
        )
      }
    })
  }

  restablecer(id:any){
    Swal.fire({
      title:'Restaurar clasificación',
      text:'¿Esta seguro de restaurar la clasificación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Restaurar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.familiaService.eliminar(id).subscribe(
          (data) => {
            this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idFamilia != id);
            Swal.fire('Clasificación restaurada', 'La clasificación ha sido restaurada', 'success');
            this.listarVigentes();
          },
          (error) => {
            Swal.fire('Error','Error al restaurar la clasificación','error');
          }
        )
      }
    })
  }

  openDialogAgregar(): void {
    const dialogRef = this.dialog.open(DialogAddFamiliaAdmin, {});
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
    
  }

  openDialogEditar(id:any, nombre:any, descripcion:any): void {
    const dialogRef = this.dialog.open(DialogActualizarFamiliaAdmin, {
      data: { idFamilia: id, nombreFamilia:nombre, descripcion:descripcion},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }
}

interface DatosActualizar {
idFamilia: 0,
nombreFamilia: '',
descripcion: '',

}

@Component({
selector: 'add-familia-admin',
templateUrl: 'add-familia-admin.html',
styleUrls: ['./view-familia-admin.component.css']
})
export class DialogAddFamiliaAdmin {
constructor(
  public dialogRef: MatDialogRef<DialogAddFamiliaAdmin>,
  private snack: MatSnackBar,
  private service: FamiliaService,

) { }

onNoClick(): void {
  this.dialogRef.close();
}

investigacion: any = [];

datos = {
  nombreFamilia: '',
  descripcion: ''
}

ngOnInit(): void {
  
}

public afterClosed: EventEmitter<void> = new EventEmitter<void>();

formSubmit() {
  if (this.datos.nombreFamilia == '' || this.datos.nombreFamilia == null) {
    this.snack.open('El nombre de la clasificación es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }

  if (this.datos.descripcion == '' || this.datos.descripcion == null) {
    this.snack.open('La descripción es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }

  this.service.guardar(this.datos).subscribe(
    (data) => {
      Swal.fire('Clasificación guardada', 'La clasificación se ha guardado con exito', 'success');
      this.afterClosed.emit();
      this.dialogRef.close();

    }, (error) => {
      console.log(error);
      Swal.fire('Error al guardar la clasificación ', 'La clasificación no se ha guardado', 'error');
    }
  )
}
}


@Component({
selector: 'actualizar-familia-admin',
templateUrl: 'actualizar-familia-admin.html',
styleUrls: ['./view-familia-admin.component.css']
})
export class DialogActualizarFamiliaAdmin {
constructor(
  
  public dialogRef: MatDialogRef<DialogActualizarFamiliaAdmin>,
  @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
  private snack: MatSnackBar,
  private service: FamiliaService,

) { }

public afterClosed: EventEmitter<void> = new EventEmitter<void>();

onNoClick(): void {
  this.dialogRef.close();
}

investigacion: any = [];

ngOnInit(): void {
  
}

formSubmit() {
  if (this.datos.nombreFamilia == '' || this.datos.nombreFamilia == null) {
    this.snack.open('El nombre de la clasificación es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }

  if (this.datos.descripcion == '' || this.datos.descripcion == null) {
    this.snack.open('La descripción es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }

  this.service.guardar(this.datos).subscribe(
    (data) => {
      Swal.fire('Clasificación actualizada', 'La clasificación se ha actualizado con exito', 'success');
      this.afterClosed.emit();
      this.dialogRef.close();

    }, (error) => {
      console.log(error);
      Swal.fire('Error al actualizar la clasificación', 'La clasificación no se ha actualizado', 'error');
    }
  )
}
}





  