import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewSolicitudActualizarInvestigadorDataSource, ViewSolicitudActualizarInvestigadorItem } from './view-solicitud-actualizar-investigador-datasource';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { RespuestaSolicitudActualizarService } from 'src/app/services/respuesta-solicitud-actualizar.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


import {animate, state, style, transition, trigger} from '@angular/animations';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { SolicitudEliminarService } from 'src/app/services/solicitud-eliminar.service';


@Component({
  selector: 'app-view-solicitud-actualizar-investigador',
  templateUrl: './view-solicitud-actualizar-investigador.component.html',
  styleUrls: ['./view-solicitud-actualizar-investigador.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewSolicitudActualizarInvestigadorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewSolicitudActualizarInvestigadorItem>;
  dataSource: ViewSolicitudActualizarInvestigadorDataSource;

  constructor(private solicitudAccesoService:SolicitudAccesoService, 
    private respuestaSolicitudActualizarService:RespuestaSolicitudActualizarService,
    public dialog: MatDialog,
    private route:ActivatedRoute,) {
    this.dataSource = new ViewSolicitudActualizarInvestigadorDataSource();
  }


  dataSourceSolicitado:any= [];
  dataDescarga:any= [];
  dataSourceAceptado:any= [];
  dataSourceRechazado:any= [];
  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'opciones'];
  columnsToDisplay: string[] =  [ 'grupoInvestigacion.usuario.cedula',
                                    'grupoInvestigacion.usuario.nombreUsuario', 
                                    'grupoInvestigacion.usuario.apellidoUsuario', 
                                    'grupoInvestigacion.usuario.email', ];
  columnLabelsRes: { [key: string]: string } = {
                                      'grupoInvestigacion.usuario.cedula': 'Cedula',
                                      'grupoInvestigacion.usuario.nombreUsuario': 'Nombre',
                                      'grupoInvestigacion.usuario.apellidoUsuario': 'Apellido',
                                      'grupoInvestigacion.usuario.email': 'Email',
                                    };
  columnsToDispl = ['idSolicitudActualizar', 'nombreUsuario', 'apellidoUsuario', 'email', 'cedula', 'nombreProyecto', 'nombreAreaInvestigacion', 'motivo'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null=null;


  
  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, current) => acc[current], obj);
  }
  

  getColumnLabel(column: string): string {
    return this.columnLabelsRes[column] || column;
  }


  idUsuario=0;

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
    this.listarSolicitados();
    this.listarAprobador();
    this.listarRechazados();
    
  }

  ngAfterViewInit(): void {
  }


  listarSolicitados(){
    this.solicitudAccesoService.listarSolicitadosEliminar(this.idUsuario).subscribe(
      (data:any) => {
        this.dataSourceSolicitado=this.transformarFechasSolicitadas(data);
        console.log(data);
      }
    )
  }

  listarAprobador(){
    this.respuestaSolicitudActualizarService.obtenerSolicitudesActualizarAceptadas(this.idUsuario).subscribe(
      (data:any) => {
        this.dataSourceAceptado=this.transformarFechas(data);
        console.log(data);
      }
    )
  }

  listarRechazados(){
    this.respuestaSolicitudActualizarService.obtenerSolicitudesActualizarRechazadas(this.idUsuario).subscribe(
      (data:any)  => {
        this.dataSourceRechazado=this.transformarFechas(data);
        console.log(data);
        //this.dataSourceRechazado=this.transformarFechas(data);
      }
    )
  }

  transformarFechasSolicitadas(data: any[]): any[] {
    return data.map(item => {
      const fechaCompleta = item.fechaEnvioSolicitud;
      const fechaObj = new Date(fechaCompleta);
      const fechaFormateada = this.formatoFecha(fechaObj);

      // Devolver un nuevo objeto con las fechas formateadas y el resto de la estructura de datos sin cambios
      return { ...item, fechaEnvioSolicitud: fechaFormateada};
    });
  }

  transformarFechas(data: any[]): any[] {
    return data.map(item => {
      if (item.fechaRespuesta) {
        const fechaRespuestaCompleta = item.fechaRespuesta;
        const fechaRespuestaObj = new Date(fechaRespuestaCompleta);
        const fechaRespuestaFormateada = this.formatoFecha(fechaRespuestaObj);
  
        // Actualizar el campo fechaRespuesta con la fecha formateada
        item.fechaRespuesta = fechaRespuestaFormateada;
      }
  
      if (item.solicitudDescarga && item.solicitudDescarga.fechaEnvioSolicitud) {
        const fechaSolicitudCompleta = item.solicitudDescarga.fechaEnvioSolicitud;
        const fechaSolicitudObj = new Date(fechaSolicitudCompleta);
        const fechaSolicitudFormateada = this.formatoFecha(fechaSolicitudObj);
  
        // Actualizar el campo fechaSolicitud en el objeto solicitud con la fecha formateada
        item.solicitudDescarga.fechaEnvioSolicitud = fechaSolicitudFormateada;
      }
  
      return item;
    });
  }
  
  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
  
    return `${dia}-${mes}-${anio}`;
  }

  
   //paginacion y busqueda pagina 1
   page_size:number=5
   page_number1:number=1
   page_number2:number=1
   page_number3:number=1
   page_size_options=[5,10,20,50,100]
 
   handlePage1(e: PageEvent){
     this.page_size=e.pageSize
     this.page_number1=e.pageIndex + 1
   }

   handlePage2(e: PageEvent){
    this.page_size=e.pageSize
    this.page_number2=e.pageIndex + 1
  }
  handlePage3(e: PageEvent){
    this.page_size=e.pageSize
    this.page_number3=e.pageIndex + 1
  }
   
   public search: string = '';
 
   onSearch( search: string ) {
     this.search = search;
     this.page_number1=1;
     this.page_number2=1;
     this.page_number3=1;
   }

   

   //abrir el dialogo informacion aprobado
  openDialogInformacionAprobado(idRespuesta:any): void {
    const dialogRef = this.dialog.open(ViewSolicitudActualizarAprobadoInvestigador, {
      data: {idRespuesta: idRespuesta},
    });
  }

  //abrir el dialogo informacion aprobado
  openDialogInformacionRechazado(idRespuesta:any): void {
    const dialogRef = this.dialog.open(ViewSolicitudActualizarRechazadoInvestigador, {
      data: {idRespuesta: idRespuesta},
    });
  }
 


}

