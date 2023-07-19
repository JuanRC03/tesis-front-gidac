import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewInformacionWebDataSource, ViewInformacionWebItem } from './view-informacion-web-datasource';
import { AppWebService } from 'src/app/services/app-web.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface DialogDataInformacionAppWeb {
  idInformacion: '';
}

@Component({
  selector: 'app-view-informacion-web',
  templateUrl: './view-informacion-web.component.html',
  styleUrls: ['./view-informacion-web.component.css']
})
export class ViewInformacionWebComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewInformacionWebItem>;
  dataSource: ViewInformacionWebDataSource;


  constructor(private appWebService:AppWebService,
              public dialog: MatDialog) {
    this.dataSource = new ViewInformacionWebDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.appWebService.listarInformacionAppWeb().subscribe(
          (res:any)=>{
            this.listaDatos=this.transformarFechas(res);
          },
          err=>console.log(err)
        )
    }
  
    transformarFechas(data: any[]): any[] {
      return data.map(item => {
        const fechaInicioCompleta = item.fechaCreacion;
        const fechaInicioObj = new Date(fechaInicioCompleta);
        const fechaInicioFormateada = this.formatoFecha(fechaInicioObj);
  
        // Devolver un nuevo objeto con las fechas formateadas y el resto de la estructura de datos sin cambios
        return { ...item, fechaCreacion: fechaInicioFormateada};
      });
    }
  
    formatoFecha(fecha: Date): string {
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear().toString();
  
      return `${dia}/${mes}/${anio}`;
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

    //abrir el dialogo informacion
    openDialogInformacion(idInformacionApp:any): void {
      const dialogRef = this.dialog.open(ViewAppWebIformacion, {
        data: {idInformacion: idInformacionApp},
      });
    }

  }
  

  @Component({
    selector: 'view-informacion-app-web-actualizada',
    templateUrl: 'view-informacion-app-web-actualizada.html',
    styleUrls: ['./view-informacion-web.component.css']
  })
  
  export class ViewAppWebIformacion{
    constructor(
      public dialogRef: MatDialogRef<ViewAppWebIformacion>,
      @Inject(MAT_DIALOG_DATA) public data:DialogDataInformacionAppWeb,
      private appWebService:AppWebService
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    datosInformacion:any = [];
  
    ngOnInit(): void {
      console.log(this.data.idInformacion);
      this.appWebService.getInformacionAppWeb(this.data.idInformacion).subscribe(
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
  