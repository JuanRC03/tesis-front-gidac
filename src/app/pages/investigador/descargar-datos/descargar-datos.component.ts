import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { VariableService } from 'src/app/services/variable.service';
import { writeFile } from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { DatasetService } from 'src/app/services/dataset.service';

interface OrganizacionProyecto {
  idOrganizacion: number;
  nombreOrganizacion: String;
  siglas:String;
  descripcion:String
}

@Component({
  selector: 'app-descargar-datos',
  templateUrl: './descargar-datos.component.html',
  styleUrls: ['./descargar-datos.component.css']
})
export class DescargarDatosComponent implements OnInit {

  variableSeleccionada: { idVariable: number, nombreVariable: string }[] = [];

  constructor(private equivalenciaVariableService: EquivalenciaVariableService,
    private datoRecolectadoService: DatoRecolectadoService,
    private variableService: VariableService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private investigacionService:InvestigacionService,
    private organizacionService:OrganizacionService,
    private datasetService:DatasetService) { }

  ngAfterViewInit(): void {
  }

  idProyecto = 0;
  listaDatosRecolectador: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.opcionSeleccionadaProyecto.idProyecto=this.idProyecto;
    this.listarOrganizaciones();
    this.listarVariablesDescarga(0,0)
    this.listarDatasets();
    this.datoRecolectadoService.listarPorProyecto(this.idProyecto).subscribe((data: any) => {
      this.listaDatosRecolectador = data;
      //console.log(data);
    });
    this.listarProyectosVigentes();
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
    public searchEstado: string = '';
    
    

    opcionSeleccionadaOrganizacion: any = {
      idOrganizacion: 0,
    }

    opcionSeleccionadaProyecto: any = {
      idProyecto: 0,
    }

