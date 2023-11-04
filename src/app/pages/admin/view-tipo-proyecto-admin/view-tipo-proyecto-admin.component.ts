import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoProyectoService } from 'src/app/services/tipo-proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-tipo-proyecto-admin',
  templateUrl: './view-tipo-proyecto-admin.component.html',
  styleUrls: ['./view-tipo-proyecto-admin.component.css']
})
export class ViewTipoProyectoAdminComponent implements OnInit {

  constructor(private tipoProyectoService:TipoProyectoService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminados();
  }

    listaDatosVigentes : any = []
    listaDatosEliminados : any = []

    listarVigentes()
    {
      this.tipoProyectoService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaDatosVigentes=res;
          },
          err=>console.log(err)
        )
    }
    listarEliminados()
    {
      this.tipoProyectoService.listarEliminados().subscribe(
          (res:any)=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar el tipo de proyecto?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.tipoProyectoService.eliminar(id).subscribe(
            (data) => {
              this.listaDatosVigentes = this.listaDatosVigentes.filter((datos:any) => datos.idTipoProyecto!= id);
              Swal.fire('Información eliminada','El tipo de proyecto ha sido eliminado','success');
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el tipo de proyecto','error');
            }
          )
        }
      })
    }

    restablecer(id:any){
      Swal.fire({
        title:'Restaurar información',
        text:'¿Estás seguro de restaurar el tipo de proyecto?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.tipoProyectoService.restablecer(id).subscribe(
            (data) => {
              this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idTipoProyecto!= id);
              Swal.fire('Información restaurada','El tipo de proyecto ha sido restaurada','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar el tipo de proyecto','error');
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
      const dialogRef = this.dialog.open(DialogAddTipoProyectoAdmin, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
      
    }

    openDialogEditar(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(DialogActualizarTipoProyectoAdmin, {
        data: { idTipoProyecto: id, nombreTipoProyecto:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
}

interface DatosActualizar {
  idTipoProyecto: 0,
  nombreTipoProyecto: '',
}
  
@Component({
  selector: 'add-tipo-proyecto-admin',
  templateUrl: 'add-tipo-proyecto-admin.html',
  styleUrls: ['./view-tipo-proyecto-admin.component.css']
})
export class DialogAddTipoProyectoAdmin {
  constructor(
    public dialogRef: MatDialogRef<DialogAddTipoProyectoAdmin>,
    private snack: MatSnackBar,
    private service: TipoProyectoService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    nombreTipoProyecto: ''
  }

  ngOnInit(): void {
    
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  formSubmit() {
    if (this.datos.nombreTipoProyecto == '' || this.datos.nombreTipoProyecto == null) {
      this.snack.open('El nombre del tipo de proyecto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información guardada ', 'El tipo de proyecto se ha guardado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El tipo de proyecto no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-tipo-proyecto-admin',
  templateUrl: 'actualizar-tipo-proyecto-admin.html',
  styleUrls: ['./view-tipo-proyecto-admin.component.css']
})
export class DialogActualizarTipoProyectoAdmin {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarTipoProyectoAdmin>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: TipoProyectoService,

  ) { }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    
  }

  formSubmit() {
    if (this.datos.nombreTipoProyecto == '' || this.datos.nombreTipoProyecto == null) {
      this.snack.open('El nombre del tipo de proyecto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'EL tipo de proyecto se ha actualizado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'EL tipo de proyecto no se ha actualizado', 'error');
      }
    )
  }
}

  