export interface PeriodicElement {
  idSolicitudActualizar: number;
  grupoInvestigacion:{
    usuario:{
      idUsuario:number;
      nombreUsuario:string;
      apellidoUsuario:string;
      email:string;
      cedula:string;
    }
    proyectoInvestigacion:{
      idProyecto:number;
      nombreProyecto:string;
      areaInvestigacion:{
        idAreaInvestigacion:Number;
        nombreAreaInvestigacion:string;
      }
    }
  }
  motivo: string;
}



export interface DialogDataInformacionSolicitud {
  idRespuesta: '';
}


@Component({
  selector: 'view-solicitud-actualizar-aprobado-investigador',
  templateUrl: 'view-solicitud-actualizar-aprobado-investigador.html',
  styleUrls: ['./view-solicitud-actualizar-investigador.component.css']
})

export class ViewSolicitudActualizarAprobadoInvestigador {
  constructor(
    public dialogRef: MatDialogRef<ViewSolicitudActualizarAprobadoInvestigador>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataInformacionSolicitud,
    private respuestaSolicitudActualizarService:RespuestaSolicitudActualizarService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  datosInformacion:any = [];

  ngOnInit(): void {
    console.log(this.data.idRespuesta);
    this.respuestaSolicitudActualizarService.obtener(this.data.idRespuesta).subscribe(
      (dato:any) => {
        this.datosInformacion =this.transformarFechas(dato);
        
      }
    ) 
  }

  transformarFechas(data: any): any {
    if (Array.isArray(data)) {
      // Se trata de una lista de datos
      return data.map(item => this.formatoFechasItem(item));
    } else {
      // Es un objeto individual
      return this.formatoFechasItem(data);
    }
  }
  
  formatoFechasItem(item: any): any {
    if (item.fechaRespuesta) {
      const fechaRespuestaCompleta = item.fechaRespuesta;
      const fechaRespuestaObj = new Date(fechaRespuestaCompleta);
      const fechaRespuestaFormateada = this.formatoFecha(fechaRespuestaObj);
  
      // Actualizar el campo fechaRespuesta con la fecha formateada
      item.fechaRespuesta = fechaRespuestaFormateada;
    }
  
    if (item.solicitudActualizarDato && item.solicitudActualizarDato.fechaEnvioSolicitud) {
      const fechaSolicitudCompleta = item.solicitudActualizarDato.fechaEnvioSolicitud;
      const fechaSolicitudObj = new Date(fechaSolicitudCompleta);
      const fechaSolicitudFormateada = this.formatoFecha(fechaSolicitudObj);
  
      // Actualizar el campo fechaSolicitud en el objeto solicitud con la fecha formateada
      item.solicitudActualizarDato.fechaEnvioSolicitud = fechaSolicitudFormateada;
    }
  
    // Devolver el objeto con las fechas formateadas
    return item;
  }
  
  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
  
    return `${dia}-${mes}-${anio}`;
  }
}



