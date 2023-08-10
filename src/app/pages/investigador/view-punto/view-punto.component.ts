import { AfterViewInit, Component, ViewChild, Inject,EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from 'src/app/services/dataset.service';
import Swal from 'sweetalert2';
import { ViewPuntoDataSource, ViewPuntoItem } from './view-punto-datasource';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfundidadService } from 'src/app/services/profundidad.service';



@Component({
  selector: 'app-view-punto',
  templateUrl: './view-punto.component.html',
  styleUrls: ['./view-punto.component.css']
})
export class ViewPuntoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewPuntoItem>;
  dataSource: ViewPuntoDataSource;

  constructor(private datasetService:DatasetService,
    private route:ActivatedRoute,
    private investigacionService:InvestigacionService,
    public matDialog: MatDialog ) {
    this.dataSource = new ViewPuntoDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  

  idParcela= 0;
  idConglomerado=0;
  idProyecto=0;
  ngOnInit(): void {
    this.idParcela = this.route.snapshot.params['idParcela'];
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
    this.listarProyectosVigentes();
  }


  datos : any = []
    listarProyectosVigentes()
    {
      this.investigacionService.obtenerProyectoInvestigacion(this.idProyecto).subscribe(
          res=>{
            this.datos=res;
          },
          err=>console.log(err)
        )
    }

    listaDatos : any = []

    listarVigentes()
    {
      this.datasetService.obtenerPorParcela(this.idParcela).subscribe(
          (res:any)=>{
            this.listaDatos=this.transformarFechas(res);
          },
          err=>console.log(err)
        )
    }

    transformarFechas(data: any[]): any[] {
      return data.map(item => {
        const fechaInicioCompleta = item.fechaInicio;
        const fechaFinCompleta = item.fechaFin;
        const fechaInicioObj = new Date(fechaInicioCompleta);
        const fechaFinObj = new Date(fechaFinCompleta);
        const fechaInicioFormateada = this.formatoFecha(fechaInicioObj);
        const fechaFinFormateada = this.formatoFecha(fechaFinObj);
  
        // Devolver un nuevo objeto con las fechas formateadas y el resto de la estructura de datos sin cambios
        return { ...item, fechaInicio: fechaInicioFormateada, fechaFin: fechaFinFormateada };
      });
    }
  
    formatoFecha(fecha: Date): string {
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear().toString();
  
      return `${dia}/${mes}/${anio}`;
    }


    eliminar(idDataset:any){
      Swal.fire({
        title:'Eliminar punto',
        text:'¿Estás seguro de eliminar el punto?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.datasetService.eliminar(idDataset).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idDataset != idDataset);
              Swal.fire('Punto eliminado','El punto ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el punto, el puntp debe estar vacio','error');
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
  

    
  //agregar
  agregar(): void {
    const dialogRef = this.matDialog.open(AgregarPunto, {
      data: { idParcela:this.idParcela},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
    
  }

  //editar
  editar(id:any, dato1:any, dato2:any, dato3:any): void {
    const dialogRef = this.matDialog.open(EditarPunto, {
      data: { idDataset: id, fechaInicio:dato1,fechaFin:dato2,idProfundidad:dato3, idParcela:this.idParcela},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }
}





export interface dataEditar {
  idDataset:0,
  fechaInicio: any,
  fechaFin: any,
  idProfundidad:0,
  idParcela:0
}





@Component({
selector: 'editar-punto',
templateUrl: 'editar-punto.html',
styleUrls: ['./view-punto.component.css']
})

export class EditarPunto {
constructor(
  public dialogRef: MatDialogRef<EditarPunto>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private datasetService:DatasetService,
  private snack: MatSnackBar,
  private profundidadService:ProfundidadService

) { }

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.listarProfundidad();
  this.data.idDataset=this.data1.idDataset;
  this.data.fechaInicio=this.data1.fechaInicio;
  this.data.fechaFin=this.data1.fechaFin;
  console.log(this.data.fechaFin)
  this.data.profundidadParcela.idParcela=this.data1.idParcela;
  this.data.profundidadParcela.idProfundidad=this.data1.idProfundidad;
}



public data = {
  idDataset:0,
  fechaInicio: '',
  fechaFin: '',
  profundidadParcela:{
    idProfundidad:0,
    idParcela:0
  }
}

formatDate(date: string): string {
  const parts = date.split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return '';
}



profundidad : any = []
listarProfundidad()
    {
      this.profundidadService.listar().subscribe(
          res=>{
            this.profundidad=res;
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public editar() {
  if(this.data.fechaInicio == null){
    this.snack.open("La dehca de inico es requerida !!",'',{
      duration:3000
    })
    return ;
  }
  if(this.data.fechaFin == null){
    this.snack.open("La fecha de fin es requerida !!",'',{
      duration:3000
    })
    return ;
  }
  
  if (this.data.profundidadParcela.idProfundidad == 0) {
    this.snack.open('La profundidad es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  

  this.datasetService.guardar(this.data).subscribe(
    (data) => {
      Swal.fire('Punto añadido', 'El punto se añadio con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error al anadir el punto', 'No se registro el nuevo punto', 'error');
      console.log(error);
    }
  );
    
  }

}



@Component({
selector: 'agregar-punto',
templateUrl: 'agregar-punto.html',
styleUrls: ['./view-punto.component.css']
})

export class AgregarPunto {
constructor(
  public dialogRef: MatDialogRef<AgregarPunto>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private datasetService:DatasetService,
  private snack: MatSnackBar,
  private profundidadService:ProfundidadService
) { }

onNoClick(): void {
  this.dialogRef.close();
}

public data = {
  fechaInicio: new Date(0),
  fechaFin: new Date(0),
  profundidadParcela:{
    idProfundidad:0,
    idParcela:0
  }
}



ngOnInit(): void {
  this.listarProfundidad();
  this.data.profundidadParcela.idParcela=this.data1.idParcela;
}

profundidad : any = []
listarProfundidad()
    {
      this.profundidadService.listar().subscribe(
          res=>{
            this.profundidad=res;
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

public agregar() {
  
  if(this.data.fechaInicio == null){
    this.snack.open("La dehca de inico es requerida !!",'',{
      duration:3000
    })
    return ;
  }
  if(this.data.fechaFin == null){
    this.snack.open("La fecha de fin es requerida !!",'',{
      duration:3000
    })
    return ;
  }
  
  if (this.data.profundidadParcela.idProfundidad == 0) {
    this.snack.open('La profundidad es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  

  this.datasetService.guardar(this.data).subscribe(
    (data) => {
      Swal.fire('Punto añadido', 'El punto se añadio con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error al anadir el punto', 'No se registro el nuevo punto', 'error');
      console.log(error);
    }
  );
    
  }

}


  


