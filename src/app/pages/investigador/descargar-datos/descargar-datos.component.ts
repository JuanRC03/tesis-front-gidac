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
    private investigacionService:InvestigacionService) { }

  ngAfterViewInit(): void {
  }

  idProyecto = 0;
  listaDatosRecolectador: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.equivalenciaVariableService.obtenerPorProyecto(this.idProyecto).subscribe((data: any) => {
      this.dataSource.data = data;
      console.log(data);
      this.dataSource.paginator = this.paginator;
      this.listaDatos = data.map((variable: any) => ({ ...variable, checked: false }));
    });
    this.datoRecolectadoService.listarPorProyecto(this.idProyecto).subscribe((data: any) => {
      this.listaDatosRecolectador = data;
      console.log(data);
    });
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  displayedColumns: string[] = ['select', 'nombreVariable', 'nombreVariableProyecto', 'tipoValor', 'organization'];
  dataSource = new MatTableDataSource<Variable>();
  selection = new SelectionModel<Variable>(true, []);
  listaDatos: Variable[] = [];



  listaDatosSeleccionados: Variable[] = [];

  downloadSelectedDataXLS() {
    const selectedData = this.selection.selected;
    this.listaDatosSeleccionados = this.selection.selected;
    if (this.listaDatosSeleccionados.length === 0) {
      this.snack.open('No ha seleccionado alguna variable para descargar !!', 'Aceptar', {
        duration: 3000
      });
    } else {
      const formData = new FormData();
      formData.append('equivalenciasVariables', JSON.stringify(selectedData));
      this.datoRecolectadoService.unirDatos(formData).subscribe((data: any) => {
        this.downloadExcel(data, this.listaDatosSeleccionados)
      });
    }
  }

  downloadSelectedDataCSV() {
    const selectedData = this.selection.selected;
    this.listaDatosSeleccionados = this.selection.selected;
    if (this.listaDatosSeleccionados.length === 0) {
      this.snack.open('No ha seleccionado alguna variable para descargar !!', 'Aceptar', {
        duration: 3000
      });
    } else {
      const formData = new FormData();
      formData.append('equivalenciasVariables', JSON.stringify(selectedData));
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.catalogoEspoch.idVariableEspoch}`;
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
        'Altitud minima': subarreglo[n++],
        'Altitud maxima': subarreglo[n++],
        'Unidad de medidad altitud': subarreglo[n++],
        'Código conglomerado': subarreglo[n++],
        'Nombre conglomerado': subarreglo[n++],
        'Sector': subarreglo[n++],
        'Código parcela': subarreglo[n++],
        'Nombre parcela': subarreglo[n++],
        'Coordenada x': subarreglo[n++],
        'Coordenada y': subarreglo[n++],
        'Area parcela': subarreglo[n++],
        'Unidad de medida parcela': subarreglo[n++],
        'Profundidad minima': subarreglo[n++],
        'Profundidad maxima': subarreglo[n++],
        'Unidad de medidad profundidad': subarreglo[n++],
      };

      for (let j = n; j < subarreglo.length; j += 2) {
        const etiqueta = subarreglo[j];
        const valor = subarreglo[j + 1];
        nuevoElemento[etiqueta] = valor;
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
  variable: {
    idVariable: number;
    nombreVariable: string;
    tipoVariable: {
      nombreTipoVariable: string;
    }
  };
  catalogoEspoch: {
    idVariableEspoch: number;
    nombreVariableEspoch: string;
  };

  catalogoOrganizacion: {
    idVariableOrganizacion: number;
    nombreVariableOrganizacion: string;
    nombreOrganizacion: string;
  };
  checked: boolean;
}