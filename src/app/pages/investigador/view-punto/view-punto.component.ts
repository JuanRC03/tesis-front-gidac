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
import { FormsModule } from '@angular/forms';


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
    public profundidadService:ProfundidadService,
    public matDialog: MatDialog ) {
    this.dataSource = new ViewPuntoDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'opciones'];
  
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
    this.listarProfundidad();
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
        const fechaInicioCompleta = item.fechaSalidaCampo;
        const fechaInicioObj = new Date(fechaInicioCompleta);
        const fechaInicioFormateada = this.formatoFecha(fechaInicioObj);
  
        // Devolver un nuevo objeto con las fechas formateadas y el resto de la estructura de datos sin cambios
        return { ...item, fechaSalidaCampo: fechaInicioFormateada };
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
      data: { idParcela:this.idParcela, profundidad:this.profundidad, idProyecto:this.idProyecto},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
    
  }

  //editar
  editar(id:any, dato1:any, dato2:any): void {
    const dialogRef = this.matDialog.open(EditarPunto, {
      data: { idDataset: id, fechaSalidaCampo:dato1,idProfundidad:dato2, idParcela:this.idParcela, profundidad:this.profundidad, idProyecto:this.idProyecto},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }
}





export interface dataEditar {
  idDataset:0,
  fechaSalidaCampo: any,
  idProfundidad:0,
  idParcela:0,
  idProyecto:0,
  profundidad:[]
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
  this.profundidad=this.data1.profundidad;
  this.data.idDataset=this.data1.idDataset;
  this.data.fechaSalidaCampo=this.data1.fechaSalidaCampo;
  this.dataAux.fechaSalidaCampo=this.data1.fechaSalidaCampo;
  this.data.profundidadParcela.idParcela=this.data1.idParcela;
  this.data.profundidadParcela.idProfundidad=this.data1.idProfundidad;
  this.data.proyectoInvestigacion.idProyecto=this.data1.idProyecto;
  
}

public dataAux = {
  fechaSalidaCampo: '',
}

public data = {
  idDataset:0,
  fechaSalidaCampo: new Date(0),
  profundidadParcela:{
    idProfundidad:0,
    idParcela:0
  },
  proyectoInvestigacion:{
    idProyecto:0
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

guardarFechaSalidaCampo(event: any) {
  const fechaSeleccionada = event.target.value;
  this.data.fechaSalidaCampo=fechaSeleccionada;
  console.log(this.data.fechaSalidaCampo);
}

aumentarUnDia() {
  const fechaOriginal = new Date(this.data.fechaSalidaCampo);
  fechaOriginal.setDate(fechaOriginal.getDate() + 1);
  this.data.fechaSalidaCampo = fechaOriginal;
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
  if(this.dataAux.fechaSalidaCampo == null){
    this.snack.open("La fecha de salida de campo es requerida !!",'',{
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
  this.aumentarUnDia();
  this.datasetService.actualizar(this.data).subscribe(
    (data) => {
      Swal.fire('Punto actualizado', 'El punto se actualizo con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error en el sistema', 'No se actualizo el punto', 'error');
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
  fechaSalidaCampo: new Date(0),
  profundidadParcela:{
    idProfundidad:0,
    idParcela:0
  },
  proyectoInvestigacion:{
    idProyecto:0
  }
}



ngOnInit(): void {
  this.profundidad=this.data1.profundidad;
  this.data.profundidadParcela.idParcela=this.data1.idParcela;
  this.data.proyectoInvestigacion.idProyecto=this.data1.idProyecto;
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
  
  if(this.data.fechaSalidaCampo == null){
    this.snack.open("La fecha de salida de campo es requerida !!",'',{
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
      Swal.fire('Información guardada', 'El punto se agrego con éxito', 'success').then(
        (e) => {
          this.afterClosed.emit();
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error en el sistema', 'No se agrego el punto', 'error');
      console.log(error);
    }
  );
    
  }

}


  


