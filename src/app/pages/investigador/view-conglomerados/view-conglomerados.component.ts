import { AfterViewInit, Component, ElementRef, Inject, ViewChild,EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConglomeradoService } from 'src/app/services/conglomerado.service';
import Swal from 'sweetalert2';
import { ViewConglomeradosDataSource, ViewConglomeradosItem } from './view-conglomerados-datasource';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { Chart } from 'chart.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlturaService } from 'src/app/services/altura.service';
@Component({
  selector: 'app-view-conglomerados',
  templateUrl: './view-conglomerados.component.html',
  styleUrls: ['./view-conglomerados.component.css']
})
export class ViewConglomeradosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewConglomeradosItem>;
  dataSource: ViewConglomeradosDataSource;

  constructor(private conglomeradoService: ConglomeradoService,
    public dialog: MatDialog,
    private investigacionService: InvestigacionService,
    private route: ActivatedRoute,
    private datoRecolectadoService:DatoRecolectadoService) {
    this.dataSource = new ViewConglomeradosDataSource();
  }


  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];

  ngAfterViewInit(): void {
  }



  idProyecto = 0;
  ngOnInit(): void {
    this.listaDatos = [];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
    this.listarProyectosVigentes();
    this.cargarGraficasProyecto(this.idProyecto);
  }


  listaDatos: any = []

  datos: any = []
  listarProyectosVigentes() {
    this.investigacionService.obtenerProyectoInvestigacion(this.idProyecto).subscribe(
      res => {
        this.datos = res;
      },
      err => console.log(err)
    )
  }

  listarVigentes() {
    this.conglomeradoService.obtenerPorProyecto(this.idProyecto).subscribe(
      res => {
        this.listaDatos = res;
      },
      err => console.log(err)
    )
  }

  eliminar(idConglomerado: any) {
    Swal.fire({
      title: 'Eliminar conglomerado',
      text: '¿Estás seguro de eliminar al conglomerado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conglomeradoService.eliminar(idConglomerado).subscribe(
          (data) => {
            this.listaDatos = this.listaDatos.filter((datos: any) => datos.idConglomerado != idConglomerado);
            Swal.fire('Conglomerado eliminado', 'El conglomerado ha sido eliminado', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el conglomerado, el conglomerado debe estar vacio', 'error');
          }
        )
      }
    })
  }

  //paginacion y busqueda
  page_size: number = 5
  page_number: number = 1
  page_size_options = [5, 10, 20, 50, 100]

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }

  public search: string = '';

  onSearch(search: string) {
    this.search = search;
  }
  //abrir el dialogo informacion
  openDialogProyecto(idProyecto: any): void {
    const dialogRef = this.dialog.open(ImportarDatos, {
      data: { idProyectoInvestigacion: idProyecto },
    });
  }




  modelo: any = {
    investigacionGraficoList: []
  };

  chartsContainer = document.getElementById('chartsContainer');


  listaNumericos: any = [];

  private plotData(data: any[]) {
    this.listaNumericos = data;
    for (const key in data) {
      const info = data[key];
      this.modelo.investigacionGraficoList = [];
      for (const tipoValor in info) {
        const investigacionGrafico: any = {
          tipoValor: '',
          valoresLista: []
        }
        if (info.hasOwnProperty(tipoValor)) {
          const datos: Dato[] = info[tipoValor];
          investigacionGrafico.tipoValor = tipoValor;
          for (let i = 0; i < datos.length; i++) {
            const valores: any = {
              valor: null,
              profundidad: '',
            }
            const dato = datos[i];
            valores.valor = dato.valor;
            valores.profundidad = dato.profundidades;
            investigacionGrafico.valoresLista.push(valores);
          }
        }
        
        this.modelo.investigacionGraficoList.push(investigacionGrafico);
      }
      
    }
    console.log("datos 2")
        console.log(this.modelo);
  }




  generateCharts(): void {
    const investigacionGraficoList = this.modelo.investigacionGraficoList;
    this.chartsContainer = document.getElementById('chartsContainer');

    if (!this.chartsContainer) {
      return;
    }

    // Limpiar gráficos anteriores
    this.chartsContainer.innerHTML = '';

    const chartInstances: { [canvasId: string]: Chart } = {}; // Diccionario para almacenar las instancias de Chart

    investigacionGraficoList.forEach((grafico: any, index: number) => {
      const valores = grafico.valoresLista;
      const labels = valores.map((valor: any) => valor.profundidad);
      const data = valores.map((valor: any) => valor.valor);
      const tipoValor = grafico.tipoValor;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');


      if (ctx) {
        if (!this.chartsContainer) {
          return;
        }
        const divider = document.createElement('hr');
        this.chartsContainer.appendChild(divider);

        this.chartsContainer.appendChild(canvas);


        const chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: tipoValor,
              data: data,
              backgroundColor: 'rgba(37,148,75, 0.5)',
              borderColor: 'rgba(37,148,75, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Profundidad' // Título del eje X
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Valor' // Título del eje Y
                },
                ticks: {
                  min: 0, // Valor mínimo del eje Y
                }
              }]
            }
          }
        });

        chartInstances[canvas.id] = chart;


      }
    });

    console.log(chartInstances);

    const canvasId = 'myCanvasId';
    const chartInstance = chartInstances[canvasId];
    if (chartInstance) {
    }
  }


  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  listaDatosGrafico: any = []

  private cargarGraficasProyecto(id: any) {
    // Volver a cargar los datos y procesarlos
    this.datoRecolectadoService.listarTodosLosDatos(id).subscribe(
      (response: any) => {
        console.log("datos 1")
        console.log(response);
        this.plotData(response);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
    if (!this.chartsContainer) {
      return;
    }
    const canvasElements = this.chartsContainer.querySelectorAll('canvas');
    const diverElements = this.chartsContainer.querySelectorAll('hr');    
    canvasElements.forEach((canvasElement) => {
      canvasElement.remove();
    });
    diverElements.forEach((diverElement) => {
      diverElement.remove();
    });
  }


}






interface Dato {
  profundidades: String;
  valor: number;
}


export interface DialogDataProyectoInvestigacion {
  idProyectoInvestigacion: '';
}

@Component({
  selector: 'importar-datos',
  templateUrl: 'importar-datos.html',
  styleUrls: ['./view-conglomerados.component.css']
})

export class ImportarDatos {
  constructor(
    private datoRecolectadoService: DatoRecolectadoService,
    public dialogRef: MatDialogRef<ImportarDatos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProyectoInvestigacion,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  proyectoInvestigacion: any = {
    idProyecto: ''
  }


  ngOnInit(): void {
    this.proyectoInvestigacion.idProyecto = this.data.idProyectoInvestigacion;
  }

  file: File = new File([], "");

  verBoton = false;
  verBotonImput = true;

  /*onFileChanged(event: any): void {
    this.file = event.target.files[0];
  }*/
  onFileChanged(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.verBoton = true;
      this.verBotonImput = false;
    } else {
      this.verBoton = false;
      this.verBotonImput = true;
    }
  }
  formSubmit() {


    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('file', this.file);

    this.datoRecolectadoService.comprobarXLS(formData).subscribe(
      (dato: any) => {
        if (dato == true) {
          this.datoRecolectadoService.variablesDeXLS(formData).subscribe((listaVariables: any) => {
            if (listaVariables && listaVariables.length > 0) {
              Swal.fire('Impotacion exitosa', 'Los datos del archivo han sido agregados con éxito', 'success');
            } else {
              Swal.fire('Error !!', 'El archivo cargado solo tiene la estructura pero no tiene datos para cargar', 'error')
            }
            console.log(listaVariables);
          })

        } else {
          Swal.fire('Error !!', 'El archivo cargado no tiene el formato adecuado', 'error')
          this.verBoton = false;
          this.verBotonImput = true;
        }
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al guardar los datos del archivo', 'error')
      }
    )
  }

}