@Component({
  selector: 'view-solicitud-actualizar-rechazado-investigador',
  templateUrl: 'view-solicitud-actualizar-rechazado-investigador.html',
  styleUrls: ['./view-solicitud-actualizar-investigador.component.css']
})

export class ViewSolicitudActualizarRechazadoInvestigador {
  constructor(
    public dialogRef: MatDialogRef<ViewSolicitudActualizarRechazadoInvestigador>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataInformacionSolicitud,
    private respuestaSolicitudActualizarService:RespuestaSolicitudActualizarService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  datosInformacion:any = [];

  ngOnInit(): void {
    console.log(this.data.idRespuesta);
    this.respuestaSolicitudActualizarService.obtener(this.data.idRespuesta).subscribe(
      (dato:any) => {
        this.datosInformacion =this.transformarFechas(dato);
        
      }
    ) 
  }

  transformarFechas(data: any): any {
    if (Array.isArray(data)) {
      // Se trata de una lista de datos
      return data.map(item => this.formatoFechasItem(item));
    } else {
      // Es un objeto individual
      return this.formatoFechasItem(data);
    }
  }
  
  formatoFechasItem(item: any): any {
    if (item.fechaRespuesta) {
      const fechaRespuestaCompleta = item.fechaRespuesta;
      const fechaRespuestaObj = new Date(fechaRespuestaCompleta);
      const fechaRespuestaFormateada = this.formatoFecha(fechaRespuestaObj);
  
      // Actualizar el campo fechaRespuesta con la fecha formateada
      item.fechaRespuesta = fechaRespuestaFormateada;
    }
  
    if (item.solicitudActualizarDato && item.solicitudActualizarDato.fechaEnvioSolicitud) {
      const fechaSolicitudCompleta = item.solicitudActualizarDato.fechaEnvioSolicitud;
      const fechaSolicitudObj = new Date(fechaSolicitudCompleta);
      const fechaSolicitudFormateada = this.formatoFecha(fechaSolicitudObj);
  
      // Actualizar el campo fechaSolicitud en el objeto solicitud con la fecha formateada
      item.solicitudActualizarDato.fechaEnvioSolicitud = fechaSolicitudFormateada;
    }
  
    // Devolver el objeto con las fechas formateadas
    return item;
  }
  
  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
  
    return `${dia}-${mes}-${anio}`;
  }
}