import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Chart } from 'chart.js';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import { PopupOptions, tileLayer } from 'leaflet';


interface Marker {
  lat: number;
  lng: number;
  content: string;
}

interface Dato {
  profundidades: string;
  valor: number;
}

@Component({
  selector: 'app-mapa-ejemplo',
  templateUrl: './mapa-ejemplo.component.html',
  styleUrls: ['./mapa-ejemplo.component.css']
})
export class MapaEjemploComponent implements OnInit {

  
  constructor(private datoRecolectadoService: DatoRecolectadoService) { }

  private map!: L.Map;

  ngOnInit(): void {
    this.initMap();
    this.fetchData();
  }

  //-------------------------------------------------------------------------
  private initMap() {
    const southWest = L.latLng(-5.433109, -82.538926);
    const northEast = L.latLng(1.856817, -73.550472);
    const bounds = L.latLngBounds(southWest, northEast);
    this.map = L.map('map', {
      center: [-1.164,-78.201],
      zoom: 8,
      maxBounds: bounds,
      maxBoundsViscosity: 0.7
    });
    this.map.zoomControl.setPosition('bottomright');
    tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.setMinZoom(6);
  }

  private fetchData() {
    this.datoRecolectadoService.listarTodosLosDatos(0).subscribe(
      response => {
        console.log(response);
        this.processData(response);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
  }
  

  
  private charts: Chart[] = [];

  private processData(data: any) {
    const markers: any[] = [];
  
    for (const coordenadas in data) {
      if (data.hasOwnProperty(coordenadas)) {
        const markersData = data[coordenadas];
        const markerPopupContent = document.createElement('div');
    
        for (const tipoVariable in markersData) {
          if (markersData.hasOwnProperty(tipoVariable)) {
            const markersOfType = markersData[tipoVariable];
    
            if (markersOfType.length > 0) {
              const markerCanvasContainer = document.createElement('div');
              markerPopupContent.appendChild(markerCanvasContainer);
    
              const chartCanvas = document.createElement('canvas');
              markerCanvasContainer.appendChild(chartCanvas);
    
              const ctx = chartCanvas.getContext('2d');
              if (ctx) {
                this.createChart(ctx, tipoVariable, markersOfType);
              } else {
                console.error('No se pudo obtener el contexto del lienzo');
              }
            }
          }
        }
    
        const lat = parseFloat(coordenadas.split(',')[0]);
        const lng = parseFloat(coordenadas.split(',')[1]);
        const marker = L.marker([lat, lng]);
        markers.push({
          marker,
          markerPopupContent
        });
      }
    }
    
    markers.forEach(markerData => {
      const { marker, markerPopupContent } = markerData;
    
      marker
        .addTo(this.map)
        .bindPopup(markerPopupContent)
        .on('popupopen', () => {
          this.resizeCharts();
        });
    });
  }
  
  private createChart(ctx: CanvasRenderingContext2D, tipoVariable: string, markers: any[]) {
    const labels: string[] = [];
    const values: number[] = [];
    
    markers.forEach(marker => {
      labels.push(marker.profundidades);
      values.push(marker.valor);
    });
    
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: tipoVariable,
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: false, // Permitir que el gráfico se ajuste automáticamente al contenedor
        maintainAspectRatio: true, // Evitar que el gráfico mantenga un aspecto fijo
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMin: 0, // Valor mínimo sugerido para el eje y
                suggestedMax: 100 // Valor máximo sugerido para el eje y
              }
            }
          ]
        }
      }
    });
    
    this.charts.push(chart);
  }
  
  private resizeCharts() {
    this.charts.forEach(chart => {
      
      chart.resize();
    });
  }
  
  private reloadMarkers(id:any) {
    // Eliminar todos los marcadores existentes en el mapa
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  
    // Limpiar el array de gráficos
    this.charts = [];
  
    // Volver a cargar los datos y procesarlos
    this.datoRecolectadoService.listarTodosLosDatos(id).subscribe(
      response => {
        console.log(response);
        this.processData(response);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
  }
  
  private reloadMarkersCatalogo(id:any) {
    // Eliminar todos los marcadores existentes en el mapa
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
  
    // Limpiar el array de gráficos
    this.charts = [];
  
    // Volver a cargar los datos y procesarlos
    this.datoRecolectadoService.listarTodosLosDatosCatalogo(id).subscribe(
      response => {
        console.log(response);
        this.processData(response);
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
  }

  
}
