import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoInvestigacionService } from 'src/app/services/tipo-investigacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tipo-investigacion-admin',
  templateUrl: './view-tipo-investigacion-admin.component.html',
  styleUrls: ['./view-tipo-investigacion-admin.component.css']
})
export class ViewTipoInvestigacionAdminComponent implements OnInit {

  constructor(private tipoInvestigacionService:TipoInvestigacionService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminados();
  }

    listaDatosVigentes : any = []
    listaDatosEliminados : any = []

    listarVigentes()
    {
      this.tipoInvestigacionService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaDatosVigentes=res;
          },
          err=>console.log(err)
        )
    }
    listarEliminados()
    {
      this.tipoInvestigacionService.listarEliminados().subscribe(
          (res:any)=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar el tipo de investigación?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.tipoInvestigacionService.eliminar(id).subscribe(
            (data) => {
              this.listaDatosVigentes = this.listaDatosVigentes.filter((datos:any) => datos.idTipoInvestigacion!= id);
              Swal.fire('Información eliminada','El tipo de investigación ha sido eliminado','success');
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el tipo de investigación','error');
            }
          )
        }
      })
    }

    restablecer(id:any){
      Swal.fire({
        title:'Restaurar información',
        text:'¿Estás seguro de restaurar el tipo de investigación?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.tipoInvestigacionService.restablecer(id).subscribe(
            (data) => {
              this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idTipoInvestigacion!= id);
              Swal.fire('Información restaurada','El tipo de investigación ha sido restaurada','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar el tipo de investigación','error');
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
  
    openDialogAgregar(): void {
      const dialogRef = this.dialog.open(DialogAddTipoInvestigacionAdmin, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
      
    }

    openDialogEditar(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(DialogActualizarTipoInvestigacionAdmin, {
        data: { idTipoInvestigacion: id, nombreTipoInvestigacion:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
}

interface DatosActualizar {
  idTipoInvestigacion: 0,
  nombreTipoInvestigacion: '',
}
  
@Component({
  selector: 'add-tipo-investigacion-admin',
  templateUrl: 'add-tipo-investigacion-admin.html',
  styleUrls: ['./view-tipo-investigacion-admin.component.css']
})
export class DialogAddTipoInvestigacionAdmin {
  constructor(
    public dialogRef: MatDialogRef<DialogAddTipoInvestigacionAdmin>,
    private snack: MatSnackBar,
    private service: TipoInvestigacionService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    nombreTipoInvestigacion: ''
  }

  ngOnInit(): void {
    
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  formSubmit() {
    if (this.datos.nombreTipoInvestigacion == '' || this.datos.nombreTipoInvestigacion == null) {
      this.snack.open('El nombre del tipo de investigación es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información guardada ', 'El tipo de investigación se ha guardado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El tipo de investigación no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-tipo-investigacion-admin',
  templateUrl: 'actualizar-tipo-investigacion-admin.html',
  styleUrls: ['./view-tipo-investigacion-admin.component.css']
})
export class DialogActualizarTipoInvestigacionAdmin {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarTipoInvestigacionAdmin>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: TipoInvestigacionService,

  ) { }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    
  }

  formSubmit() {
    if (this.datos.nombreTipoInvestigacion == '' || this.datos.nombreTipoInvestigacion == null) {
      this.snack.open('El nombre del tipo de investigación es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.actualizar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'EL tipo de investigación se ha actualizado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'EL tipo de investigación no se ha actualizado', 'error');
      }
    )
  }
}

  

