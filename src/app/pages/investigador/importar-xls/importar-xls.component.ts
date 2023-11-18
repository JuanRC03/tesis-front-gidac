import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
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

interface DataModel {
  cantidadDato: number;
  cantidadDatosCorrectos:number;
  cantidadFueraRanngo:number;
  cantidadNulos: number;
  cantidadRepetidos: number | null;
  idVariable: number;
  nombreTipoVariable: string;
  nombreVariable: string;
  nombreVariableOrganizacion: string;
  numeroColumna: number;
  unidadMedida:string;
  nombreOrganizacion:string;
}
@Component({
  selector: 'app-importar-xls',
  templateUrl: './importar-xls.component.html',
  styleUrls: ['./importar-xls.component.css'],
  
})
export class ImportarXlsComponent implements OnInit {

  
  isEditable = false;
 

  constructor(private datoRecolectadoService:DatoRecolectadoService,
              private route:ActivatedRoute,
              private snack:MatSnackBar,
              private router:Router,
              private investigacionService:InvestigacionService ) {}
  
  displayedColumns: string[] = ['dato1', 'dato2', 'dato3', 'dato4','dato5'];
  idProyecto=0;
  
  validarXLS=false;
  validarVariables=false;
  validarPerfilado=false;

  ngOnInit(): void {
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.proyectoInvestigacion.idProyecto=this.idProyecto;
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

  proyectoInvestigacion :any= {
    idProyecto: ''
  }


  

  verBoton=false;
  verBotonImput=true;
  verBotonSiguintePaso=false;

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

  listaDatos:any=[];
  comprobarEstado(){
    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('file', this.file);
    this.datoRecolectadoService.comprobarXLS(formData).subscribe(
      (dato:any) => {
        if(dato==true){
          this.datoRecolectadoService.variablesDeXLS(formData).subscribe((listaVariables:any) => {
            if (listaVariables && listaVariables.length > 0) {
              this.listaDatos=listaVariables;
              Swal.fire('Archivo correcto','El archivo tiene la estructura correcta','success');
              this.verBoton=false;
              this.verBotonImput=false;
              this.verBotonSiguintePaso=true;
            }else{
              Swal.fire('Error !!','El archivo cargado solo tiene la estructura pero no tiene datos para cargar','error')
              this.verBoton=false;
              this.verBotonImput=true;
            }
            console.log(listaVariables);
          })
          
        }else{
          Swal.fire('Error !!','El archivo cargado no tiene el formato adecuado','error')
          this.verBoton=false;
          this.verBotonImput=true;
        }
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar los datos del archivo','error')
      }
    )
  }

  @ViewChild('matStepperNext') stepper!: MatStepper;

  perfilarDatos(){
    if(this.listaDatos.length==0){
      this.snack.open("No exiten variables encontradas para perfilar!!",'',{
        duration:3000
      })
      return ;
    }
    const formData = new FormData();
    
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('variablesEncontradas', JSON.stringify(this.listaDatos));
    formData.append('file', this.file);
    this.datoRecolectadoService.perfilarXLS(formData).subscribe(
      (dato:any) => {
        
        this.dataModels = dato;
        console.log(dato);
        this.cargarDatosGrafica();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al perfilar los datos','error')
      }
    )
  }

  guardarDatos(){
    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('variablesEncontradas', JSON.stringify(this.listaDatos));
    formData.append('file', this.file);
    this.datoRecolectadoService.guardarXLS(formData).subscribe(
      (dato:any) => {
        Swal.fire('Registro exitoso','Los datos se han registrado de forma correcta','success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/user-dashboard/view-dash-proyecto/'+this.idProyecto]);
          }
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al perfilar los datos','error')
      }
    )
  }

  recargarPantalla(){
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
  
  public barChartLabels: Label[] = ['Cantidad de datos correctos', 'Cantidad de Nulos', 'Cantidad Fuera de Rango'];
  public barChartData: ChartDataSets[][] = [];
  public barChartType: ChartType = 'bar';
  public barChartColors: Color[] = [
    {
      backgroundColor: ['rgba(7,143,174)', 'rgba(174,7,70)', 'rgba(255,189,54)'],
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
  
  public pieChartLabels: Label[] = ['Cantidad de datos correctos', 'Cantidad de Nulos', 'Cantidad Fuera de Rango'];
  public pieChartData: number[][] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: Color[] = [
    {
      backgroundColor: ['rgba(7,143,174)', 'rgba(174,7,70)', 'rgba(255,189,54)'],
    },
  ];
  public dataModels: DataModel[] = [];
  
  cargarDatosGrafica() {
    this.dataModels.forEach((model) => {
      this.barChartData.push([
        {
          data: [model.cantidadDatosCorrectos],
          label: 'Cantidad de datos correctos',
        },
        {
          data: [model.cantidadNulos],
          label: 'Cantidad de Nulos',
        },
        {
          data: [model.cantidadFueraRanngo],
          label: 'Cantidad Fuera de Rango',
        },
      ]);
  
      this.pieChartData.push([model.cantidadDatosCorrectos, model.cantidadNulos, model.cantidadFueraRanngo]);
    });
  }
  
}
