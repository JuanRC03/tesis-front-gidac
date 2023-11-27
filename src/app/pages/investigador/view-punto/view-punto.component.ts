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
import { ProfundidadParcelaService } from 'src/app/services/profundidad-parcela.service';


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

  constructor(private profundidadParcelaService:ProfundidadParcelaService,
    private route:ActivatedRoute,
    private investigacionService:InvestigacionService,
    public profundidadService:ProfundidadService,
    public matDialog: MatDialog ) {
    this.dataSource = new ViewPuntoDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'opciones'];
  
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
      this.profundidadParcelaService.obtenerPorParcela(this.idParcela).subscribe(
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


    eliminar(idProfundidad:any, idParcela:any ){
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
          this.profundidadParcelaService.eliminar(idProfundidad,idParcela ).subscribe(
            (data) => {
              this.listarVigentes()
              Swal.fire('Informacion eliminada','El punto ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el punto, el punto debe estar vacio','error');
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
      data: { idParcela:this.idParcela, profundidad:this.profundidad},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
    
  }

  //editar
  editar(dato1:any, dato2:any): void {
    const dialogRef = this.matDialog.open(EditarPunto, {
      data: {idProfundidad:dato1, fechaSalidaCampo:dato2, idParcela:this.idParcela, profundidad:this.profundidad},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarVigentes();
    });
  }
}





export interface dataEditar {
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
  private profundidadParcelaService:ProfundidadParcelaService,
  private snack: MatSnackBar,
  private profundidadService:ProfundidadService

) { }

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.profundidad=this.data1.profundidad;
  this.data.fechaSalidaCampo=this.data1.fechaSalidaCampo;
  this.dataAux.fechaSalidaCampo=this.data1.fechaSalidaCampo;
  this.data.parcela.idParcela=this.data1.idParcela;
  this.data.profundidad.idProfundidad=this.data1.idProfundidad;
}

public dataAux = {
  fechaSalidaCampo: '',
}

public data = {
    fechaSalidaCampo: new Date(0),
    idProfundidad:0,
    idParcela:0,
    profundidad:{
      idProfundidad:0
    },
    parcela:{
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
  
  if (this.data.profundidad.idProfundidad == 0) {
    this.snack.open('La profundidad es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  this.profundidadParcelaService.actualizar(this.data).subscribe(
    (data) => {
      Swal.fire('Información actualizada', 'El punto se actualizo con éxito', 'success').then(
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
  private profundidadParcelaService:ProfundidadParcelaService,
  private snack: MatSnackBar,
  private profundidadService:ProfundidadService
) { }

onNoClick(): void {
  this.dialogRef.close();
}

public data = {
  fechaSalidaCampo: new Date(0),
  profundidad:{
    idProfundidad:0
  },
  parcela:{
    idParcela:0
  }
}



ngOnInit(): void {
  this.profundidadData=this.data1.profundidad;
  console.log(this.profundidadData)
  this.data.parcela.idParcela=this.data1.idParcela;
}

profundidadData : any = []
listarProfundidad()
    {
      this.profundidadService.listar().subscribe(
          res=>{
            this.profundidadData=res;
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

  if (this.data.profundidad.idProfundidad == 0) {
    this.snack.open('La profundidad es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  

  this.profundidadParcelaService.guardar(this.data).subscribe(
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


  


