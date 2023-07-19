import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LineaInvestigacionService } from 'src/app/services/linea-investigacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-linea-investigacion-admin',
  templateUrl: './view-linea-investigacion-admin.component.html',
  styleUrls: ['./view-linea-investigacion-admin.component.css']
})
export class ViewLineaInvestigacionAdminComponent implements OnInit {

  constructor(private lineaInvestigacionService:LineaInvestigacionService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminados();
  }

    listaDatosVigentes : any = []
    listaDatosEliminados : any = []

    listarVigentes()
    {
      this.lineaInvestigacionService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaDatosVigentes=res;
          },
          err=>console.log(err)
        )
    }
    listarEliminados()
    {
      this.lineaInvestigacionService.listarEliminados().subscribe(
          (res:any)=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar linea de investigación',
        text:'¿Estás seguro de eliminar la linea de investigación?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.lineaInvestigacionService.eliminar(id).subscribe(
            (data) => {
              this.listaDatosVigentes = this.listaDatosVigentes.filter((datos:any) => datos.idLineaInvestigacion!= id);
              Swal.fire('Linea de investigación eliminado','La linea de investigación ha sido eliminado','success');
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la linea de investigación','error');
            }
          )
        }
      })
    }

    restablecer(id:any){
      Swal.fire({
        title:'Restablecer linea de investigación',
        text:'¿Estás seguro de restablecer la linea de investigación?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restablecer',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.lineaInvestigacionService.restablecer(id).subscribe(
            (data) => {
              this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idLineaInvestigacion!= id);
              Swal.fire('Linea de investigación restablecido','Linea de investigación restablecido','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restablecer la linea de investigación','error');
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
      const dialogRef = this.dialog.open(DialogAddLineaInvestigacionAdmin, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
      
    }

    openDialogEditar(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(DialogActualizarLineaInvestigacionAdmin, {
        data: { idLineaInvestigacion: id, nombreLineaInvestigacion:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
}

interface DatosActualizar {
  idLineaInvestigacion: 0,
  nombreLineaInvestigacion: '',
}
  
@Component({
  selector: 'add-linea-investigacion-admin',
  templateUrl: 'add-linea-investigacion-admin.html',
  styleUrls: ['./view-linea-investigacion-admin.component.css']
})
export class DialogAddLineaInvestigacionAdmin {
  constructor(
    public dialogRef: MatDialogRef<DialogAddLineaInvestigacionAdmin>,
    private snack: MatSnackBar,
    private service: LineaInvestigacionService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    nombreLineaInvestigacion: ''
  }

  ngOnInit(): void {
    
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  formSubmit() {
    if (this.datos.nombreLineaInvestigacion == '' || this.datos.nombreLineaInvestigacion == null) {
      this.snack.open('El nombre de la linea de investigación es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Linea de investigación guardada', 'La linea de investigación se ha guardado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error al guardar la linea de investigación', 'La linea de investigación no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-linea-investigacion-admin',
  templateUrl: 'actualizar-linea-investigacion-admin.html',
  styleUrls: ['./view-linea-investigacion-admin.component.css']
})
export class DialogActualizarLineaInvestigacionAdmin {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarLineaInvestigacionAdmin>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: LineaInvestigacionService,

  ) { }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    
  }

  formSubmit() {
    if (this.datos.nombreLineaInvestigacion == '' || this.datos.nombreLineaInvestigacion == null) {
      this.snack.open('El nombre de la linea de investigación es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Linea de investigación actualizada', 'La linea de investigación se ha actualizado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error al actualizar la linea de investigación', 'La linea de investigación no se ha actualizado', 'error');
      }
    )
  }
}

  

  



  


