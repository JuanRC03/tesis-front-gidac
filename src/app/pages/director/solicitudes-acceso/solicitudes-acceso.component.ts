import { Component, OnInit, Inject } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { PageEvent } from '@angular/material/paginator';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { MatTabsModule } from '@angular/material/tabs';
import { RespuestaSolicitudDescargaService } from 'src/app/services/respuesta-solicitud-descarga.service';
import { ActivatedRoute } from '@angular/router';


export interface DialogData {
  id: '';
  respuesta:''
}

export interface DialogDataInformacionSolicitud {
  idRespuesta: '';
}

@Component({
  selector: 'app-solicitudes-acceso',
  templateUrl: './solicitudes-acceso.component.html',
  styleUrls: ['./solicitudes-acceso.component.css'],
  
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class SolicitudesAccesoComponent implements OnInit {

  constructor(private solicitudAccesoService:SolicitudAccesoService, 
              public dialog: MatDialog,
              private route:ActivatedRoute,
              private respuestaSolicitudDescargaService:RespuestaSolicitudDescargaService) { }

  dataSource:any= [];
  dataDescarga:any= [];
  dataSourceAceptado:any= [];
  dataSourceRechazado:any= [];
  columnsToDisplay = ['nombre', 'apellido', 'emial', 'institucion'];
  columnLabels: { [key: string]: string } = {
    nombre: 'Nombre',
    apellido: 'Apellido',
    emial: 'Email',
    institucion: 'Institucion',
    // Agrega los nombres personalizados para las columnas adicionales
  };
  columnsToDisplayAux = ['Nombre', 'Apellido', 'Email', 'Institucion'];
  columnsToDisplayRespondidos: string[] = ['respuestaSolicitudDescarga.solicitudDescarga.nombre', 'respuestaSolicitudDescarga.solicitudDescarga.apellido', 'respuestaSolicitudDescarga.solicitudDescarga.institucion'];
  columnLabelsRepondidos: { [key: string]: string } = {
    'respuestaSolicitudDescarga.solicitudDescarga.nombre': 'Nombre',
    'respuestaSolicitudDescarga.solicitudDescarga.apellido': 'Apellido',
    'respuestaSolicitudDescarga.solicitudDescarga.institucion': 'Institución'
  };


  columnsToDisplayRes: string[] = ['fecha_respuesta', 'idRespuestaDescarga', 'respuesta', 'solicitudDescarga.apellido', 'solicitudDescarga.email', 'solicitudDescarga.estadoSolicitudDescarga.nombreEstadoDescarga', 'solicitudDescarga.fechaEnvioSolicitud', 'solicitudDescarga.institucion', 'solicitudDescarga.motivo', 'solicitudDescarga.nombre', 'solicitudDescarga.proyectoInvestigacion.nombreProyecto'];

  columnLabelsRes: { [key: string]: string } = {
    'fecha_respuesta': 'Fecha de Respuesta',
    'idRespuestaDescarga': 'ID de Respuesta de Descarga',
    'respuesta': 'Respuesta',
    'solicitudDescarga.apellido': 'Apellido',
    'solicitudDescarga.email': 'Email',
    'solicitudDescarga.estadoSolicitudDescarga.nombreEstadoDescarga': 'Estado de Descarga',
    'solicitudDescarga.fechaEnvioSolicitud': 'Fecha de Envío',
    'solicitudDescarga.institucion': 'Institución',
    'solicitudDescarga.motivo': 'Motivo',
    'solicitudDescarga.nombre': 'Nombre',
    'solicitudDescarga.proyectoInvestigacion.nombreProyecto': 'Nombre del Proyecto'
  };


  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null=null;

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5', 'opciones'];

  idAreaInvestigacion=0;

  ngOnInit(): void {
    this.idAreaInvestigacion = this.route.snapshot.params['idAreaInvestigacion'];
    this.listarSolicitados();
    this.listarAprobador();
    this.listarRechazados();
    
  }

  getColumnLabel(column: string): string {
    return this.columnLabels[column] || column;
  }

  getColumnLabelRes(column: string): string {
    return this.columnLabelsRes[column] || column;
  }

  getColumnValueRes(element: any, column: string): string {
    const properties = column.split('.');
    let value = element;
    for (const prop of properties) {
      if (value && value.hasOwnProperty(prop)) {
        value = value[prop];
      } else {
        value = '';
        break;
      }
    }
    return value;
  }

  listarSolicitados(){
    this.solicitudAccesoService.listarSolicitados(this.idAreaInvestigacion).subscribe(
      (data:any) => {
        this.dataSource=this.transformarFechasSolicitadas(data);
        console.log(data);
      }
    )
  }

  listarAprobador(){
    this.respuestaSolicitudDescargaService.obtenerSolicitudesDescargaAceptadas(this.idAreaInvestigacion).subscribe(
      (data:any) => {
        this.dataSourceAceptado=this.transformarFechas(data);
        console.log(data);
      }
    )
  }
  listarRechazados(){
    this.respuestaSolicitudDescargaService.obtenerSolicitudesDescargaRechazadas(this.idAreaInvestigacion).subscribe(
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
  aceptarSolicitud(idSolicitudDescarga:any){
    Swal.fire({
      title:'Enviar datos de investigación',
      text:'¿Estás seguro de enviar los datos de la investigación?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Enviar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitudAccesoService.solicitudAprobada(idSolicitudDescarga).subscribe(
          (data) => {
            //location.reload();
            this.listarAprobador();
            this.dataSource = this.dataSource.filter((dato:any) => dato.idSolicitudDescarga != idSolicitudDescarga);
            Swal.fire('Datos enviados','Los datos han sido enviados al usuario','success');
            this.listarAprobador();
          },
          (error) => {
            Swal.fire('Error','Error al enviar los datos','error');
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
   openDialog(idSolicitudDescarga:any): void {
    const dialogRef = this.dialog.open(DialogRechazo, {
      data: {id: idSolicitudDescarga, respuesta:''},
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.datoresult=result;
      if(this.datoresult!=''){
        this.listarRechazados();
        this.dataSource = this.dataSource.filter((dato:any) => dato.idSolicitudDescarga != idSolicitudDescarga);
        console.log(this.datoresult);
      }
    });
  }

  //abrir el dialogo informacion aprobado
  openDialogInformacionAprobado(idRespuestaDescarga:any): void {
    const dialogRef = this.dialog.open(DialogIformacionAprobado, {
      data: {idRespuesta: idRespuestaDescarga},
    });
  }

  //abrir el dialogo informacion aprobado
  openDialogInformacionRechazado(idRespuestaDescarga:any): void {
    const dialogRef = this.dialog.open(DialogIformacionRechazado, {
      data: {idRespuesta: idRespuestaDescarga},
    });
  }

  recorerDatos(datosPaso:any){
    for(let i = 0; i < datosPaso.length; i++) {
      // Agregas los valores al arreglo 'dataAux'
      const nuevoElemento = {
        id: datosPaso[i].idSolicitudDescarga,
        nombre_usuario: datosPaso[i].nombre,
        apellido: datosPaso[i].apellido,
        email:datosPaso[i].emial,
        institucion: datosPaso[i].institucion,
        motivo: datosPaso[i].motivo,
        proyecto:datosPaso[i].proyectoInvestigacion?.nombreProyecto,

      };
      this.dataDescarga.push(nuevoElemento);
    }
  }

  recorerDatosRespuesta(datosPaso:any){
    for(let i = 0; i < datosPaso.length; i++) {
      // Agregas los valores al arreglo 'dataAux'
      const nuevoElemento = {
        nombre_usuario: datosPaso[i].solicitudDescarga?.nombre,
        apellido: datosPaso[i].solicitudDescarga?.apellido,
        email:datosPaso[i].solicitudDescarga?.emial,
        institucion: datosPaso[i].solicitudDescarga?.institucion,
        motivo: datosPaso[i].solicitudDescarga?.motivo,
        proyecto_investigacion: datosPaso[i].solicitudDescarga?.proyectoInvestigacion?.nombreProyecto,
      };
      this.dataDescarga.push(nuevoElemento);
    }
  }

  downloadTodosExcel() {
    this.dataDescarga= [];
    this.recorerDatos(this.dataSource);
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
    this.recorerDatosRespuesta(datosPaso);
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
    this.recorerDatos(this.dataSource);
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

  
  page_number:number=1

  handlePage(e: PageEvent){
    this.page_size=e.pageSize
    this.page_number=e.pageIndex + 1
  }
  

}

export interface PeriodicElement {
  idSolicitudDescarga: number;
  nombre: string;
  apellido: string;
  emial: string;
  institucion: string;
  motivo: string;
}


@Component({
  selector: 'dialog-rechazo',
  templateUrl: 'dialog-rechazo.html',
  styleUrls: ['./solicitudes-acceso.component.css']
})

export class DialogRechazo {
  constructor(
    public dialogRef: MatDialogRef<DialogRechazo>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private snack:MatSnackBar, 
    private solicitudAccesoService:SolicitudAccesoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion:any = [];

formSubmit(){
  if(this.data.respuesta== '' || this.data.respuesta == null){
    this.snack.open('El motivo del rechazo de la solicitud es requerido !!','Aceptar',{
      duration : 300,
      verticalPosition : 'bottom',
      horizontalPosition : 'center'
    });
    return;
  }

  this.solicitudAccesoService.solicitudRechazada(this.data.id,this.data.respuesta).subscribe(
    (data) => {
      console.log(data);
      Swal.fire('Solicitud rechazada','La solicitud ha sido rechazada','success');
      this.dialogRef.close();
      
    },(error) => {
      console.log(error);
      this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
        duration : 3000
      });
    }
  )
  
}
}



@Component({
  selector: 'view-solicitante-descarga-aprobado',
  templateUrl: 'view-solicitante-descarga-aprobado.html',
  styleUrls: ['./solicitudes-acceso.component.css']
})

export class DialogIformacionAprobado {
  constructor(
    public dialogRef: MatDialogRef<DialogIformacionAprobado>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataInformacionSolicitud,
    private respuestaSolicitudDescargaService:RespuestaSolicitudDescargaService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  datosInformacion:any = [];

  ngOnInit(): void {
    console.log(this.data.idRespuesta);
    this.respuestaSolicitudDescargaService.obtener(this.data.idRespuesta).subscribe(
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
  
    if (item.solicitudDescarga && item.solicitudDescarga.fechaEnvioSolicitud) {
      const fechaSolicitudCompleta = item.solicitudDescarga.fechaEnvioSolicitud;
      const fechaSolicitudObj = new Date(fechaSolicitudCompleta);
      const fechaSolicitudFormateada = this.formatoFecha(fechaSolicitudObj);
  
      // Actualizar el campo fechaSolicitud en el objeto solicitud con la fecha formateada
      item.solicitudDescarga.fechaEnvioSolicitud = fechaSolicitudFormateada;
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
  selector: 'view-solicitante-descarga-rechazado',
  templateUrl: 'view-solicitante-descarga-rechazado.html',
  styleUrls: ['./solicitudes-acceso.component.css']
})

export class DialogIformacionRechazado {
  constructor(
    public dialogRef: MatDialogRef<DialogIformacionRechazado>,
    @Inject(MAT_DIALOG_DATA) public data:DialogDataInformacionSolicitud,
    private respuestaSolicitudDescargaService:RespuestaSolicitudDescargaService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  datosInformacion:any = [];

  ngOnInit(): void {
    console.log(this.data.idRespuesta);
    this.respuestaSolicitudDescargaService.obtener(this.data.idRespuesta).subscribe(
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
  
    if (item.solicitudDescarga && item.solicitudDescarga.fechaEnvioSolicitud) {
      const fechaSolicitudCompleta = item.solicitudDescarga.fechaEnvioSolicitud;
      const fechaSolicitudObj = new Date(fechaSolicitudCompleta);
      const fechaSolicitudFormateada = this.formatoFecha(fechaSolicitudObj);
  
      // Actualizar el campo fechaSolicitud en el objeto solicitud con la fecha formateada
      item.solicitudDescarga.fechaEnvioSolicitud = fechaSolicitudFormateada;
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
