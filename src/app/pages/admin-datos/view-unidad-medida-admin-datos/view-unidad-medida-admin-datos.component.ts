import { AfterViewInit, Component, Inject, ViewChild, EventEmitter, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MedidaService } from 'src/app/services/medida.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-unidad-medida-admin-datos',
  templateUrl: './view-unidad-medida-admin-datos.component.html',
  styleUrls: ['./view-unidad-medida-admin-datos.component.css']
})
export class ViewUnidadMedidaAdminDatosComponent implements OnInit {

  
  constructor(private medidaService:MedidaService,
    public matDialog: MatDialog) {
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminados();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.medidaService.actualizarEditable().subscribe((data: any) => { 

        this.medidaService.listar().subscribe(
          res=>{
            console.log(res)
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
        
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


    //eliminar

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar la unidad de medida?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.medidaService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((lista:any) => lista.idUnidadMedida != id);
              Swal.fire('Información eliminada','La unidad de medida ha sido eliminada','success');
              this.listarVigentes();
              this.listarEliminados();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la unidad de medida','error');
            }
          )
        }
      })
    }

    page_number1: number = 1
    handlePage1(e: PageEvent) {
      this.page_size = e.pageSize
      this.page_number1 = e.pageIndex + 1
    }

    listaDatosEliminados : any = []
    listarEliminados()
    {
      this.medidaService.listarEliminads().subscribe(
          res=>{
            this.listaDatosEliminados=res;
          },
          err=>console.log(err)
        )
    }

    restaurar(id: any) {
      Swal.fire({
        title: 'Restaurar información',
        text: '¿Estás seguro de restaurar la unidad de medida?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Restaurar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.medidaService.restaurar(id).subscribe(
            (data) => {
              Swal.fire('Información restaurada', 'La unidad de medida ha sido restaurado', 'success');
              this.listarEliminados();
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error en el sistema', 'Error al restaurar la unidad de medida', 'error');
            }
          )
        }
      })
    }

    //agregar
    agregar(): void {
      const dialogRef = this.matDialog.open(AgregarUnidadMedidaAdminDatos, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
      
    }

    //editar
    editar(id:any, dato1:any, dato2:any, dato3:any): void {
      const dialogRef = this.matDialog.open(EditarUnidadMedidaAdminDatos, {
        data: { idUnidadMedida: id, abreviatura:dato1,magnitud:dato2,unidadMedida:dato3},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
  }
  



  
export interface dataEditar {
  idUnidadMedida: 0,
  abreviatura: '',
  magnitud: '',
  unidadMedida: '',
  vigencia:1
}

@Component({
  selector: 'editar-unidad-medida-admin-datos',
  templateUrl: 'editar-unidad-medida-admin-datos.html',
  styleUrls: ['./view-unidad-medida-admin-datos.component.css']
})

export class EditarUnidadMedidaAdminDatos {
  constructor(
    public dialogRef: MatDialogRef<EditarUnidadMedidaAdminDatos>,
    @Inject(MAT_DIALOG_DATA) public data: dataEditar,
    private medidaService:MedidaService,
    private snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public editar() {

    if (this.data.abreviatura.trim() == '' || this.data.abreviatura.trim() == null) {
      this.snack.open('La abreviatura es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.unidadMedida.trim() == '' || this.data.unidadMedida.trim() == null) {
      this.snack.open('La unidad de medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.magnitud.trim() == '' || this.data.magnitud.trim() == null) {
      this.snack.open('La magnitud es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.medidaService.actualizar(this.data).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'La unidad de medida se actualizo con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se actualizo la unidad de medida', 'error');
        console.log(error);
      }
    );
  }

}



@Component({
  selector: 'agregar-unidad-medida-admin-datos',
  templateUrl: 'agregar-unidad-medida-admin-datos.html',
  styleUrls: ['./view-unidad-medida-admin-datos.component.css']
})

export class AgregarUnidadMedidaAdminDatos {
  constructor(
    public dialogRef: MatDialogRef<AgregarUnidadMedidaAdminDatos>,
    private medidaService:MedidaService,
    private snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public medida = {
    abreviatura: '',
    magnitud: '',
    unidadMedida: '',
    vigencia:1
  }

  ngOnInit(): void {
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {

    if (this.medida.abreviatura.trim() == '' || this.medida.abreviatura.trim() == null) {
      this.snack.open('La abreviatura es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.medida.unidadMedida.trim() == '' || this.medida.unidadMedida.trim() == null) {
      this.snack.open('La unidad de medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.medida.magnitud.trim() == '' || this.medida.magnitud.trim() == null) {
      this.snack.open('La magnitud es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.medidaService.guardar(this.medida).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'La unidad de medida se agrego con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego la unidad de medida', 'error');
        console.log(error);
      }
    );
  }

}


