import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FamiliaService } from 'src/app/services/familia.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-familia-admin-datos',
  templateUrl: './view-familia-admin-datos.component.html',
  styleUrls: ['./view-familia-admin-datos.component.css']
})
export class ViewFamiliaAdminDatosComponent implements OnInit {

  constructor(private familiaService:FamiliaService,public dialog: MatDialog,) {
    
  }

  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.cargarJerarquia();
    this.cargarHijosRecursivos(0, null);
    //this.listarVigentes();
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
      title:'Eliminar información ',
      text:'¿Esta seguro de eliminar la familia?',
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
            Swal.fire('Información eliminada', 'La familia ha sido eliminada', 'success').then(() => {
              window.location.reload();
            });
            
          },
          (error) => {
            Swal.fire('Error en el sistema','Error al eliminar la familia','error');
          }
        )
      }
    })
  }

  restablecer(id:any){
    Swal.fire({
      title:'Restaurar información',
      text:'¿Esta seguro de restaurar la familia?',
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
            Swal.fire('Información restaurada ', 'La familia ha sido restaurada', 'success');
            this.listarVigentes();
          },
          (error) => {
            Swal.fire('Error','Error al restaurar la familia','error');
          }
        )
      }
    })
  }

  openDialogAgregar(idFamilia:any): void {
    const dialogRef = this.dialog.open(DialogAddFamiliaAdminDatos, {
      data: { idFamilia: idFamilia},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarHijosRecursivos(this.idAgregarEditar, this.idAnterior);
      this.listarVigentes();
    });
    
  }

  openDialogEditar(id:any, codigo:any, descripcion:any): void {
    const dialogRef = this.dialog.open(DialogActualizarFamiliaAdminDatos, {
      data: { idFamilia: id, codigo:codigo, descripcion:descripcion},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarHijosRecursivos(this.idAgregarEditar, this.idAnterior);
      this.listarVigentes();
    });
  }

  hijosFinales!: FamiliaDTO[];
  cargarJerarquia(): void {
    this.familiaService.getHijosFinales().subscribe((hijosFinales: FamiliaDTO[]) => {
      setTimeout(() => {
        this.hijosFinales = hijosFinales;
      });
    });
  }
  hijosRecursivos: any = [];
  hijosRecursivosAux: any = [];
  idPadre:any;
  idAnterior:any;
  datosPadreAnterior:any;

  idAgregarEditar:any;

cargarHijosRecursivos(id:any, idAnterior:any): void {
  this.idAgregarEditar=id;
  this.idAnterior=idAnterior;
  this.familiaService.listarHijosRecursivos(id).subscribe(
    (data:any) => {
      this.hijosRecursivos=data;
      if(this.hijosRecursivos.length>0){
        const ultimoDato= this.hijosRecursivos[0];
        this.idPadre = ultimoDato.idPadre;
      }

    }
  )
  
}

cargarAnterior(id:any): void {

  if(id==null){
    this.idPadre=null;
    id=0;
    this.idAgregarEditar=0;
  }
  this.familiaService.listarHijosRecursivos(id).subscribe(
    (data:any) => {
      this.hijosRecursivos=data;
      this.idAgregarEditar=id;
    }
  )
  if(id!=0){
    this.familiaService.listarPadreAux(id).subscribe(
      (data:any) => {
        this.hijosRecursivosAux=data;
          const ultimoDato= this.hijosRecursivosAux[0];
          this.idAnterior = ultimoDato[3];
      }
    )
  }
  
}

}

export interface FamiliaDTO {
  idFamilia: number;
  descripcion: string;
  descripcionCompleta: string;
  checked: boolean;
}

interface DatosActualizar {
idFamilia: 0,
codigo: '',
descripcion: '',
}

interface datoFamilia {
  idFamilia: 0,
  }

  export interface Familia {
    idFamilia:Number;
    codigo: string;
    descripcion: string;
    vigencia: boolean;
    familia?: Familia; // Relación con el padre
  }

@Component({
selector: 'add-familia-admin-datos',
templateUrl: 'add-familia-admin-datos.html',
styleUrls: ['./view-familia-admin-datos.component.css']
})
export class DialogAddFamiliaAdminDatos {
constructor(
  public dialogRef: MatDialogRef<DialogAddFamiliaAdminDatos>,
  @Inject(MAT_DIALOG_DATA) public datos: datoFamilia,
  private snack: MatSnackBar,
  private service: FamiliaService,
  private changeDetectorRef: ChangeDetectorRef
) { }

onNoClick(): void {
  this.dialogRef.close();
}

investigacion: any = [];

familia: Familia = {
  idFamilia:0,
  codigo: '',
  descripcion: '',
  vigencia: true,
};

idPadreSeleccionado=0;
ngOnInit(): void {; 
 
  if(this.datos.idFamilia!=0){
    this.familia.familia = { idFamilia: this.datos.idFamilia, codigo:'', descripcion:'', vigencia:true } as Familia; 
  }
  
  
}

public afterClosed: EventEmitter<void> = new EventEmitter<void>();

formSubmit() {
  if (this.familia.codigo == '') {
    this.snack.open('El código de la familia es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }

  if (this.familia.descripcion == '') {
    this.snack.open('El nombre de la familia es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }


  this.service.guardar(this.familia).subscribe(
    (data) => {
      Swal.fire('Información guardada ', 'La familia se ha guardado con exito', 'success');
      this.afterClosed.emit();
      this.dialogRef.close();

    }, (error) => {
      console.log(error);
      Swal.fire('Error en el sistema', 'La familia no se ha guardado', 'error');
    }
  )
}


}


export interface FamiliaDTO {
  idFamilia: number;
  descripcion: string;
  descripcionCompleta: string;
}

@Component({
selector: 'actualizar-familia-admin-datos',
templateUrl: 'actualizar-familia-admin-datos.html',
styleUrls: ['./view-familia-admin-datos.component.css']
})
export class DialogActualizarFamiliaAdminDatos {
constructor(
  
  public dialogRef: MatDialogRef<DialogActualizarFamiliaAdminDatos>,
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
  if (this.datos.codigo == '' || this.datos.codigo == null) {
    this.snack.open('El código de la familia es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }

  if (this.datos.descripcion == '' || this.datos.descripcion == null) {
    this.snack.open('El nombre de la familia es requerido !!', 'Aceptar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
    return;
  }

  this.service.actualizar(this.datos).subscribe(
    (data) => {
      Swal.fire('Información actualizada', 'La familia se ha actualizado con exito', 'success');
      this.afterClosed.emit();
      this.dialogRef.close();

    }, (error) => {
      console.log(error);
      Swal.fire('Error en el sistema', 'La familia no se ha actualizado', 'error');
    }
  )
}
}

