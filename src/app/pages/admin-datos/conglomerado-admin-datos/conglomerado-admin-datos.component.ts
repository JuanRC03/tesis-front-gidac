import { AfterViewInit, Component, OnInit, ViewChild,Inject, ElementRef,OnChanges,EventEmitter  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import * as L from 'leaflet';
import { PopupOptions, tileLayer } from 'leaflet';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { VariableService } from 'src/app/services/variable.service';
import {MatTabsModule} from '@angular/material/tabs';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { switchMap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ConglomeradoService } from 'src/app/services/conglomerado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlturaService } from 'src/app/services/altura.service';
import { DatasetService } from 'src/app/services/dataset.service';
import { MedidaService } from 'src/app/services/medida.service';

interface Marker {
  lat: number;
  lng: number;
  content: string;
}

interface Dato {
  profundidades: String;
  valor: number;
}

interface OrganizacionProyecto {
  idOrganizacion: number;
  nombreOrganizacion: String;
  siglas:String;
  descripcion:String
}



@Component({
  selector: 'app-conglomerado-admin-datos',
  templateUrl: './conglomerado-admin-datos.component.html',
  styleUrls: ['./conglomerado-admin-datos.component.css']
})
export class ConglomeradoAdminDatosComponent implements OnInit {

  constructor(private investigacionService:InvestigacionService,
    public dialog: MatDialog,
    private route:ActivatedRoute,
    private datoRecolectadoService:DatoRecolectadoService,
    private http: HttpClient,
    private variableService:VariableService,
    private organizacionService:OrganizacionService,
    private conglomeradoService:ConglomeradoService,
    public matDialog: MatDialog,
    private alturaService:AlturaService,
    private datasetService:DatasetService) { 
      
    }

  panelOpenGrafico = false;
  idProyecto= 0;
  nmbrePoryecto= 0;
  listaDatos: any = []
  datos: any = []
  
  private ngUnsubscribe = new Subject();
  private routeSubscription!: Subscription;

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];

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

  onTabChange(event: any) {
    if(event.index === 1) {
      if (!this.map) {
        this.initMap();
        this.fetchData(this.idProyecto);
      }
    }
  }

  opcionSeleccionadaDataset: any = {
    codigoDataset: 0,
  }
  listaDatosDataset: any = [];
    listarDatasets() {
      this.datasetService.obtenerDatasets(this.idProyecto).subscribe(
        res => {
          this.listaDatosDataset = res;
          this.listaDatosDataset.unshift({ codigoDataset: 0, fechaInicioDataset: 'Todos' });
          this.opcionSeleccionadaDataset.codigoDataset=0;
        },
        err => console.log(err)
      )
    }

    onDatasetChange(): void {
      this.reloadMarkersCatalogo();
    }

  listaDatosConglomerado: any = []


  listarConglomeradosVigentes() {
    this.conglomeradoService.obtenerPorProyecto(this.idProyecto).subscribe(
      res => {
        this.listaDatosConglomerado = res;
      },
      err => console.log(err)
    )
  }

  eliminar(idConglomerado: any) {
    Swal.fire({
      title: 'Eliminar información',
      text: '¿Estás seguro de eliminar el conglomerado?',
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
            this.listaDatosConglomerado = this.listaDatosConglomerado.filter((datos: any) => datos.idConglomerado != idConglomerado);
            Swal.fire('Información eliminada', 'El conglomerado ha sido eliminado', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el conglomerado', 'error');
          }
        )
      }
    })
  }
  
  ngAfterViewInit(): void {
    this.initMap();
    this.fetchData(this.idProyecto);
  }
  ngOnInit(): void {
    
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.idProyecto = this.route.snapshot.params['idProyecto'];
      this.listarConglomeradosVigentes();
      this.listarProyectosVigentes(this.idProyecto);
      
      this.listarVariablesDifucion(0,0);
      this.listarOrganizaciones();
      this.listarFamiliasVariables();
      
      this.listarTipoChart();
      this.listarAltitud();
      this.listarDatasets();
      
    })
  }

  altitud : any = []

  listarAltitud()
    {
      this.alturaService.listar().subscribe(
          res=>{
            this.altitud=res;
          },
          err=>console.log(err)
        )
    }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  listarProyectosVigentes(id:any) {
    this.investigacionService.obtenerProyectoInvestigacion(id).subscribe(
      res => {
        this.datos = res;
      },
      err => console.log(err)
    )
  }

 
  listaOrganizaciones : any = []
  
  listarOrganizaciones()
  {
    this.organizacionService.listar().subscribe(
        res=>{
          this.listaOrganizaciones=res;

          if (this.listaOrganizaciones.length > 0) {
            this.listaOrganizaciones.unshift({ idOrganizacion: 0, siglas: 'Variables del sistema'});
          }
          this.organizacionSeleccionado.idOrganizacion = 0;
          
        },
        err=>console.log(err)
      )
  }

  listarFamiliasVariables()
  {
    this.variableService.listarFamiliasVariables().subscribe(
        res=>{
          this.listaFamiliaVariable=res;
          if (this.listaFamiliaVariable.length > 0) {
            this.listaFamiliaVariable.unshift({ idFamilia: 0, descripcion: 'Todas las familias'});
          }
          this.familiaOrganizacionSeleccionado.idFamilia = 0;
        },
        err=>console.log(err)
      )
  }

  private fetchData(id:any) {
    this.dataNominal=[];
    this.dataNumerico=[];
    this.datoRecolectadoService.dashlistarTodosLosDatosProyectoVariableUnido(id,0,0).subscribe(
      (response: any) => {
        this.plotData(response);

      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
    this.cargarDatosVariableProyecto(0);
    this.openPopup = null;
  }

  listarVariablesDifucion(id:any, idOrganizacion:any){
    this.variableService.listarVariablesDifusion(id, idOrganizacion).subscribe(
      (dato: any) => {
        this.listaCatalogoOrganizacion = dato;
        console.log(dato);
        if (this.listaCatalogoOrganizacion.length > 0) {
          this.listaCatalogoOrganizacion.unshift({ idVariable: 0, nombreVariable: 'Todos los datos', siglas:'Todos', nombreOrganizacion:'Todos'});
        }
      }
    )
  }
  

  

  public searchOrganizacionVariable: string = '';
  opcionSeleccionada:any;
  organizacionSeleccionado= {
    idOrganizacion: 0,
  }

  onOrganizacionChange(event: any): void {
    this.listarVariablesDifucion(this.familiaOrganizacionSeleccionado.idFamilia, this.organizacionSeleccionado.idOrganizacion);
  }

  listaFamiliaVariable : any = []

  

  public searchFamiliaOrganizacion: Number = 0;
  opcionSeleccionadaFamilia:any;

  familiaOrganizacionSeleccionado= {
    idFamilia: 0,
  }
  onFamiliaChange(event: any): void {
    //this.opcionSeleccionadaFamilia = this.listaFamiliaVariable.find((option: FamiliaOrganizacion) => option.idFamilia === event.value);
    //console.log(this.opcionSeleccionada.idFamilia)
    this.listarVariablesDifucion(this.familiaOrganizacionSeleccionado.idFamilia, this.organizacionSeleccionado.idOrganizacion);
  }
  

  // mapa de datos
  map!: L.Map;
  private markers: L.Polygon[] = [];
  private openPopup: L.Layer | null = null;
  private currentMapName: string = 'Mapa de provincias';

  initMap() {
    const southWest = L.latLng(-84.399864, -170.253768);
    const northEast = L.latLng(84.922810, 178.346924);
    const bounds = L.latLngBounds(southWest, northEast);
    this.map = L.map('map', {
      center: [-1.164, -78.201],
      zoom: 7,
      maxBounds: bounds,
      maxBoundsViscosity: 0.7
    });
    this.map.zoomControl.setPosition('bottomright');
    tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 50,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.setMinZoom(2.5);    
  }

  //cargar datos en mapa
  

  //cargar datos en mapa
  dataNominal: any=[];
  dataNumerico: any=[];

  private cargarDatosVariableProyecto(id:any) {
    this.datoRecolectadoService.dashlistarTodosLosDatosProyectoVariable(this.idProyecto,id).subscribe(
      (response: any) => {
        
        this.dataNumerico=response;
        this.getCoordenadas1(this.dataNumerico);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );

    this.datoRecolectadoService.dashlistarTodosLosDatosProyectoVariableNominal(this.idProyecto,id).subscribe(
      (response: any) => {
        this.dataNominal=response;
        this.getCoordenadas2(this.dataNominal);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    ); 
  }

  dataKeys1: string[] = [];
  dataKeys2: string[] = [];
  getCoordenadas1(data: any){
    this.dataKeys1 = Object.keys(data); // Obtenemos las claves del objeto para usar en el template
  }
  getCoordenadas2(data: any){
    this.dataKeys2 = Object.keys(data); // Obtenemos las claves del objeto para usar en el template
  }


  
  modelo: any = {
    investigacionGraficoList: []
  };

  modeloNominal: any = {
    investigacionDatos: []
  };

  


  chartsContainer = document.getElementById('chartsContainer');

  isNumber: boolean=true;

  private plotData(data: any[]) {
    this.clearMarkers();
    for (const key in data) {
      const coordinates = key.split(',');
      const latLng: L.LatLngTuple = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
      const square = L.polygon([
        [latLng[0] - 0.001, latLng[1] - 0.001],
        [latLng[0] + 0.001, latLng[1] - 0.001],
        [latLng[0] + 0.001, latLng[1] + 0.001],
        [latLng[0] - 0.001, latLng[1] + 0.001]
      ], { color: 'red', fillOpacity: 100, weight: 1 }).addTo(this.map);

      const info = data[key];
      const locationData = {
        country: '',
        state: '',
        county: '',
        parroquia: ''
      };


      let isProcessingClick = false; 
      square.on('click', async (event) => {


        isProcessingClick = true;
        
        this.modelo.investigacionGraficoList = [];
        this.modeloNominal.investigacionDatos = [];
        //const apiUrl = `/api/reverse?format=jsonv2&lat=${latLng[0]}&lon=${latLng[0]}`;
  
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLng[0]}&lon=${latLng[1]}`;
        this.http.get(apiUrl).subscribe((response: any) => {
          console.log(response)
          locationData.country = response.address.country;
          locationData.state = response.address.state;
          locationData.county = response.address.county;
          locationData.parroquia = response.address.village;
          this.investigacionDat.country = response.address.country;
          this.investigacionDat.state = response.address.state;
          this.investigacionDat.county = response.address.county;
          this.investigacionDat.parroquia = response.address.village;
          this.investigacionDat.coordenadax = latLng[0];
          this.investigacionDat.coordenaday = latLng[1];
          
          let message = `<div>`;
          message = `<div style="display: flex; justify-content: center; align-items: center;"><b>Muestra</b></div>`;
          message += `<div style="margin-bottom: 7px;"><b>Coordenadas:</b><br> <b>Latitud:</b> ${latLng[0]}, <b>Longitud:</b> ${latLng[1]}</div>`;
          message += `<div style="margin-bottom: 7px;"><b>Ubicación:</b><br> <b>Pais:</b> ${locationData.country}<br><b>Provincia:</b> ${locationData.state}<br><b>Cantón:</b> ${locationData.county}<br><b>Parroquia:</b> ${locationData.parroquia}</div>`;

          for (const tipoValor in info) {
            const investigacionGrafico: any = {
              tipoValor: '',
              valoresLista: []
            }
            if (info.hasOwnProperty(tipoValor)) {


              const datos: Dato[] = info[tipoValor];
              console.log(datos);
              let tipoValorStyles = `position: relative;display: flex;min-width: 20em;height: auto;line-height: 1.5;background: #B2C29A;border-radius: 5px;margin-bottom: 1px;word-wrap: break-word; align-items: center;`;
              message += `<div type="button" id="toggleMenuButton_${tipoValor}" onmouseover="this.style.background='#259441'; this.style.color='#FFFFFF';" onmouseout="this.style.background='#B2C29A'; this.style.color='#000000';" style="${tipoValorStyles}">`;
              message += `<p style="padding-left:10px; margin: 0;">${tipoValor} </p>`;
              message += '</div>';
              message += `<div id="menuContent_${tipoValor}" style="display:none;">`;
              message += "<ul>";
              investigacionGrafico.tipoValor = tipoValor;
              for (let i = 0; i < datos.length; i++) {
                const valores: any = {
                  valor: null,
                  profundidad: '',
                }
                const dato = datos[i];
                valores.valor = dato.valor;
                valores.profundidad = dato.profundidades;
                message += `<li>${dato.valor} (${dato.profundidades})</li>`;
                investigacionGrafico.valoresLista.push(valores);
                if (this.isNumber == true) {
                  this.isNumber = !isNaN(parseFloat(valores.valor)) && isFinite(+valores.valor);
                }
              }
              message += "</ul>"
              message += "</div>"
            }
            if (this.isNumber == true) {
              this.modelo.investigacionGraficoList.push(investigacionGrafico);
            } else {
              this.modeloNominal.investigacionDatos.push(investigacionGrafico);
            }
            this.isNumber = true;
          }

          message += "</div>"
          
          console.log(this.modeloNominal);
          this.openPopup = square.bindPopup(message);
          this.openPopup.openPopup();
          this.generateCharts();
          isProcessingClick = false;
          
          const popupContainer = document.querySelector('.leaflet-popup-content-wrapper') as HTMLElement | null;
          if (popupContainer) {
            popupContainer.style.maxHeight = '300px';
            popupContainer.style.overflowY = 'auto';
          }


          for (const tipoValor in info) {
            const toggleMenuButton = document.getElementById(`toggleMenuButton_${tipoValor}`);
            const menuContent = document.getElementById(`menuContent_${tipoValor}`);
            if (toggleMenuButton && menuContent) {
            toggleMenuButton.addEventListener('click', (() => {
              let isMenuOpen = false;
              return () => {
                isMenuOpen = !isMenuOpen;
                menuContent.style.display = isMenuOpen ? 'block' : 'none';
              };
            })())};
          }

        
        });
        //square.bindPopup(message).openPopup();
      });
      this.markers.push(square);
    }
  }

  

  
  
  tipoChart:number=0;

  listaTipoChart : any = []

  listarTipoChart()
  {
    this.listaTipoChart.push({ idTipoChart: 0, descripcion: 'Barras'});
    this.listaTipoChart.push({ idTipoChart: 1, descripcion: 'Lineas'});
    this.listaTipoChart.push({ idTipoChart: 2, descripcion: 'Radar'});
    this.listaTipoChart.push({ idTipoChart: 3, descripcion: 'Pastel'});
  }

  tipoChartSeleccionado= {
    idTipoChart: 0,
  }
  onTipoChart(event: any): void {
    this.tipoChart=this.tipoChartSeleccionado.idTipoChart;
    this.generateCharts();
  }


  
  generateCharts(): void {
    if(this.tipoChart==0){  
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
            type: 'bar', //line //bar//pie//doughnut
            data: {
              labels: labels,
              datasets: [{
                label: tipoValor,
                data: data,
                backgroundColor: 'rgba(178,194,154)',
                borderColor: 'rgba(133,143,116)',
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
                    stepSize: 50,
                  }
                }]
              }
            }
          });
    
          chartInstances[canvas.id] = chart;
    
          
        }
      });
    
      
    
      const canvasId = 'myCanvasId';
      const chartInstance = chartInstances[canvasId];
      if (chartInstance) {
      }
    }else if(this.tipoChart==1){

      // segundo chart 

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
            type: 'line', //line //bar//pie//doughnut
            data: {
              labels: labels,
              datasets: [{
                label: tipoValor,
                data: data,
                backgroundColor: 'rgba(178,194,154)',
                borderColor: 'rgba(133,143,116)',
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
                    stepSize: 50,
                  }
                }]
              }
            }
          });
    
          chartInstances[canvas.id] = chart;
    
          
        }
      });
    
      
    
      const canvasId = 'myCanvasId';
      const chartInstance = chartInstances[canvasId];
      if (chartInstance) {
      }

    }else if(this.tipoChart==2){

      // segundo chart 

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
            type: 'radar', //line //bar//pie//doughnut
            data: {
              labels: labels,
              datasets: [{
                label: tipoValor,
                data: data,
                backgroundColor: 'rgba(178,194,154,0.5)',
                borderColor: 'rgba(133,143,116)',
                borderWidth: 1
              }]
            },
            options: {
              plugins: {
                filler: {
                  propagate: false
                },
                'samples-filler-analyser': {
                  target: 'chart-analyser'
                }
              }
            }
          });
    
          chartInstances[canvas.id] = chart;
    
          
        }
      });
    
      
    
      const canvasId = 'myCanvasId';
      const chartInstance = chartInstances[canvasId];
      if (chartInstance) {
      }

    }else{
      //tercer chart
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
          const titulo = document.createElement('h4');
            titulo.innerHTML = tipoValor; 
            
            this.chartsContainer.appendChild(titulo);
          this.chartsContainer.appendChild(canvas);
          
          const randomColors = Array.from({ length: data.length }, () =>
            `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
          );
          
          const chart = new Chart(ctx, {
            type: 'pie', //line //bar//pie//doughnut
            data: {
              labels: labels,
              
              datasets: [{
                label: tipoValor,
                data: data,
                backgroundColor: randomColors,
                borderWidth: 1
                
              }],
              
              
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Chart Title',
                },
              }
            }
          });
          chartInstances[canvas.id] = chart;      
        }
      });
    
      
    
      const canvasId = 'myCanvasId';
      const chartInstance = chartInstances[canvasId];
      if (chartInstance) {
      }
    }
  }
  

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

 
  listaDatosGrafico:any=[]

  location: any = {
    country: '',
    state: '',
    county: ''
  }
  investigacionDat: any = {
    country: '',
    state: '',
    county: '',
    parroquia: '',
    coordenadax: '',
    coordenaday: '',
  }

  private clearMarkers() {
    this.markers.forEach(marker => marker.removeFrom(this.map));
    this.markers = [];
    this.investigacionDat.country = '';
    this.investigacionDat.state = '';
    this.investigacionDat.county = '';
    this.investigacionDat.parroquia = '';
    this.investigacionDat.coordenadax = '';
    this.investigacionDat.coordenaday = '';
  }


  maps = [

    { name: 'Mapa de provincias', label: 'Mapa de provincias' },
    { name: 'Mapa oscuro', label: 'Mapa oscuro' },
    { name: 'Mapa de calles', label: 'Mapa de calles' },
    { name: 'Mapa satélite', label: 'Mapa satélite' },
    { name: 'Mapa topográfico', label: 'Mapa topográfico' },
  ];

  onMapChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const mapName = selectElement.value;
    if (mapName !== this.currentMapName) {
      this.currentMapName = mapName;
      this.map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          this.map.removeLayer(layer);
        }
      });

      switch (mapName) {
        case 'Mapa oscuro':
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(this.map);
          break;
        case 'Mapa de provincias':
          L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(this.map);
          break;
        case 'Mapa topográfico':
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(this.map);
          break;

        case 'Mapa satélite':
          L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
          }).addTo(this.map);
          break;
        case 'Mapa de calles':
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(this.map);
          break;
      }
    }
  }


  listaMarcadores: any = [];
  listaCatalogoOrganizacion: any = [];
  listaCarbono: any = [];
  listaAux: any = [];
  investigacionData = {
    idInvestigacion: 0
  }

  listarVariables(){
    this.variableService.listar().subscribe(
      (dato: any) => {
        this.listaCatalogoOrganizacion = dato;
        if (this.listaCatalogoOrganizacion.length > 0) {
          this.listaCatalogoOrganizacion.unshift({ idVariable: 0, nombreVariable: 'Todas las variables'});
        }
        
      }
    )
  }

  //filtrar variables

  

  variableSeleccionada = 0;

  filtrarCatalogo(id: any) {
    this.variableSeleccionada = id;
    this.reloadMarkersCatalogo();
  }

  private reloadMarkersCatalogo() {
    this.dataNominal=[];
    this.dataNumerico=[];
    this.openPopup?.closePopup();
    this.openPopup = null;
    this.clearMarkers()
    
    this.datoRecolectadoService.dashlistarTodosLosDatosProyectoVariableUnido(this.idProyecto, this.variableSeleccionada, this.opcionSeleccionadaDataset.codigoDataset).subscribe(
      (response: any) => {
        this.plotData(response);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );

    this.cargarDatosVariableProyecto(this.variableSeleccionada);
    

    if (!this.chartsContainer) {
      return;
    }
    
    const canvasElements = this.chartsContainer.querySelectorAll('canvas');
    const diverElements = this.chartsContainer.querySelectorAll('hr');
    const tituloElements = this.chartsContainer.querySelectorAll('h4');    
    canvasElements.forEach((canvasElement) => {
      canvasElement.remove();
    });
    diverElements.forEach((diverElement) => {
      diverElement.remove();
    });

    tituloElements.forEach((tituloElements) => {
      tituloElements.remove();
    });

    
  }

  //paginador de catalogo
  page_size2:number=5
  page_number2:number=1
  page_size_options2=[5,10,20,50,100]

  handlePage2(e: PageEvent){
    this.page_size2=e.pageSize
    this.page_number2=e.pageIndex + 1
  }

  public searchOrganizacion: string = '';

  onSearchOrganizacion(search: string) {
    this.searchOrganizacion = search;
  }

  

  
}
