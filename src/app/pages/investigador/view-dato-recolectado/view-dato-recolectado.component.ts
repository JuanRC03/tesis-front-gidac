import { AfterViewInit, Component, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import Swal from 'sweetalert2';
import { ViewDatoRecolectadoDataSource, ViewDatoRecolectadoItem } from './view-dato-recolectado-datasource';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { LoginService } from 'src/app/services/login.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { VariableUnidadMedidaService } from 'src/app/services/variable-unidad-medida.service';
import { DatasetService } from 'src/app/services/dataset.service';

@Component({
  selector: 'app-view-dato-recolectado',
  templateUrl: './view-dato-recolectado.component.html',
  styleUrls: ['./view-dato-recolectado.component.css']
})
export class ViewDatoRecolectadoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewDatoRecolectadoItem>;
  dataSource: ViewDatoRecolectadoDataSource;


  constructor(private datoRecolectadoService:DatoRecolectadoService,
    private route:ActivatedRoute,
    public login:LoginService,
    public dialog: MatDialog,
    public investigacionService:InvestigacionService,
    public datasetService:DatasetService,
    public variableUnidadMedidaService:VariableUnidadMedidaService) {
    this.dataSource = new ViewDatoRecolectadoDataSource();
  }

  displayedColumns = ['dato1', 'dato2','dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  idProfundidad= 0;
  idParcela= 0;
  idConglomerado= 0;
  idProyecto= 0;
  usuario:any = null;
  ngOnInit(): void {
    this.usuario = this.login.getUser();
    console.log(this.usuario);
    console.log(this.usuario.idUsuario);
    this.idProfundidad = this.route.snapshot.params['idProfundidad'];
    this.idParcela = this.route.snapshot.params['idParcela'];
    this.idConglomerado = this.route.snapshot.params['idConglomerado'];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
    this.listarProyectosVigentes();
    this.listarVariableUnidadMedida();
    this.listarDatasets();
  }

  variableUnidadMedida : any = []
  listarVariableUnidadMedida()
    {
      this.variableUnidadMedidaService.listarVigentesVariableVigente().subscribe(
          res=>{
            this.variableUnidadMedida=res;
            
          },
          err=>console.log(err)
        )
    }

    listaDatosDataset: any = [];
    listarDatasets() {
      this.listaDatosDataset=[];
      this.datasetService.obtenerDatasets(this.idProyecto).subscribe(
        res => {
          this.listaDatosDataset = res;
          this.listaDatosDataset.unshift({ codigoDataset: 0, fechaInicioDataset: 'Todos' });
          this.opcionSeleccionada.codigoDataset=0;
        },
        err => console.log(err)
      )
    }
    public searchEstado: string = '';
    
    opcionSeleccionada: any = {
      codigoDataset: 0,
      fechaInicioDataset: null,
      fechaFinDataset:null
    }

    onEstadoChange(event: any): void {
      if (this.opcionSeleccionada.codigoDataset == 0) {
        this.searchEstado = "";
      } else {
        this.searchEstado = this.opcionSeleccionada.codigoDataset;
      }
      console.log(this.searchEstado)
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
      this.datoRecolectadoService.obtenerPorProfundidadParcela(this.idProfundidad, this.idParcela).subscribe(
          res=>{
            this.listaDatos=res;
            console.log(res)
          },
          err=>console.log(err)
        )
    }

    eliminar(idDatoRecolectado:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar el dato recolectado?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.datoRecolectadoService.eliminar(idDatoRecolectado).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.idDatoRecolectado != idDatoRecolectado);
              Swal.fire('Información eliminada','El dato recolectado ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el dato recolectado','error');
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

    //dialogo acualizar
    datoresult='';
    openDialog(idDatoRecolectado:any): void {
      const dialogRef = this.dialog.open(DialogoSolicitudActualizar, {
        data: {id: idDatoRecolectado, idProyInv:this.idProyecto, idUsuario:this.usuario.idUsuario ,motivo:''},
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if(result=='Solicitado'){
        this.listaDatos = this.listaDatos.filter((dato:any) => dato.idDatoRecolectado != idDatoRecolectado);
        console.log(this.datoresult);
      }
    });
  }

  
  //agregar
  agregar(): void {
    const dialogRef = this.dialog.open(AgregarDatoRecolectado, {
      data: { idProyecto:this.idProyecto,idProfundidad:this.idProfundidad,idParcela:this.idParcela, variableUnidadMedida:this.variableUnidadMedida},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarDatasets();
      this.listarVigentes();
    });
    
  }

  //editar
  editar(id:any, dato1:any, dato2:any, dato3:any,codigoDataset:any,fechaSalidaCampo:any): void {
    const dialogRef = this.dialog.open(EditarDatoRecolectado, {
      data: { idProyecto:this.idProyecto,idProfundidad:this.idProfundidad,idParcela:this.idParcela, idDatoRecolectado: id, valor:dato1,idVariableUnidadMedida:dato2,idDataset:dato3,codigoDataset:codigoDataset ,fechaSalidaCampo:fechaSalidaCampo,variableUnidadMedida:this.variableUnidadMedida},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarDatasets();
      this.listarVigentes();
    });
  }
}





export interface dataEditar {
  idDatoRecolectado:0,
  valor: '',
  idDataset:0,
  idVariableUnidadMedida:0,
  idProyecto:0,
  idProfundidad:0,
  idParcela:0,
  codigoDataset:0,
  fechaSalidaCampo:any,
  variableUnidadMedida:[]
}


@Component({
selector: 'editar-dato-recolectado',
templateUrl: 'editar-dato-recolectado.html',
styleUrls: ['./view-dato-recolectado.component.css']
})

export class EditarDatoRecolectado {
constructor(
  public dialogRef: MatDialogRef<EditarDatoRecolectado>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private datoRecolectadoService:DatoRecolectadoService,
  private snack: MatSnackBar,
  public dialog: MatDialog,
  private variableUnidadMedidaService:VariableUnidadMedidaService,
  private datasetService:DatasetService

) { }

onNoClick(): void {
  this.dialogRef.close();
}

ngOnInit(): void {
  this.variableUnidadMedida=this.data1.variableUnidadMedida;
  this.data.idDatoRecolectado=this.data1.idDatoRecolectado;
  this.data.valor=this.data1.valor;
  this.data.dataset.idDataset=this.data1.idDataset;
  this.data.dataset.proyectoInvestigacion.idProyecto=this.data1.idProyecto;
  this.data.dataset.codigoDataset=this.data1.codigoDataset;
  this.data.dataset.fechaSalidaCampo=this.data1.fechaSalidaCampo;
  this.data.variableUnidadMedida.idVariableUnidadMedida=this.data1.idVariableUnidadMedida;
  this.data.dataset.profundidadParcela.profundidad.idProfundidad=this.data1.idProfundidad;
  this.data.dataset.profundidadParcela.parcela.idParcela=this.data1.idParcela;
  this.listarDatasets();
}


public data = {
  idDatoRecolectado: 0,
  valor: '',
  vigencia: 1,
  dataset:{
    idDataset:0,
    codigoDataset:0,
    fechaSalidaCampo:new Date(0),
    proyectoInvestigacion:{
      idProyecto:0,
    },
    profundidadParcela:{
      profundidad:{
        idProfundidad:0,
      },
      parcela:{
        idParcela:0,
      }
    },
  },
  variableUnidadMedida:{
    idVariableUnidadMedida:0
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

listaDatosDataset: any = [];
    listarDatasets() {
      this.datasetService.obtenerDatasets(this.data1.idProyecto).subscribe(
        res => {
          this.listaDatosDataset = res;
          this.listaDatosDataset.unshift({ codigoDataset: 0, fechaInicioDataset: 'Nuevo dataset' });
        },
        err => console.log(err)
      )
    }


    onDatasetSelectionChange() {
    
      if (this.data.dataset.codigoDataset === 0) {
        const dialogRef = this.dialog.open(AgregarDatasetDatoRecolectado, {
          data: { idProyecto: this.data1.idProyecto },
        });
        dialogRef.afterClosed().subscribe(() => {
          this.listarDatasets();
        });
      }
    }

variableUnidadMedida : any = []
listarVariableUnidadMedida()
    {
      this.variableUnidadMedidaService.listar().subscribe(
          res=>{
            this.variableUnidadMedida=res;
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

aumentarUnDia() {
  const fechaOriginal = new Date(this.data.dataset.fechaSalidaCampo);
  fechaOriginal.setDate(fechaOriginal.getDate() + 1);
  this.data.dataset.fechaSalidaCampo = fechaOriginal;
}

public editar() {

  if (this.data.dataset.fechaSalidaCampo==null) {
    this.snack.open('La fecha de salida de campo es requerida !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  

  if (this.data.valor== '') {
    this.snack.open('EL valor del dato recolectado es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.variableUnidadMedida.idVariableUnidadMedida== 0) {
    this.snack.open('La variable del sistema es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  if(this.idTipoVariable==1){
    if (isNaN(Number(this.data.valor))) {
      this.snack.open('No se puede guardar un dato textual en una variable numérica !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
  }
  this.aumentarUnDia();
  this.datoRecolectadoService.actualizar(this.data).subscribe(
    (data) => {
      Swal.fire('Información actualizada', 'El dato recolectado se actualizo con éxito', 'success').then(
        (e) => {
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error en el sistema', 'No se actualizo el dato recolectado', 'error');
      console.log(error);
    }
  );
  }

  idTipoVariable=0;
  seleccionarVariable(id:any){
    this.idTipoVariable=id;
    console.log(id)
  }
}



@Component({
selector: 'agregar-dato-recolectado',
templateUrl: 'agregar-dato-recolectado.html',
styleUrls: ['./view-dato-recolectado.component.css']
})

export class AgregarDatoRecolectado {
constructor(
  public dialogRef: MatDialogRef<AgregarDatoRecolectado>,
  @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
  private variableUnidadMedidaService:VariableUnidadMedidaService,
  private snack: MatSnackBar,
  public dialog: MatDialog,
  private datoRecolectadoService:DatoRecolectadoService,
  private datasetService:DatasetService
) { }

onNoClick(): void {
  this.dialogRef.close();
}



public data = {
  valor: '',
  vigencia: 1,
  dataset:{
    codigoDataset:-1,
    fechaSalidaCampo:new Date(0),
    proyectoInvestigacion:{
      idProyecto:0,
    },
    profundidadParcela:{
      profundidad:{
        idProfundidad:0,
      },
      parcela:{
        idParcela:0,
      }
    },
  },
  variableUnidadMedida:{
    idVariableUnidadMedida:0
  }
}

listaDatosDataset: any = [];
    listarDatasets() {
      this.datasetService.obtenerDatasets(this.data1.idProyecto).subscribe(
        res => {
          this.listaDatosDataset = res;
          this.listaDatosDataset.unshift({ codigoDataset: 0, fechaInicioDataset: 'Nuevo dataset' });
        },
        err => console.log(err)
      )
    }


   
    onDatasetSelectionChange() {
    
      if (this.data.dataset.codigoDataset === 0) {
        const dialogRef = this.dialog.open(AgregarDatasetDatoRecolectado, {
          data: { idProyecto: this.data1.idProyecto },
        });
        dialogRef.afterClosed().subscribe(() => {
          this.listarDatasets();
        });
      }
    }



ngOnInit(): void {
  this.variableUnidadMedida=this.data1.variableUnidadMedida;
  this.data.dataset.proyectoInvestigacion.idProyecto=this.data1.idProyecto;
  this.data.dataset.profundidadParcela.profundidad.idProfundidad=this.data1.idProfundidad;
  this.data.dataset.profundidadParcela.parcela.idParcela=this.data1.idParcela;
  this.listarDatasets();
}

variableUnidadMedida : any = []
listarVariableUnidadMedida()
    {
      this.variableUnidadMedidaService.listar().subscribe(
          res=>{
            this.variableUnidadMedida=res;
            console.log(res);
          },
          err=>console.log(err)
        )
    }


public afterClosed: EventEmitter<void> = new EventEmitter<void>();

aumentarUnDia() {
  const fechaOriginal = new Date(this.data.dataset.fechaSalidaCampo);
  fechaOriginal.setDate(fechaOriginal.getDate() + 1);
  this.data.dataset.fechaSalidaCampo = fechaOriginal;
}

public agregar() {
  
  console.log(this.data)
  
  if (this.data.dataset.fechaSalidaCampo==null) {
    this.snack.open('La fecha de salida de campo es requerida !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  if (this.data.valor== '') {
    this.snack.open('EL valor del dato recolectado es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  if (this.data.variableUnidadMedida.idVariableUnidadMedida== 0) {
    this.snack.open('La variable del sistema es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }

  if (this.data.dataset.codigoDataset== 0 || this.data.dataset.codigoDataset== -1) {
    this.snack.open('El dataset es requerido !!', 'Aceptar', {
      duration: 3000
    })
    return;
  }
  
  if(this.idTipoVariable==1){
    if (isNaN(Number(this.data.valor))) {
      this.snack.open('No se puede guardar un dato textual en una variable numérica !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
  }

  this.aumentarUnDia();
  this.datoRecolectadoService.guardar(this.data).subscribe(
    (data) => {
      Swal.fire('Información guardada', 'El dato recolectado se agrego con éxito', 'success').then(
        (e) => {
          this.dialogRef.close();
        })
    }, (error) => {
      Swal.fire('Error en el sistema', 'No se agrego el dato recolectado', 'error');
      console.log(error);
    }
  );
    
  }

  idTipoVariable=0;
  seleccionarVariable(id:any){
    this.idTipoVariable=id;
    console.log(id)
  }

}



  export interface DialogData {
    id: '';
    idProyInv:'';
    idUsuario:'';
    motivo:''
  }


  

@Component({
  selector: 'dialogo-solicitud-actualizar',
  templateUrl: 'dialogo-solicitud-actualizar.html',
  styleUrls: ['./view-dato-recolectado.component.css']
})

export class DialogoSolicitudActualizar {
  constructor(
    public dialogRef: MatDialogRef<DialogoSolicitudActualizar>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private snack:MatSnackBar, 
    private solicitudAccesoService:SolicitudAccesoService,
    private datoRecolectadoService: DatoRecolectadoService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  dataCarbono:any;
  

formSubmit(){
  
  if(this.data.motivo== '' || this.data.motivo == null){
    this.snack.open('El motivo del para actualizar los datos es requerido!!','Aceptar',{
      duration : 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center'
    });
    return;
  }
  
  this.solicitudAccesoService.enviarSolicitudEliminar(this.data.id,this.data.idProyInv,this.data.idUsuario,this.data.motivo).subscribe(
    (data) => {
      console.log(data);
      Swal.fire('Solicitud enviada','El director aprobara o rechazara la solicitud','success');
      this.dialogRef.close('Solicitado');
      
    },(error) => {
      Swal.fire('Error en el sistema', 'No se envió la solicitud', 'error');
    }
  )
  
}
}





@Component({
  selector: 'agregar-dataset-dato-recolectado',
  templateUrl: 'agregar-dataset-dato-recolectado.html',
  styleUrls: ['./view-dato-recolectado.component.css'],
})

export class AgregarDatasetDatoRecolectado {
  constructor(
    public dialogRef: MatDialogRef<AgregarDatasetDatoRecolectado>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private snack: MatSnackBar,
    private datasetService: DatasetService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public data = {
    codigoDataset: 0,
    fechaInicioDataset: new Date(0),
    fechaFinDataset: new Date(0),
    fechaSalidaCampo: new Date(0),
    proyectoInvestigacion: {
      idProyecto: 0,
    }
  }
  
  ngOnInit(): void {
    this.data.proyectoInvestigacion.idProyecto=this.data1.idProyecto;
  }

  variableUnidadMedida: any = []

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {
  
    console.log(this.data)
    
    if (this.data.fechaInicioDataset==null) {
      this.snack.open('La fecha de inicio del dataset !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.fechaFinDataset==null) {
      this.snack.open('La fecha de fin del dataset !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
  
  
    this.aumentarUnDiaInicioDataset();
    this.aumentarUnDiaFinDataset();

    this.datasetService.guardar(this.data).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'El dataset se agrego con éxito', 'success').then(
          (e) => {
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego el dataset', 'error');
        console.log(error);
      }
    );
      
    }

    aumentarUnDiaInicioDataset() {
      const fechaOriginal = new Date(this.data.fechaInicioDataset);
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);
      this.data.fechaInicioDataset = fechaOriginal;
    }

    aumentarUnDiaFinDataset() {
      const fechaOriginal = new Date(this.data.fechaFinDataset);
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);
      this.data.fechaFinDataset = fechaOriginal;
    }
  

}
