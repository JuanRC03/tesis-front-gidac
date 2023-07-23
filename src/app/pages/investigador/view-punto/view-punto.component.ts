import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from 'src/app/services/dataset.service';
import Swal from 'sweetalert2';
import { ViewPuntoDataSource, ViewPuntoItem } from './view-punto-datasource';
import { InvestigacionService } from 'src/app/services/investigacion.service';

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
    private investigacionService:InvestigacionService ) {
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
  }
  


