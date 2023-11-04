import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SectorImpactoService } from 'src/app/services/sector-impacto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-sector-impacto-admin',
  templateUrl: './view-sector-impacto-admin.component.html',
  styleUrls: ['./view-sector-impacto-admin.component.css']
})
export class ViewSectorImpactoAdminComponent implements OnInit {

  constructor(private sectorImpactoService:SectorImpactoService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminados();
  }

    listaDatosVigentes : any = []
    listaDatosEliminados : any = []

    listarVigentes()
    {
      this.sectorImpactoService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaDatosVigentes=res;
          },
          err=>console.log(err)
        )
    }
    listarEliminados()
    {
      this.sectorImpactoService.listarEliminados().subscribe(
          (res:any)=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información ',
        text:'¿Estás seguro de eliminar el sector de impacto?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.sectorImpactoService.eliminar(id).subscribe(
            (data) => {
              this.listaDatosVigentes = this.listaDatosVigentes.filter((datos:any) => datos.idSectorImpacto!= id);
              Swal.fire('Información eliminada','El sector de impacto ha sido eliminado','success');
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el sector de impacto','error');
            }
          )
        }
      })
    }

    restablecer(id:any){
      Swal.fire({
        title:'Restaurar información ',
        text:'¿Estás seguro de restaurar el sector de impacto?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.sectorImpactoService.restablecer(id).subscribe(
            (data) => {
              this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idSectorImpacto!= id);
              Swal.fire('Información restaurada ','El sector de impacto ha sido restaurado ','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar el sector de impacto','error');
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
      const dialogRef = this.dialog.open(DialogAddSectorImpactoAdmin, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }

    openDialogEditar(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(DialogActualizarSectorImpactoAdmin, {
        data: { idSectorImpacto: id, nombreSectorImpacto:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
}

interface DatosActualizar {
  idSectorImpacto: 0,
  nombreSectorImpacto: '',
}
  
@Component({
  selector: 'add-sector-impacto-admin',
  templateUrl: 'add-sector-impacto-admin.html',
  styleUrls: ['./view-sector-impacto-admin.component.css']
})
export class DialogAddSectorImpactoAdmin {
  constructor(
    public dialogRef: MatDialogRef<DialogAddSectorImpactoAdmin>,
    private snack: MatSnackBar,
    private service: SectorImpactoService,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  datos = {
    nombreSectorImpacto: ''
  }

  ngOnInit(): void {
    
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  formSubmit() {
    if (this.datos.nombreSectorImpacto == '' || this.datos.nombreSectorImpacto == null) {
      this.snack.open('El nombre del sector de impacto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.guardar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información guardada ', 'El sector de impacto se ha guardado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'El sector de impacto no se ha guardado', 'error');
      }
    )
  }
}


@Component({
  selector: 'actualizar-tipo-proyecto-admin',
  templateUrl: 'actualizar-sector-impacto-admin.html',
  styleUrls: ['./view-sector-impacto-admin.component.css']
})
export class DialogActualizarSectorImpactoAdmin {
  constructor(
    
    public dialogRef: MatDialogRef<DialogActualizarSectorImpactoAdmin>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: SectorImpactoService,

  ) { }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    
  }

  formSubmit() {
    if (this.datos.nombreSectorImpacto == '' || this.datos.nombreSectorImpacto == null) {
      this.snack.open('El nombre del sector de impacto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.service.actualizar(this.datos).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'EL sector de impacto se ha actualizado con exito', 'success');
        this.afterClosed.emit();
        this.dialogRef.close();

      }, (error) => {
        console.log(error);
        Swal.fire('Error en el sistema', 'EL sector de impacto no se ha actualizado', 'error');
      }
    )
  }
}

  

  


