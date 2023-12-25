import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewCatalogoOrganizacionDataSource, ViewCatalogoOrganizacionItem } from './view-catalogo-organizacion-datasource';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { VariableService } from 'src/app/services/variable.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventEmitter } from 'stream';
import { VariableUnidadMedidaService } from 'src/app/services/variable-unidad-medida.service';
import { ValorPermitidoService } from 'src/app/services/valor-permitido.service';

@Component({
  selector: 'app-view-catalogo-organizacion',
  templateUrl: './view-catalogo-organizacion.component.html',
  styleUrls: ['./view-catalogo-organizacion.component.css']
})
export class ViewCatalogoOrganizacionComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewCatalogoOrganizacionItem>;
  dataSource: ViewCatalogoOrganizacionDataSource;


  constructor(private catalogoOrganizacionService:CatalogoOrganizacionService,
    private variableService:VariableService,
    public dialog: MatDialog,) {
    this.dataSource = new ViewCatalogoOrganizacionDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3'];
  
  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.variableService.listarCompletasInvestigador().subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }
    
    page_size:number=5
    page_number:number=1
    page_size_options=[5,10,20,50,100]
  
    handlePage(e: PageEvent){
      this.page_size=e.pageSize
      this.page_number=e.pageIndex + 1
    }
    
    public search: string = '';
  
    onSearch( search: string ) {
      this.search = search;
    }

    openViewUnidadMedidaVariable(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(ViewUnidadMedidavariable, {
        data: { idVariable: id, nombreVariable:nombre},
      });
    }

      //descarhar PDF
  descargarPdf() {
    this.variableService.descargarPDF().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'catalogo.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  //Descargar excel
  descargarExcel() {
    this.variableService.descargarExcel().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'catalogo.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }


  }
  


  interface DatosActualizar {
    idVariable: '',
    idVariableUnidadMedida: '',
    abreviatura: '',
    nombreVariable: '',
  }
  
  @Component({
    selector: 'view-unidad-medida-variable',
    templateUrl: 'view-unidad-medida-variable.html',
    styleUrls: ['./view-catalogo-organizacion.component.css']
  })
  export class ViewUnidadMedidavariable {
    constructor(
      
      public dialogRef: MatDialogRef<ViewUnidadMedidavariable>,
      @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
      private variableUnidadMedidaService:VariableUnidadMedidaService,
      public dialog: MatDialog,
    ) { }
  
  
    displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4'];
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    ngOnInit(): void {
      this.listar();
    }
  
    listaDatos : any = []
  
    listar()
      {
        this.variableUnidadMedidaService.findByVigenciaAndVariableIdVariableAndVariableVigenciaAndUnidadMedidaVigencia(this.datos.idVariable).subscribe(
            res=>{
              this.listaDatos=res;
            },
            err=>console.log(err)
          )
      }
  
      page_size:number=5
      page_number:number=1
      page_size_options=[5,10,20,50,100]
    
      handlePage(e: PageEvent){
        this.page_size=e.pageSize
        this.page_number=e.pageIndex + 1
      }
      
      public search: string = '';
    
      onSearch( search: string ) {
        this.search = search;
      }

      openViewValorPermitidoNumerica(id:any, abreviatura:any): void {
        const dialogRef = this.dialog.open(ViewValorPermitidoVariableNumerica, {
          data: { idVariable: this.datos.idVariable, nombreVariable:this.datos.nombreVariable, idVariableUnidadMedida:id, abreviatura:abreviatura},
        });
      }

      openViewValorPermitidoTextual(id:any, abreviatura:any): void {
        const dialogRef = this.dialog.open(ViewValorPermitidoVariableTextual, {
          data: { idVariable: this.datos.idVariable, nombreVariable:this.datos.nombreVariable, idVariableUnidadMedida:id, abreviatura:abreviatura},
        });
      }
  
  }

  @Component({
    selector: 'view-valor-permitido-variable-textual',
    templateUrl: 'view-valor-permitido-variable-textual.html',
    styleUrls: ['./view-catalogo-organizacion.component.css']
  })
  export class ViewValorPermitidoVariableTextual {
    constructor(
      
      public dialogRef: MatDialogRef<ViewValorPermitidoVariableTextual>,
      @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
      private valorPermitidoService:ValorPermitidoService,
      public dialog: MatDialog,
    ) { }
  
  
    displayedColumns = ['dato1'];
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    ngOnInit(): void {
      this.listar();
    }
  
    listaDatos : any = []
  
    listar()
      {
        this.valorPermitidoService.obtenerPorVariable(this.datos.idVariableUnidadMedida).subscribe(
            res=>{
              this.listaDatos=res;
            },
            err=>console.log(err)
          )
      }
  
      page_size:number=5
      page_number:number=1
      page_size_options=[5,10,20,50,100]
    
      handlePage(e: PageEvent){
        this.page_size=e.pageSize
        this.page_number=e.pageIndex + 1
      }
      
      public search: string = '';
    
      onSearch( search: string ) {
        this.search = search;
      }
  
  }


  @Component({
    selector: 'view-valor-permitido-variable-numerica',
    templateUrl: 'view-valor-permitido-variable-numerica.html',
    styleUrls: ['./view-catalogo-organizacion.component.css']
  })
  export class ViewValorPermitidoVariableNumerica {
    constructor(
      
      public dialogRef: MatDialogRef<ViewValorPermitidoVariableNumerica>,
      @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
      private valorPermitidoService:ValorPermitidoService,
      public dialog: MatDialog,
    ) { }
  
  
    displayedColumns = ['dato1', 'dato2'];
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    ngOnInit(): void {
      this.listar();
    }
  
    listaDatos : any = []
  
    listar()
      {
        this.valorPermitidoService.obtenerPorVariable(this.datos.idVariableUnidadMedida).subscribe(
            res=>{
              this.listaDatos=res;
            },
            err=>console.log(err)
          )
      }
  
      page_size:number=5
      page_number:number=1
      page_size_options=[5,10,20,50,100]
    
      handlePage(e: PageEvent){
        this.page_size=e.pageSize
        this.page_number=e.pageIndex + 1
      }
      
      public search: string = '';
    
      onSearch( search: string ) {
        this.search = search;
      }
  
  }


  