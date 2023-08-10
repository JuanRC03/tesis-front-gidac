import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-importar-catalogo-organizacion',
  templateUrl: './importar-catalogo-organizacion.component.html',
  styleUrls: ['./importar-catalogo-organizacion.component.css']
})
export class ImportarCatalogoOrganizacionComponent implements OnInit {

  constructor(private snack:MatSnackBar,
    private catalogoOrganizacionService:CatalogoOrganizacionService) { }

  
  
  validarXLS=false;
  validarVariables=false;
  validarPerfilado=false;

  ngOnInit(): void {
    
  }

  verBoton=false;
  verBotonImput=true;
  verBotonSiguintePaso=false;

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
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.onload = (event: any) => {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const excelBuffer: any[] = [];
  
        workbook.SheetNames.forEach((sheetName: string) => {
          const worksheet = workbook.Sheets[sheetName];
          const sheetJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          excelBuffer.push(sheetJson);
        });
  
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(excelBuffer[0]);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
        const wbout = XLSX.write(wb, { bookType: 'xls', type: 'array' });
  
        
        // Create a new Blob object with the transformed data
        const transformedBlob = new Blob([wbout], { type: 'application/vnd.ms-excel' });
  
        // Create a new File object from the Blob
        const transformedFile = new File([transformedBlob], 'archivo_transformado.xls', {
          type: 'application/vnd.ms-excel',
        });
  
        resolve(transformedFile);
      };
  
      fileReader.onerror = (error: any) => {
        reject(error);
      };
  
      fileReader.readAsBinaryString(file);
    });
  }

  listaDatos:any=[];
  comprobarEstado(){
    const formData = new FormData();
    formData.append('file', this.file);
    this.catalogoOrganizacionService.comprobarArchivo(formData).subscribe(
      (dato:any) => {
        if(dato==true){
          Swal.fire('Archivo correcto','El archivo tiene la estructura correcta','success');
          this.verBoton=false;
          this.verBotonImput=false;
          this.verBotonSiguintePaso=true;
        }else{
          Swal.fire('Error !!','El archivo cargado no tiene el formato adecuado','error')
          this.verBoton=false;
          this.verBotonImput=true;
        }
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','El archivo cargado no tiene el formato adecuado','error')
      }
    )
  }

  guardarDatos(){
    const formData = new FormData();
    formData.append('file', this.file);
    this.catalogoOrganizacionService.importarArchivo(formData).subscribe(
      (dato:any) => {
        Swal.fire('Registro exitoso','Las variables de las organizaciones han sigo guardadas de forma correcta','success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al registrar las variables','error')
      }
    )
  }

  recargarPantalla(){
    location.reload();
  }


  
}
