import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-convertir-xls',
  templateUrl: './convertir-xls.component.html',
  styleUrls: ['./convertir-xls.component.css']
})
export class ConvertirXlsComponent implements OnInit {

  

  ngOnInit(): void {
  }

  fileToConvert!: File;
  convertedData: any[] = [];

  constructor() {}

  onFileChange(event: any) {
    this.fileToConvert = event.target.files[0];
    this.convertToXLS2(this.fileToConvert);
    //this.convertFile();
  }

  convertFile() {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const fileData = e.target.result;
      const workbook = XLSX.read(fileData, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.convertedData = jsonData;
    };
    fileReader.readAsBinaryString(this.fileToConvert);
    
  }

  downloadConvertedFile() {
    const worksheet = XLSX.utils.json_to_sheet(this.convertedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xls', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'converted_file');
  }

  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xls';
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  
  convertFile2() {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const xmlData = e.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
      const data = [];
      const elements = xmlDoc.getElementsByTagName('element'); // Reemplaza "element" por la etiqueta XML que contenga tus datos

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const obj = {};

        // Agrega aquí la lógica para extraer los datos de cada elemento XML
        // y asignarlos a propiedades del objeto "obj"

        data.push(obj);
      }

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja 1');
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      const xlsWorkbook = XLSX.read(excelBuffer, { type: 'array' });

      const fecha = new Date().toLocaleDateString();
      const nombreArchivo = `archivo_excel_${fecha}.xls`;

      XLSX.writeFile(xlsWorkbook, nombreArchivo);
    };

    reader.readAsText(this.fileToConvert);
  }

  convertToXLS(file: File) {
    const fileReader = new FileReader();
  
    fileReader.onload = (event: any) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const excelBuffer: any[] = [];
  
      workbook.SheetNames.forEach((sheetName: string) => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        excelBuffer.push(sheetJson);
      });
  
      // Aquí tienes el archivo convertido en formato XLS en excelBuffer
      console.log(excelBuffer);
    };
  
    fileReader.readAsBinaryString(file);
  }

  convertToXLS2(file: File) {
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
  
      // Crear el enlace de descarga
      const blob = new Blob([wbout], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.xls';
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };
  
    fileReader.readAsBinaryString(file);
  }
}