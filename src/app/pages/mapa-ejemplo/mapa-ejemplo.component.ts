import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopupOptions, tileLayer } from 'leaflet';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { CarbonoService } from 'src/app/services/carbono.service';
import { AppWebService } from 'src/app/services/app-web.service';
import { FormControl, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { AccesoService } from 'src/app/services/acceso.service';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { DirectorAreaInvestigacionService } from 'src/app/services/director-area-investigacion.service';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { SectorImpactoProyectoService } from 'src/app/services/sector-impacto-proyecto.service';
import { LocalizacionProyectoService } from 'src/app/services/localizacion-proyecto.service';
import { LineaInvestigacionProyectoService } from 'src/app/services/linea-investigacion-proyecto.service';
import { AreaInvestigacionProyectoService } from 'src/app/services/area-investigacion-proyecto.service';
import { HttpClient } from '@angular/common/http';
import { Color } from 'ng2-charts';
import { ChartsModule } from 'ng2-charts';
import { VariableService } from 'src/app/services/variable.service';
import { MatSidenav } from '@angular/material/sidenav';
import { OrganizacionService } from 'src/app/services/organizacion.service';


interface Marker {
  lat: number;
  lng: number;
  content: string;
}

interface Dato {
  profundidades: string;
  valor: number;
}

interface OrganizacionProyecto {
  idOrganizacion: number;
  nombreOrganizacion: String;
  siglas:String;
  descripcion:String
}

@Component({
  selector: 'app-mapa-ejemplo',
  templateUrl: './mapa-ejemplo.component.html',
  styleUrls: ['./mapa-ejemplo.component.css']
})
export class MapaEjemploComponent implements OnInit {

  
  constructor(
    public login: LoginService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private appWebService: AppWebService,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    public datoRecolectadoService: DatoRecolectadoService,
    private investigacionService: InvestigacionService,
    private solicitudAccesoService: SolicitudAccesoService,
    private catalogoOrganizacionService: CatalogoOrganizacionService,
    private VariableService: VariableService,
    private http: HttpClient,
    private carbonoService: CarbonoService,
    private organizacionService:OrganizacionService) {
  }

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isMenuOpen = true;

  toggleMenuMapa() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isLoggedIn = false;
  user: any = null;

  informacionEcoAndes = {
    condicionesUso: '',
    derechoReservado: '',
    descripcion: '',
    licenciaUso: ''
  }

  proyecto0 = {
    idProyecto: 0,
    nombreProyecto: '',
    descripcion: ''
  };

  navbar: any;
  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();


    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )

    this.investigacionService.listarInvestigacionesPublicas().subscribe(
      (dato: any) => {
        this.investigacion = dato;
        this.investigaciones = dato;
        if (this.investigaciones.length > 0) {
          this.investigaciones.unshift({ idProyecto: 0, nombreProyecto: 'Todos los proyectos', descripcion: 'Vizualizar todas los proyectos' });
        }
      }, (error) => {

        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000
        });
      }
    )

    this.mostrarInformacionVigente();

    this.investigacionService.listarInvestigacionesMapa().subscribe(
      (dato: any) => {
        this.investigacionSeleccion = dato;
      }
    )

    this.listarVariablesDifucion(0);
    this.listarOrganizaciones();
    this.listarFamiliasVariables();
    this.initMap();
  }

  listarVariablesDifucion(id:any){
    this.VariableService.listarVariablesDifusion(id,0).subscribe(
      (dato: any) => {
        this.listaCatalogoOrganizacion = dato;
        if (this.listaCatalogoOrganizacion.length > 0) {
          this.listaCatalogoOrganizacion.unshift({ idVariable: 0, nombreVariable: 'Todos los datos', siglas:'Todos', nombreOrganizacion:'Todos'});
        }
      }
    )
  }

  listaOrganizaciones : any = []

  listarOrganizaciones()
  {
    this.organizacionService.listar().subscribe(
        res=>{
          this.listaOrganizaciones=res;

          if (this.listaOrganizaciones.length > 0) {
            this.listaOrganizaciones.unshift({ idOrganizacion: 0, nombreOrganizacion: 'Todas las organizaciones', siglas:'Todos', descripcion:'Todos'});
          }
          this.listaOrganizaciones.idOrganizacion = 0;
        },
        err=>console.log(err)
      )
  }

  public searchOrganizacionVariable: string = '';
  opcionSeleccionada:any;
  onOrganizacionChange(event: any): void {
    this.opcionSeleccionada = this.listaOrganizaciones.find((option: OrganizacionProyecto) => option.idOrganizacion === event.value);
    if(this.opcionSeleccionada.idOrganizacion==0){
      this.searchOrganizacionVariable="";
    }else{
      this.searchOrganizacionVariable=this.opcionSeleccionada.nombreOrganizacion;
    } 
  }

  listaFamiliaVariable : any = []

  listarFamiliasVariables()
  {
    this.VariableService.listarFamiliasVariables().subscribe(
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

  public searchFamiliaOrganizacion: Number = 0;
  opcionSeleccionadaFamilia:any;

  familiaOrganizacionSeleccionado= {
    idFamilia: 0,
  }
  onFamiliaChange(event: any): void {
    //this.opcionSeleccionadaFamilia = this.listaFamiliaVariable.find((option: FamiliaOrganizacion) => option.idFamilia === event.value);
    //console.log(this.opcionSeleccionada.idFamilia)
    this.listarVariablesDifucion(this.familiaOrganizacionSeleccionado.idFamilia);
  }


  ngAfterViewInit() {
    this.fetchData();
  }

  private initMap() {

    console.log(this.modeloDatos);
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




  datosIformacionAppWeb: any = [];

  public mostrarInformacionVigente() {
    this.appWebService.mostrarInformacionAppWebVigente().subscribe(
      (data: any) => {

        if (data != null) {
          this.datosIformacionAppWeb = data;
          this.informacionEcoAndes.condicionesUso = this.datosIformacionAppWeb.condicionesUso;
          this.informacionEcoAndes.derechoReservado = this.datosIformacionAppWeb.derechoReservado;
          this.informacionEcoAndes.descripcion = this.datosIformacionAppWeb.descripcion;
          this.informacionEcoAndes.licenciaUso = this.datosIformacionAppWeb.licenciaUso;
        }
      },
      (error) => {
        console.log(error);
        this.datosIformacionAppWeb = [];
      }
    )
  }



  public panelContro() {
    if (this.login.getUserRole() == 'ADMINISTRADOR') {
      this.router.navigate(['admin']);
    }
    else if (this.login.getUserRole() == 'INVESTIGADOR') {
      this.router.navigate(['user-dashboard']);
    } else if (this.login.getUserRole() == 'DIRECTOR') {
      this.router.navigate(['director-dashboard']);
    }
    else {
      this.login.logout();
    }
  }

  public logout() {
    this.snack.open('La sesión se ha cerrado con exito', 'Aceptar', {
      duration: 3000,
    });
    setTimeout(() => {
      this.login.logout();
      window.location.reload();
    }, 3000);
  }


  selectedMenuItem: number = -1;

  

  investigaciones: any = []

  public search: string = '';

  public searchOrganizacion: string = '';

  onSearch(search: string) {
    this.search = search;
  }



  onSearchOrganizacion(search: string) {
    this.searchOrganizacion = search;
  }

  investigacionSeleccionada = 0;
  variableSeleccionada = -1;


  filtrarInvestigacione(id: any) {
    this.investigacionSeleccionada = id;
    this.variableSeleccionada = -1;
    this.reloadMarkers(id);
  }

  filtrarCatalogo(id: any) {
    this.investigacionSeleccionada = -1;
    this.variableSeleccionada = id;
    this.reloadMarkersCatalogo(id);
  }

  @ViewChild('radioButton', { static: false }) radioButton!: ElementRef<HTMLInputElement>;


  private reloadMarkers(id: any) {
    this.dataNominal=[];
    this.dataNumerico=[];
    this.openPopup = null;
    this.clearMarkers()
    // Volver a cargar los datos y procesarlos
    this.datoRecolectadoService.listarTodosLosDatosUnidos(id,0).subscribe(
      (response: any) => {
        this.plotData(response);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );

    this.cargarDatosVariableProyecto(id);

    if (this.radioButton) {
      this.radioButton.nativeElement.checked = false;
    }
      
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

  
  private reloadMarkersCatalogo(id: any) {
    this.dataNominal=[];
    this.dataNumerico=[];
    this.openPopup?.closePopup();
    this.openPopup = null;
    this.clearMarkers()
    
    this.datoRecolectadoService.listarTodosLosDatosCatalogoUnidos(id).subscribe(
      (response: any) => {
        this.plotData(response);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );

    this.cargarDatosVariableCatalogo(id);
    //this.radioButton.nativeElement.checked = false;
    if (this.radioButton) {
      this.radioButton.nativeElement.checked = false;
    }

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


  investigacion: any = [];

  solicitudData = {
    nombre: '',
    apellido: '',
    emial: '',
    institucion: '',
    motivo: '',
    proyectoInvestigacion: {
      idProyecto: ''
    }
  }
  @ViewChild('formSubmitSolicitudAccesoDatos')
  solicitudForm!: NgForm;

  formSubmitSolicitudAccesoDatos() {
    if (this.solicitudData.nombre == '' || this.solicitudData.nombre == null) {
      this.snack.open('El nombre es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.solicitudData.apellido == '' || this.solicitudData.apellido == null) {
      this.snack.open('El apellido es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.solicitudData.emial == '' || this.solicitudData.emial == null) {
      this.snack.open('El email es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.solicitudData.institucion == '' || this.solicitudData.institucion == null) {
      this.snack.open('El nombre de la institución es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.solicitudData.motivo == '' || this.solicitudData.motivo == null) {
      this.snack.open('El motivo de la solicitud es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    if (this.solicitudData.proyectoInvestigacion.idProyecto == '' || this.solicitudData.proyectoInvestigacion.idProyecto == null) {
      this.snack.open('Debe escojer una investigación!!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }

    this.solicitudAccesoService.enviarSolictudDescarga(this.solicitudData).subscribe(
      (data) => {
        this.solicitudData.nombre = '';
        this.solicitudData.apellido = '';
        this.solicitudData.emial = '';
        this.solicitudData.institucion = '';
        this.solicitudData.motivo = '';
        this.solicitudData.proyectoInvestigacion.idProyecto = '';
        this.snack.open('Solicitud enviada, Este pendiente del correo registrado', 'Aceptar', {
          duration: 5000
        });

        //this.solicitudForm.reset();
      }, (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration: 3000
        });
      }
    )
  }

  // mapa de datos
  map!: L.Map;
  private markers: L.Polygon[] = [];
  private openPopup: L.Layer | null = null;
  private currentMapName: string = 'Mapa de provincias';

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

  activarLocalizaciones(){
    var Stamen_TonerLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
    });
  }

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
  investigacionSeleccion: any = [];
  searchText = "";


  //cargar datos en mapa
  private fetchData() {
    this.dataNominal=[];
    this.dataNumerico=[];
    this.datoRecolectadoService.listarTodosLosDatosUnidos(0,0).subscribe(
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
  
  listaDatos:any=[];

  modelo: any = {
    investigacionGraficoList: []
  };

  modeloNominal: any = {
    investigacionDatos: []
  };

  
  


  chartsContainer = document.getElementById('chartsContainer');

  isNumber: boolean=true;

  toggleMenuVariable(tipoValor: any): void {
    tipoValor.isMenuOpen = !tipoValor.isMenuOpen;
  }

  toggleMenu(modelo: any): void {
    console.log('llega a modificar')
    modelo.isMenuOpen = !modelo.isMenuOpen;
  }

  modeloDatos: any[] = [];

  
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
      const onSquareClick = async (event: L.LeafletMouseEvent) => {
        
        this.modelo.investigacionGraficoList = [];
        this.modeloNominal.investigacionDatos = [];
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latLng[0]}&lon=${latLng[1]}`;
        this.http.get(apiUrl).subscribe((response: any) => {
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
  
          const popup = L.popup({ closeButton: false })
            .setLatLng(latLng)
            .openOn(this.map);
  
          let content = `<div>`;
          content += `<b>Coordenadas:</b><br> <b>Latitud:</b> ${latLng[0]}, <b>Longitud:</b> ${latLng[1]}<br><br>`;
          content += `<b>Ubicación:</b><br> <b>País:</b> ${locationData.country}<br><b>Provincia:</b> ${locationData.state}<br><b>Cantón:</b> ${locationData.county}<br><b>Parroquia:</b> ${locationData.parroquia}<br><br>`;
  
          const tipoValores = Object.keys(info);
          
          content += '<label for="tipoValor-dropdown">Seleccionar tipoValor:</label><br>';
          content += '<div style="position: relative;display: flex;width: 20em;height: 3em;line-height: 3;background: #5c6664;overflow: hidden;border-radius: .25em;">';
          content += '<select style="outline:0;box-shadow:none;background: #fff;background-image: none;flex: 1;padding: 0 .5em;color:#000000;cursor:pointer;font-size: 1em;" id="tipoValor-dropdown">';
          tipoValores.forEach((tipoValor) => {
            content += `<option value="${tipoValor}">${tipoValor}</option>`;
          });
          content += '</select>';
          content += '</div>';
          content += '<br>';
          content += `<div id="tipoValor-data"></div>`;
          content += `</div>`;
  
          popup.setContent(content);
  
          const tipoValorDropdown = document.getElementById('tipoValor-dropdown') as HTMLSelectElement;
          const tipoValorDataContainer = document.getElementById('tipoValor-data');
          if (tipoValorDropdown && tipoValorDataContainer) {
            tipoValorDropdown.addEventListener('change', () => {
              const selectedTipoValor = tipoValorDropdown.value;
              const tipoValorData = info[selectedTipoValor];
  
              let tipoValorMessage = `<b>${selectedTipoValor}</b> <br><ul>`;
              tipoValorData.forEach((dato: any) => {
                tipoValorMessage += `<li>${dato.valor} (${dato.profundidades})</li>`;
              });
              tipoValorMessage += '</ul>';
  
              tipoValorDataContainer.innerHTML = tipoValorMessage;
            });
          } else {
            console.error("Los elementos 'tipoValor-dropdown' o 'tipoValor-data' no han sido encontrados en el documento.");
          }
  
          this.generateCharts();
          isProcessingClick = false;
        },
        error => {
          this.plotData(data);
        }
        );
      };
  
      square.on('click', onSquareClick);
  
      this.markers.push(square);
    }
  }
  
  
  

  //cargar datos en mapa
  dataNominal: any=[];
  dataNumerico: any=[];

  private cargarDatosVariableProyecto(id:any) {
    this.datoRecolectadoService.listarTodosLosDatos(id).subscribe(
      (response: any) => {
        
        this.dataNumerico=response;
        this.getCoordenadas1(this.dataNumerico);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );

    this.datoRecolectadoService.listarTodosLosDatosNominal(id).subscribe(
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

  private cargarDatosVariableCatalogo(id:any) {
    this.datoRecolectadoService.listarTodosLosDatosCatalogo(id).subscribe(
      (response: any) => {
        this.dataNumerico=response;
        this.getCoordenadas1(this.dataNumerico);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );

    this.datoRecolectadoService.listarTodosLosDatosCatalogoNominal(id).subscribe(
      (response: any) => {
        this.dataNominal=response;
        this.getCoordenadas2(this.dataNominal);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
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
  }
  

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

 
  listaDatosGrafico:any=[]
  
  
  
  
  

  //paginador de proyectos
  page_size1:number=5
  page_number1:number=1
  page_size_options1=[5,10,20,50,100]

  handlePage1(e: PageEvent){
    this.page_size1=e.pageSize
    this.page_number1=e.pageIndex + 1
  }
  
  //paginador de catalogo
  page_size2:number=5
  page_number2:number=1
  page_size_options2=[5,10,20,50,100]

  handlePage2(e: PageEvent){
    this.page_size2=e.pageSize
    this.page_number2=e.pageIndex + 1
  }
  


}




