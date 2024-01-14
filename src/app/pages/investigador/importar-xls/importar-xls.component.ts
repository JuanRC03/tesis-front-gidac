import { Component, EventEmitter, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DatoRecolectadoService } from 'src/app/services/dato-recolectado.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatasetService } from 'src/app/services/dataset.service';

interface DataModel {
  cantidadDato: number;
  cantidadDatosCorrectos: number;
  cantidadFueraRanngo: number;
  cantidadNulos: number;
  cantidadOutlier: number;
  cantidadRepetidos: number;
  idVariable: number;
  nombreTipoVariable: string;
  nombreVariable: string;
  nombreVariableOrganizacion: string;
  numeroColumna: number;
  unidadMedida: string;
  nombreOrganizacion: string;
}
@Component({
  selector: 'app-importar-xls',
  templateUrl: './importar-xls.component.html',
  styleUrls: ['./importar-xls.component.css'],

})
export class ImportarXlsComponent implements OnInit {


  isEditable = false;


  constructor(private datoRecolectadoService: DatoRecolectadoService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private investigacionService: InvestigacionService) { }

  displayedColumns: string[] = ['dato1', 'dato2', 'dato3', 'dato4', 'dato5'];
  idProyecto = 0;

  validarXLS = false;
  validarVariables = false;
  validarPerfilado = false;

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.proyectoInvestigacion.idProyecto = this.idProyecto;
    this.listarProyectosVigentes();
  }

  datos: any = []
  listarProyectosVigentes() {
    this.investigacionService.obtenerProyectoInvestigacion(this.idProyecto).subscribe(
      res => {
        this.datos = res;
      },
      err => console.log(err)
    )
  }

  proyectoInvestigacion: any = {
    idProyecto: ''
  }

  datasetSeleccionado: any = {
    codigoDataset: ''
  }



  public search: string = '';

  onSearch(search: string) {
    this.search = search;
  }

  verBoton = false;
  verBotonImput = true;
  verBotonSiguintePaso = false;

  /*onFileChanged(event: any): void {
    this.file = event.target.files[0];
  }*/
  file: File = new File([], "");
  fileAux: File = new File([], "");

  onFileChanged(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileAux = event.target.files[0];
      this.verBoton = true;
      this.verBotonImput = false;
      this.convertToXLS2(this.file).then((transformedFile: File) => {
        this.file = transformedFile;
        this.snack.open('Archivo seleccionado correctamente', 'Aceptar', {
          duration: 3000,
        });
      });
    } else {
      this.verBoton = false;
      this.verBotonImput = true;
    }
  }

  // transformar archivo

  convertToXLS2(file: File): Promise<File> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();

      fileReader.onload = (event: any) => {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const excelBuffer: any[] = [];

        workbook.SheetNames.forEach((sheetName: string) => {
          const worksheet = workbook.Sheets[sheetName];
          // Check if !ref exists and fallback to a default range if not available
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
          const sheetJson: any[] = [];

          for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
            const row: any[] = [];
            for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
              const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
              const cell = worksheet[cellAddress];
              if (cell && cell.t === 'd') {
                // Date cell, extract the text value
                row.push(cell.w || '');
              } else if (cell && cell.t === 'n' && cell.w) {
                // Numeric cell with a formatted value (e.g., date)
                row.push(cell.w);
              } else if (cell && cell.t === 's') {
                // String cell
                row.push(cell.v);
              } else {
                // Empty cell or other types, insert empty string
                row.push('');
              }
            }
            sheetJson.push(row);
          }

          excelBuffer.push(sheetJson);
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(excelBuffer[0]);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        const wbout = XLSX.write(wb, { bookType: 'xls', type: 'array' });

        // Create the Blob and File objects
        const blob = new Blob([wbout], { type: 'application/vnd.ms-excel' });
        const newFile = new File([blob], 'archivo.xls', { type: 'application/vnd.ms-excel' });

        resolve(newFile);
      };

      fileReader.readAsBinaryString(file);
    });
  }

  listaDatos: any = [];
  comprobarEstado() {
    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('file', this.file);
    this.datoRecolectadoService.comprobarXLS(formData).subscribe(
      (dato: any) => {
        if (dato == true) {
          this.datoRecolectadoService.variablesDeXLS(formData).subscribe((listaVariables: any) => {
            if (listaVariables && listaVariables.length > 0) {
              this.listaDatos = listaVariables;
              Swal.fire('Archivo correcto', 'El archivo tiene la estructura correcta', 'success');
              this.verBoton = false;
              this.verBotonImput = false;
              this.verBotonSiguintePaso = true;
            } else {
              Swal.fire('Error !!', 'El archivo cargado solo tiene la estructura pero no tiene datos para cargar', 'error')
              this.verBoton = false;
              this.verBotonImput = true;
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

  @ViewChild('matStepperNext') stepper!: MatStepper;

  perfilarDatos() {
    if (this.listaDatos.length == 0) {
      this.snack.open("No exiten variables encontradas para perfilar!!", '', {
        duration: 3000
      })
      return;
    }
    const formData = new FormData();

    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('variablesEncontradas', JSON.stringify(this.listaDatos));
    formData.append('file', this.file);
    this.datoRecolectadoService.perfilarXLS(formData).subscribe(
      (dato: any) => {

        this.dataModels = dato;
        console.log(dato);
        this.cargarDatosGrafica();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al perfilar los datos', 'error')
      }
    )
  }


  descargarArchivoEditado() {
    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('variablesEncontradas', JSON.stringify(this.listaDatos));
    formData.append('file', this.file);
    this.datoRecolectadoService.colorizarArchivoEditado(formData).subscribe(
      (response: Blob) => {
        console.log(response)
        const blob = new Blob([response], { type: 'application/octet-stream' });
        saveAs(blob, 'modifiedFile.xls');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al descargar el archivo modificado', 'error')
      }
    )
  }

  uploadFile(): void {

    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('variablesEncontradas', JSON.stringify(this.listaDatos));
    formData.append('file', this.file);
    this.datoRecolectadoService.modificarArchivo(formData).subscribe(
      (response) => {
        // Manejar la respuesta del servidor, por ejemplo, descargar el archivo modificado
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'archivo_modificado.xls';
        downloadLink.click();
      },
      (error) => {
        // Manejar errores
        console.error('Error al cargar el archivo:', error);
      }
    );
  }

  cambiarColorArchivo(): void {
    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('variablesEncontradas', JSON.stringify(this.listaDatos));
    formData.append('file', this.file);
    this.datoRecolectadoService.cambiarColorArchivo(formData).subscribe(
      (response) => {
        // Manejar la respuesta, por ejemplo, descargar el archivo
        this.descargarArchivo(response);
      },
      (error) => {
        // Manejar errores en la solicitud
        console.error('Error al cambiar el color del archivo:', error);
      }
    );
  }

  descargarArchivo(data: any): void {
    // Crear un enlace de descarga para el archivo modificado
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo_editado.xls'; // Nombre del archivo descargado
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  descartarDatos() {
    Swal.fire({
      title: 'Descartar dataset',
      text: '¿Estás seguro de descartar el dataset?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    })

  }

  guardarDatos() {
    Swal.fire({
      title: 'Importar dataset',
      text: '¿Estás seguro de importar el dataset?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
        formData.append('datasetSeleccionado', JSON.stringify(this.datasetSeleccionado));
        formData.append('variablesEncontradas', JSON.stringify(this.listaDatos));
        formData.append('file', this.file);
        this.datoRecolectadoService.guardarXLS(formData).subscribe(
          (dato: any) => {
            Swal.fire('Registro exitoso', 'Los datos se han registrado de forma correcta', 'success').then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/user-dashboard/view-dash-proyecto/' + this.idProyecto]);
              }
            });
          },
          (error) => {
            console.log(error);
            Swal.fire('Error !!', 'Error al perfilar los datos', 'error')
          }
        )
      }
    })
  }

  listaDataset(): void {
    const dialogRef = this.dialog.open(ListaDatasetImportar, {
      data: { idProyecto: this.idProyecto },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        if(result==0 || result==-1){
          console.log('El diálogo fue cerrado sin seleccionar un dataset.');
        }else{
          this.datasetSeleccionado.codigoDataset=result;
          this.guardarDatos();
        }
      } else {
        console.log('El diálogo fue cerrado sin seleccionar un dataset.');
      }
    });
  }

  recargarPantalla() {
    location.reload();
  }

  //graficas
  /*
    public barChartOptions: ChartOptions = {
      responsive: true,
    };
    public barChartData: ChartDataSets[] = [];
    public barChartColors: Color[] = [];
  
    public dataModels: DataModel[] = [];
  
    cargarDatosGrafica(){
      this.barChartData = this.dataModels.map((model) => {
        return {
          data: [model.cantidadDatos, model.cantidadNulos, model.cantidadFueraRango],
          label: model.nombreVariable
        };
      });
  
      this.barChartColors = [
        {
          backgroundColor: 'rgba(0,123,255,0.5)',
        },
      ];
    }*/

  /*public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  
  public pieChartLabels: Label[] = ['Cantidad de datos correctos', 'Cantidad de Nulos', 'Cantidad Fuera de Rango'];
  public pieChartData: number[][] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: Color[] = [
    {
      backgroundColor: ['rgba(7,143,174)', 'rgba(174,7,70)', 'rgba(255,189,54)'],
    },
  ];
  public dataModels: DataModel[] = [];


  cargarDatosGrafica(){

    this.dataModels.forEach((model) => {
      this.pieChartData.push([
        model.cantidadDatos,
        model.cantidadNulos,
        model.cantidadFueraRanngo,
      ]);
    });

  }
  */

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = ['Correctos', 'Nulos', 'Fuera de Rango', 'Repetidos'];
  public barChartData: ChartDataSets[][] = [];
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[] = [
    {
      backgroundColor: ['rgba(7,143,174)', 'rgba(55,189,54)', 'rgba(255,189,54)', 'rgba(174,7,70)'],
    },
  ];


  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Coloca las etiquetas a la derecha del gráfico
      },
    },
  };

  public pieChartLabels: Label[] = ['Correctos', 'Nulos', 'Fuera de Rango', 'Repetidos', 'Outlier'];
  public pieChartData: number[][] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: Color[] = [
    {
      backgroundColor: ['rgba(55,189,54)', 'rgba(74,70,70)', 'rgba(174,7,70)', 'rgba(255,189,54)', 'rgba(7,143,174)'],
    },
  ];
  public dataModels: DataModel[] = [];

  cargarDatosGrafica() {
    this.dataModels.forEach((model) => {
      this.barChartData.push([
        {
          data: [model.cantidadDatosCorrectos],
          label: 'Correctos',
        },
        {
          data: [model.cantidadNulos],
          label: 'Nulos',
        },
        {
          data: [model.cantidadFueraRanngo],
          label: 'Fuera de Rango',
        },
        {
          data: [model.cantidadRepetidos],
          label: 'Repetidos',
        },
        {
          data: [model.cantidadOutlier],
          label: 'Outlier',
        },
      ]);

      this.pieChartData.push([model.cantidadDatosCorrectos, model.cantidadNulos, model.cantidadFueraRanngo, model.cantidadRepetidos, model.cantidadOutlier]);
    });
  }

}



export interface dataEditar {
  idDatoRecolectado: 0,
  valor: '',
  idDataset: 0,
  idVariableUnidadMedida: 0,
  idProyecto: 0,
  idProfundidad: 0,
  idParcela: 0,
  codigoDataset: 0,
  fechaSalidaCampo: any,
  variableUnidadMedida: []
}


@Component({
  selector: 'lista-dataset-importar',
  templateUrl: 'lista-dataset-importar.html',
  styleUrls: ['./importar-xls.component.css'],
})

export class ListaDatasetImportar {
  constructor(
    public dialogRef: MatDialogRef<ListaDatasetImportar>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private datasetService: DatasetService
  ) { }

  onNoClick() {
    this.dialogRef.close(0);
  }

  public data = {
    codigoDataset: -1,
  }

  listaDatosDataset: any = [];
  listarDatasets() {
    this.datasetService.obtenerDatasets(this.data1.idProyecto).subscribe(
      res => {
        this.listaDatosDataset = res;
        this.listaDatosDataset.unshift({ codigoDataset: 0, fechaInicioDataset: 'Nuevo dataset' });
      },
      err => console.log(err)
    )
  }

  onDatasetSelectionChange() {
    
    if (this.data.codigoDataset === 0) {
      const dialogRef = this.dialog.open(AgregarDatasetImportar, {
        data: { idProyecto: this.data1.idProyecto },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarDatasets();
      });
    }
  }

  public agregar() {
    if (this.data.codigoDataset == 0 || this.data.codigoDataset == -1) {
      this.snack.open('Se requiere seleccionar un dataset !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.dialogRef.close(this.data.codigoDataset);
  }
  

  ngOnInit(): void {
    this.listarDatasets();
    this.data.codigoDataset=-1;
  }

  variableUnidadMedida: any = []

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

}


@Component({
  selector: 'agregar-dataset-importar',
  templateUrl: 'agregar-dataset-importar.html',
  styleUrls: ['./importar-xls.component.css'],
})

export class AgregarDatasetImportar {
  constructor(
    public dialogRef: MatDialogRef<AgregarDatasetImportar>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private snack: MatSnackBar,
    private datasetService: DatasetService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public data = {
    codigoDataset: 0,
    fechaInicioDataset: new Date(0),
    fechaFinDataset: new Date(0),
    fechaSalidaCampo: new Date(0),
    proyectoInvestigacion: {
      idProyecto: 0,
    }
  }
  
  ngOnInit(): void {
    this.data.proyectoInvestigacion.idProyecto=this.data1.idProyecto;
  }

  variableUnidadMedida: any = []

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {
  
    console.log(this.data)
    
    if (this.data.fechaInicioDataset==null) {
      this.snack.open('La fecha de inicio del dataset !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.fechaFinDataset==null) {
      this.snack.open('La fecha de fin del dataset !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
  
  
    this.aumentarUnDiaInicioDataset();
    this.aumentarUnDiaFinDataset();

    this.datasetService.guardar(this.data).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'El dataset se agrego con éxito', 'success').then(
          (e) => {
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego el dataset', 'error');
        console.log(error);
      }
    );
      
    }

    aumentarUnDiaInicioDataset() {
      const fechaOriginal = new Date(this.data.fechaInicioDataset);
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);
      this.data.fechaInicioDataset = fechaOriginal;
    }

    aumentarUnDiaFinDataset() {
      const fechaOriginal = new Date(this.data.fechaFinDataset);
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);
      this.data.fechaFinDataset = fechaOriginal;
    }
  

}


export interface DialogData {
  id: '';
  idProyInv: '';
  idUsuario: '';
  motivo: ''
}