  listarVariablesDescarga(idOrganizacion:any, codigoDataset:any){
    this.dataSource.data = [];
    this.deseleccionarTodo();
    this.variableService.obtenerVariablesDescargarProyecto(this.idProyecto, idOrganizacion, codigoDataset).subscribe((data: any) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.listaDatos = data.map((variable: any) => ({ ...variable, checked: false }));
    });
  }

  deseleccionarTodo() {
    this.selection.clear(); // Limpia la selección
    this.dataSource.data.forEach((row: Variable) => {
      row.checked = false; // Reinicia la propiedad checked en los elementos de la fuente de datos
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  listaOrganizaciones : any = []
  primerElemento: any;
  listarOrganizaciones()
  {
    this.organizacionService.listar().subscribe(
        res=>{
          this.listaOrganizaciones=res;

          if (this.listaOrganizaciones.length > 0) {
            this.listaOrganizaciones.unshift({ idOrganizacion: 0, nombreOrganizacion: 'Variables del sistema', siglas:'Variables del sistema', descripcion:'Variables del sistema'});
            this.listaOrganizaciones.idOrganizacion = 0;
            //this.primerElemento = this.listaOrganizaciones[0];
            //this.listaOrganizaciones.idOrganizacion = this.primerElemento.idOrganizacion;
            //this.searchOrganizacionVariable=this.primerElemento.nombreOrganizacion;
          }
          
        },
        err=>console.log(err)
      )
  }

  public searchOrganizacionVariable: string = '';
  opcionSeleccionada:any;

  onOrganizacionChange(): void {
    
    this.listarVariablesDescarga(this.opcionSeleccionadaOrganizacion.idOrganizacion, this.opcionSeleccionadaDataset.codigoDataset)
  }

  onDatasetChange(): void {
    this.listarVariablesDescarga(this.opcionSeleccionadaOrganizacion.idOrganizacion, this.opcionSeleccionadaDataset.codigoDataset)
  }

  

  displayedColumns: string[] = ['select', 'nombreVariable', 'unidadMedida', 'tipoValor', 'organization'];
  dataSource = new MatTableDataSource<Variable>();
  selection = new SelectionModel<Variable>(true, []);
  listaDatos: Variable[] = [];



  listaDatosSeleccionados: Variable[] = [];

  downloadSelectedDataXLS() {
    const selectedData = this.selection.selected;
    this.listaDatosSeleccionados = this.selection.selected;
    console.log(this.listaDatosSeleccionados);
    if (this.listaDatosSeleccionados.length === 0) {
      this.snack.open('No ha seleccionado alguna variable para descargar !!', 'Aceptar', {
        duration: 3000
      });
    } else {
      const formData = new FormData();
      formData.append('equivalenciasVariables', JSON.stringify(selectedData));
      formData.append('proyectoDatos', JSON.stringify(this.opcionSeleccionadaProyecto));
      formData.append('datasetDatos', JSON.stringify(this.opcionSeleccionadaDataset));
      this.datoRecolectadoService.unirDatos(formData).subscribe((data: any) => {
        console.log(data)
        this.downloadExcel(data, this.listaDatosSeleccionados)
      });
    }
  }

  downloadSelectedDataCSV() {
    const selectedData = this.selection.selected;
    this.listaDatosSeleccionados=[];
    this.listaDatosSeleccionados = this.selection.selected;
    if (this.listaDatosSeleccionados.length === 0) {
      this.snack.open('No ha seleccionado alguna variable para descargar !!', 'Aceptar', {
        duration: 3000
      });
    } else {
      const formData = new FormData();
      formData.append('equivalenciasVariables', JSON.stringify(this.listaDatosSeleccionados));
      formData.append('proyectoDatos', JSON.stringify(this.opcionSeleccionadaProyecto));
      formData.append('datasetDatos', JSON.stringify(this.opcionSeleccionadaDataset));
      this.datoRecolectadoService.unirDatos(formData).subscribe((data: any) => {
        console.log(data);
        this.downloadCSV(data, this.listaDatosSeleccionados)
      });
    }
  }

  toggleRow(row: Variable) {
    this.selection.toggle(row);
  }

  checkboxLabel(row?: Variable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idVariableUnidadMedida}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  //descargar datos

  dataDescarga: any = [];

  recorerDatos(datosPaso: any, listaDatoSeleccionado: any) {
    let n = 0;
    for (let i = 0; i < datosPaso.length; i++) {
      const subarreglo = datosPaso[i];
      const nuevoElemento: any = {
        'Fecha salida campo': subarreglo[n++],
        'Coordenada x': subarreglo[n++],
        'Coordenada y': subarreglo[n++],
        'Altitud': subarreglo[n++],
        'Unidad de medidad altitud': subarreglo[n++],
        'Código conglomerado': subarreglo[n++],
        'Nombre conglomerado': subarreglo[n++],
        'Sector': subarreglo[n++],
        'Código parcela': subarreglo[n++],
        'Nombre parcela': subarreglo[n++],
        'Area parcela': subarreglo[n++],
        'Unidad de medida parcela': subarreglo[n++],
        'Profundidad minima': subarreglo[n++],
        'Profundidad maxima': subarreglo[n++],
        'Unidad de medidad profundidad': subarreglo[n++],
        
      };

      for (let j = n; j < subarreglo.length; j += 3) {
        const etiqueta = subarreglo[j];
        const variableUnidadMedida = subarreglo[j+1];
        const valor = subarreglo[j + 2];

        
        if(variableUnidadMedida=='NA'){
          nuevoElemento[etiqueta] = valor;
        }else{
          nuevoElemento[etiqueta+' - '+variableUnidadMedida] = valor;
        } 
      }
      n = 0;
      this.dataDescarga.push(nuevoElemento);
    }
  }


  downloadExcel(datosPaso: any, listaDatoSeleccionado: any) {
    this.dataDescarga = [];
    this.recorerDatos(datosPaso, listaDatoSeleccionado);
    const worksheet = XLSX.utils.json_to_sheet(this.dataDescarga);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'datos');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'tabla_datos.xlsx');
  }

  downloadCSV(datosPaso: any, listaDatoSeleccionado: any) {
    this.dataDescarga = [];
    this.recorerDatos(datosPaso, listaDatoSeleccionado);
    const worksheet = XLSX.utils.json_to_sheet(this.dataDescarga);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'datos');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileData: File = new File([blob], 'excelFile.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const excelFile = new File([fileData], 'data.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    this.convertExcelToCSV(excelFile);

  }

  convertExcelToCSV(excelFile: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data: Uint8Array = new Uint8Array(e.target.result);
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const worksheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[worksheetName];
      const csvData: string = XLSX.utils.sheet_to_csv(worksheet);
      const blob: Blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'datos.csv');
    };
    reader.readAsArrayBuffer(excelFile);
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

}




export interface Variable {
  idVariableUnidadMedida: Number;
  idVariable:String ;
  numeroColumna:number;
  cantidadDatos:number;
  nombreVariable:String;
  nombreOrganizacion:String;
  nombreVariableEspoch:String;
  nombreTipoVariable:String;
  unidadMedida: String ;
  checked: boolean;
}