import { Component, OnInit, Inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { PageEvent } from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { SolicitudEliminarService } from 'src/app/services/solicitud-eliminar.service';
import { ActivatedRoute } from '@angular/router';
import { RespuestaSolicitudActualizarService } from 'src/app/services/respuesta-solicitud-actualizar.service';
import { SideDirectorComponent } from '../side-director/side-director.component';

export interface DialogData {
  id: '';
  motivo:''
}

@Component({
  selector: 'app-solicitudes-eliminar',
  templateUrl: './solicitudes-eliminar.component.html',
  styleUrls: ['./solicitudes-eliminar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SolicitudesEliminarComponent implements OnInit {

  constructor(private solicitudAccesoService:SolicitudAccesoService, 
              private respuestaSolicitudActualizarService:RespuestaSolicitudActualizarService,
              public dialog: MatDialog,
              public sideDirectorComponent:SideDirectorComponent,
              private route:ActivatedRoute,) { }

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
                                      'grupoInvestigacion.usuario.cedula': 'Cédula',
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


  idAreaInvestigacion=0;

  ngOnInit(): void {
    this.idAreaInvestigacion = this.route.snapshot.params['idAreaInvestigacion'];
    this.listarSolicitados();
    this.listarAprobador();
    this.listarRechazados();
    
  }


  listarSolicitados(){
    this.solicitudAccesoService.listarSolicitadosEliminar(this.idAreaInvestigacion).subscribe(
      (data:any) => {
        this.dataSourceSolicitado=this.transformarFechasSolicitadas(data);
        console.log(data);
      }
    )
  }

  listarAprobador(){
    this.respuestaSolicitudActualizarService.obtenerSolicitudesActualizarAceptadas(this.idAreaInvestigacion).subscribe(
      (data:any) => {
        this.dataSourceAceptado=this.transformarFechas(data);
        console.log(data);
      }
    )
  }

  listarRechazados(){
    this.respuestaSolicitudActualizarService.obtenerSolicitudesActualizarRechazadas(this.idAreaInvestigacion).subscribe(
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

  //Aprobar solicitud
  aceptarEliminar(id:any){
    console.log(id);
    Swal.fire({
      title:'Aprobar solicitud de actualizar datos',
      text:'¿Estás seguro de aprobar la solicitud de actualizar datos?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Aprobar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitudAccesoService.aprobarSolicitudEliminar(id).subscribe(
          (data) => {
            //location.reload();
            this.listarAprobador();
            this.dataSourceSolicitado = this.dataSourceSolicitado.filter((dato:any) => dato.idSolicitudActualizar != id);
            Swal.fire('Solicitud aprobada','La solicitud ha sido aprobada','success');
          },
          (error) => {
            Swal.fire('Error en el sistema','Error al aprobar la solicitud','error');
          }
        )
      }
    })
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

   datoresult='';
   openDialog(idSol:any): void {
    const dialogRef = this.dialog.open(DialogAprobadoEliminar, {
      data: {id: idSol, motivo:''},
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result == 'Rechazado'){
        this.listarRechazados();
        this.sideDirectorComponent.listarContadorDeSolicitudes();
        this.dataSourceSolicitado = this.dataSourceSolicitado.filter((dato:any) => dato.idSolicitudActualizar != idSol);
        console.log(this.datoresult);
      }
      
      
    });
  }

  recorerDatos(datosPaso:any){
    for(let i = 0; i < datosPaso.length; i++) {
      // Agregas los valores al arreglo 'dataAux'
      const nuevoElemento = {
        id: datosPaso[i].id,
        nombre: datosPaso[i].nombre,
        apellido: datosPaso[i].apellido,
        email:datosPaso[i].investigacion,
        institucion: datosPaso[i].estado,
        motivo: datosPaso[i].motivo,
        estado: datosPaso[i].respuesta,
      };
      this.dataDescarga.push(nuevoElemento);
    }
  }

  downloadTodosExcel() {
    this.dataDescarga= [];
    this.recorerDatos(this.dataSourceSolicitado);
    let worksheet = XLSX.utils.json_to_sheet(this.dataDescarga);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Solicitados');

    this.dataDescarga= [];
    this.recorerDatos(this.dataSourceAceptado);
    worksheet = XLSX.utils.json_to_sheet(this.dataDescarga);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Aceptados');

    this.dataDescarga= [];
    this.recorerDatos(this.dataSourceRechazado);
    worksheet = XLSX.utils.json_to_sheet(this.dataDescarga);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rechazados');

    // Convertir el libro de trabajo a un archivo de Excel y crear un objeto Blob con el contenido
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Descargar el archivo Excel usando la librería file-saver
    saveAs(blob, 'table_data.xlsx');
  }

  downloadExcel(datosPaso:any) {
    this.dataDescarga= [];
    this.recorerDatos(datosPaso);
    // Convertir los datos de la tabla en un objeto de hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(this.dataDescarga);
  
    // Crear un objeto de libro de trabajo y agregar la hoja de cálculo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DatosSolitud');
  
    // Convertir el libro de trabajo a un archivo de Excel y crear un objeto Blob con el contenido
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Descargar el archivo Excel usando la librería file-saver
    saveAs(blob, 'table_data.xlsx');
  }

  downloadTodosCSV() {
    // Convertir los datos de la tabla en un archivo CSV
    this.dataDescarga= [];
    this.recorerDatos(this.dataSourceSolicitado);
    this.recorerDatos(this.dataSourceAceptado);
    this.recorerDatos(this.dataSourceRechazado);
    const csv = this.convertToCSV(this.dataDescarga);
    
    // Crear un objeto Blob con el contenido del archivo CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    // Descargar el archivo CSV usando la librería file-saver
    saveAs(blob, 'table_data.csv');

  }

  downloadCSV(datosPaso:any) {
    // Convertir los datos de la tabla en un archivo CSV
    this.dataDescarga= [];
    this.recorerDatos(datosPaso);
    const csv = this.convertToCSV(this.dataDescarga);
    
    // Crear un objeto Blob con el contenido del archivo CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    // Descargar el archivo CSV usando la librería file-saver
    saveAs(blob, 'table_data.csv');

  }

  convertToCSV(data: any[]) {
    const separator = ',';
    const keys = Object.keys(data[0]);

    // Crear la primera fila del archivo CSV con los nombres de las columnas
    let csv = keys.join(separator) + '\n';

    // Crear el resto de filas del archivo CSV con los datos de la tabla
    data.forEach(item => {
      const row = keys.map(key => item[key]).join(separator) + '\n';
      csv += row;
    });

    return csv;
  }

  //abrir el dialogo informacion aprobado
  openDialogInformacionAprobado(idRespuesta:any): void {
    const dialogRef = this.dialog.open(ViewSolicitudActualizarAprobado, {
      data: {idRespuesta: idRespuesta},
    });
  }

  //abrir el dialogo informacion aprobado
  openDialogInformacionRechazado(idRespuesta:any): void {
    const dialogRef = this.dialog.open(ViewSolicitudActualizarRechazado, {
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



@Component({
  selector: 'dialog-aprobado-eliminar',
  templateUrl: 'dialog-aprobado-eliminar.html',
  styleUrls: ['./solicitudes-eliminar.component.css']
})

export class DialogAprobadoEliminar {
  constructor(
    public dialogRef: MatDialogRef<DialogAprobadoEliminar>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private snack:MatSnackBar, 
    private solicitudAccesoService:SolicitudAccesoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



formSubmit(){
  
  if(this.data.motivo== '' || this.data.motivo == null){
    this.snack.open('El motivo del rechazo de la solicitud es requerido !!','Aceptar',{
      duration : 3000,
      verticalPosition : 'bottom',
      horizontalPosition : 'center'
    });
    return;
  }

  this.solicitudAccesoService.rechazarSolicitudEliminar(this.data.id, this.data.motivo).subscribe(
    (data) => {
      console.log(data);

      Swal.fire('Solicitud rechazada','La solicitud ha sido rechazada','success');
      this.dialogRef.close('Rechazado');
      
    },(error) => {
      console.log(error);
      this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
        duration : 3000
      });
    }
  )
  
}
}


export interface DialogDataInformacionSolicitud {
  idRespuesta: '';
}


@Component({
  selector: 'view-solicitud-actualizar-aprobado',
  templateUrl: 'view-solicitud-actualizar-aprobado.html',
  styleUrls: ['./solicitudes-eliminar.component.css']
})

export class ViewSolicitudActualizarAprobado {
  constructor(
    public dialogRef: MatDialogRef<ViewSolicitudActualizarAprobado>,
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
  selector: 'view-solicitud-actualizar-rechazado',
  templateUrl: 'view-solicitud-actualizar-rechazado.html',
  styleUrls: ['./solicitudes-eliminar.component.css']
})

export class ViewSolicitudActualizarRechazado {
  constructor(
    public dialogRef: MatDialogRef<ViewSolicitudActualizarRechazado>,
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