import { AfterViewInit, Component, ViewChild, Inject,EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ProfundidadService } from 'src/app/services/profundidad.service';
import { ViewProfundidadesDataSource, ViewProfundidadesItem } from './view-profundidades-datasource';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MedidaService } from 'src/app/services/medida.service';



@Component({
  selector: 'app-view-profundidades',
  templateUrl: './view-profundidades.component.html',
  styleUrls: ['./view-profundidades.component.css']
})
export class ViewProfundidadesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewProfundidadesItem>;
  dataSource: ViewProfundidadesDataSource;

  

  constructor(private profundidadService:ProfundidadService,
    public matDialog: MatDialog) {
    this.dataSource = new ViewProfundidadesDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.profundidadService.listar().subscribe(
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
        title:'Eliminar profundidad',
        text:'¿Estás seguro de eliminar la profundidad?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.profundidadService.eliminar(id).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((lista:any) => lista.idAltura != id);
              Swal.fire('Profundidad eliminada','La profundidad ha sido eliminado','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la profundidad','error');
            }
          )
        }
      })
    }

    //agregar
    agregar(): void {
      const dialogRef = this.matDialog.open(AgregarProfundidad, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
      
    }

    //editar
    editar(id:any, dato1:any, dato2:any, dato3:any): void {
      const dialogRef = this.matDialog.open(EditarProfundidad, {
        data: { idArea: id, profundidadMinima:dato1,profundidadMaxima:dato2,idUnidadMedida:dato3},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }
  }
  



  
export interface dataEditar {
  idArea: 0,
  profundidadMinima: '',
  profundidadMaxima: '',
  idUnidadMedida:0
}

@Component({
  selector: 'editar-profundidad',
  templateUrl: 'editar-profundidad.html',
  styleUrls: ['./view-profundidades.component.css']
})

export class EditarProfundidad {
  constructor(
    public dialogRef: MatDialogRef<EditarProfundidad>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private profundidadService:ProfundidadService,
    private snack: MatSnackBar,
    private medidaService:MedidaService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listarMedidas();
    this.data.idArea=this.data1.idArea;
    this.data.profundidadMinima=this.data1.profundidadMinima;
    this.data.profundidadMaxima=this.data1.profundidadMaxima;
    this.data.unidadMedida.idUnidadMedida=this.data1.idUnidadMedida;
  }

  public data = {
    idArea: 0,
    profundidadMinima: '',
    profundidadMaxima: '',
    unidadMedida:{
      idUnidadMedida:-1
    }
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

  

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public editar() {
    if (this.data.profundidadMinima.trim() == '' || this.data.profundidadMinima.trim() == null) {
      this.snack.open('La profundiad minima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.data.profundidadMaxima.trim() == '' || this.data.profundidadMaxima.trim() == null) {
      this.snack.open('La profundiad maxima es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
    if (this.data.unidadMedida.idUnidadMedida == -1) {
      this.snack.open('La medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.profundidadService.guardar(this.data).subscribe(
      (data) => {
        Swal.fire('Profundidad editada', 'La profundidad se editado con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error al editadar la profundidad', 'No se editado la profundidad', 'error');
        console.log(error);
      }
    );
  }

}



@Component({
  selector: 'agregar-profundidad',
  templateUrl: 'agregar-profundidad.html',
  styleUrls: ['./view-profundidades.component.css']
})

export class AgregarProfundidad {
  constructor(
    public dialogRef: MatDialogRef<AgregarProfundidad>,
    private profundidadService:ProfundidadService,
    private snack: MatSnackBar,
    private medidaService:MedidaService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public data = {
    profundidadMinima: '',
    profundidadMaxima: '',
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

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {

      if (this.data.profundidadMinima.trim() == '' || this.data.profundidadMinima.trim() == null) {
        this.snack.open('La profundiad minima es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }
      if (this.data.profundidadMaxima.trim() == '' || this.data.profundidadMaxima.trim() == null) {
        this.snack.open('La profundiad maxima es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }
      
      if (this.data.unidadMedida.idUnidadMedida == -1) {
        this.snack.open('La medida es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }
      
  
      this.profundidadService.guardar(this.data).subscribe(
        (data) => {
          Swal.fire('Profundidad añadido', 'La profundidad se añadio con éxito', 'success').then(
            (e) => {
              this.afterClosed.emit();
              this.dialogRef.close();
            })
        }, (error) => {
          Swal.fire('Error al anadir la profundidad', 'No se registro la profundidad', 'error');
          console.log(error);
        }
      );
  }


  
}
