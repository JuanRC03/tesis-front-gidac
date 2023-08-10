import { AfterViewInit, Component, ViewChild, Inject, EventEmitter,ChangeDetectorRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewAlturaDataSource, ViewAlturaItem } from './view-altura-datasource';
import { AlturaService } from 'src/app/services/altura.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MedidaService } from 'src/app/services/medida.service';



@Component({
  selector: 'app-view-altura',
  templateUrl: './view-altura.component.html',
  styleUrls: ['./view-altura.component.css']
})
export class ViewAlturaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewAlturaItem>;
  dataSource: ViewAlturaDataSource;

  constructor(
    private alturaService:AlturaService,
    public matDialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.dataSource = new ViewAlturaDataSource();
  }
  
  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listar();
  }

    listaDatos : any = []

    listar()
    {
      this.alturaService.listar().subscribe(
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

    //eliminar

    eliminar(id:any){
      Swal.fire({
        title:'Eliminar altura',
        text:'¿Estás seguro de eliminar al altura?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.alturaService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((lista:any) => lista.idAltura != id);
              Swal.fire('Altura eliminado','La altura ha sido eliminado','success');
              this.listar();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la altura','error');
            }
          )
        }
      })
    }

    //agregar
    agregar(): void {
      const dialogRef = this.matDialog.open(AgregarAltura, {});
      dialogRef.afterClosed().subscribe(() => {
          this.listar();
      });
    }

    //editar
    editar(id:any, dato1:any, dato2:any, dato3:any): void {
      const dialogRef = this.matDialog.open(EditarAltura, {
        data: { idAltura: id, alturaMinima:dato1,alturaMaxima:dato2,idUnidadMedida:dato3},
      });
      dialogRef.afterClosed().subscribe(() => {
        setTimeout(() => {
          this.listar();
        });
      });
    }
  }
  



  
export interface dataEditar {
  idAltura: 0,
  alturaMinima: '',
  alturaMaxima: '',
  idUnidadMedida:0
}

@Component({
  selector: 'editar-altura',
  templateUrl: 'editar-altura.html',
  styleUrls: ['./view-altura.component.css']
})

export class EditarAltura {
  constructor(
    public dialogRef: MatDialogRef<EditarAltura>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private alturaService:AlturaService,
    private snack: MatSnackBar,
    private medidaService:MedidaService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listarMedidas();
    this.data.idAltura=this.data1.idAltura;
    this.data.alturaMinima=this.data1.alturaMinima;
    this.data.alturaMaxima=this.data1.alturaMaxima;
    this.data.unidadMedida.idUnidadMedida=this.data1.idUnidadMedida;
  }

  medida : any = []
  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            console.log(this.medida);
          },
          err=>console.log(err)
        )
    }

  public data = {
    idAltura: 0,
    alturaMinima: '',
    alturaMaxima: '',
    unidadMedida:{
      idUnidadMedida:-1
    }
  }

  

  public editar() {

    if (this.data.alturaMinima.trim() == '' || this.data.alturaMinima.trim() == null) {
      this.snack.open('La altura minima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.alturaMaxima.trim() == '' || this.data.alturaMaxima.trim() == null) {
      this.snack.open('La altura maxima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.data.unidadMedida.idUnidadMedida == 0) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.alturaService.actualizar(this.data).subscribe(
      (data) => {
        Swal.fire('Altura editada', 'La altura se ha editado con éxito', 'success').then(
          (e) => {
            
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error al editar la altura', 'No se ha acutalizado la altura', 'error');
        console.log(error);
      }
    );
  }

}



@Component({
  selector: 'agregar-altura',
  templateUrl: 'agregar-altura.html',
  styleUrls: ['./view-altura.component.css']
})

export class AgregarAltura {
  constructor(
    public dialogRef: MatDialogRef<AgregarAltura>,
    private alturaService:AlturaService,
    private snack: MatSnackBar,
    private medidaService:MedidaService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public data = {
    alturaMinima: '',
    alturaMaxima: '',
    unidadMedida:{
      idUnidadMedida:-1
    }
  }

  ngOnInit(): void {
    this.listarMedidas();
  }

  medida : any = []
  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            console.log(this.medida);
          },
          err=>console.log(err)
        )
    }

  

  public agregar() {

    if (this.data.alturaMinima.trim() == '' || this.data.alturaMinima.trim() == null) {
      this.snack.open('La altura minima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.alturaMaxima.trim() == '' || this.data.alturaMaxima.trim() == null) {
      this.snack.open('La altura maxima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.data.unidadMedida.idUnidadMedida == 0) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.alturaService.guardar(this.data).subscribe(
      (data) => {
        Swal.fire('Altura añadida', 'La altura se añadio con éxito', 'success').then(
          (e) => {
            
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error al anadir la altura', 'No se registro la altura', 'error');
        console.log(error);
      }
    );
  }

}



  