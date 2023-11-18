import { AfterViewInit, Component, Inject, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MedidaService } from 'src/app/services/medida.service';
import { ViewMedidaDataSource, ViewMedidaItem } from './view-medida-datasource';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-medida',
  templateUrl: './view-medida.component.html',
  styleUrls: ['./view-medida.component.css']
})
export class ViewMedidaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewMedidaItem>;
  dataSource: ViewMedidaDataSource;


  constructor(private medidaService:MedidaService,
    public matDialog: MatDialog) {
    this.dataSource = new ViewMedidaDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
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
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la unidad de medida','error');
            }
          )
        }
      })
    }

    //agregar
    agregar(): void {
      const dialogRef = this.matDialog.open(AgregarUnidadMedida, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
      
    }

    //editar
    editar(id:any, dato1:any, dato2:any, dato3:any): void {
      const dialogRef = this.matDialog.open(EditarUnidadMedida, {
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
  selector: 'editar-unidad-medida',
  templateUrl: 'editar-unidad-medida.html',
  styleUrls: ['./view-medida.component.css']
})

export class EditarUnidadMedida {
  constructor(
    public dialogRef: MatDialogRef<EditarUnidadMedida>,
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
  selector: 'agregar-unidad-medida',
  templateUrl: 'agregar-unidad-medida.html',
  styleUrls: ['./view-medida.component.css']
})

export class AgregarUnidadMedida {
  constructor(
    public dialogRef: MatDialogRef<AgregarUnidadMedida>,
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
    

    this.medidaService.actualizar(this.medida).subscribe(
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


