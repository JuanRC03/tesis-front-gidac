import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ViewVariableProyectoDataSource, ViewVariableProyectoItem } from './view-variable-proyecto-datasource';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';
import { ValorPermitidoService } from 'src/app/services/valor-permitido.service';

@Component({
  selector: 'app-view-variable-proyecto',
  templateUrl: './view-variable-proyecto.component.html',
  styleUrls: ['./view-variable-proyecto.component.css']
})
export class ViewVariableProyectoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewVariableProyectoItem>;
  dataSource: ViewVariableProyectoDataSource;

  constructor(private equivalenciaVariableService:EquivalenciaVariableService,
    public dialog: MatDialog,
    private route:ActivatedRoute) {
    this.dataSource = new ViewVariableProyectoDataSource();
  }

  
  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];
  
  ngAfterViewInit(): void {
  }
  
  idProyecto= 0;
  ngOnInit(): void {
    this.listaDatos=[];
    this.idProyecto = this.route.snapshot.params['idProyecto'];
    this.listarVigentes();
  }

    listaDatos : any = []

    listarVigentes()
    {
      this.equivalenciaVariableService.obtenerPorProyecto(this.idProyecto).subscribe(
          res=>{
            this.listaDatos=res;
          },
          err=>console.log(err)
        )
    }

    eliminar(codigoVariableEspoch:any){
      Swal.fire({
        title:'Eliminar conglomerado',
        text:'¿Estás seguro de eliminar al conglomerado?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.equivalenciaVariableService.eliminar(codigoVariableEspoch).subscribe(
            (data) => {
              this.listaDatos = this.listaDatos.filter((datos:any) => datos.codigoVariableEspoch != codigoVariableEspoch);
              Swal.fire('Conglomerado eliminado','El conglomerado ha sido eliminado','success');
            },
            (error) => {
              Swal.fire('Error','Error al eliminar el conglomerado, el conglomerado debe estar vacio','error');
            }
          )
        }
      })
    }
  
    //paginacion y busqueda
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
    //abrir el dialogo informacion
    openDialogValoresPermitidos(idVariable:any, nombreVariable:any): void {
      const dialogRef = this.dialog.open(ViewValoresPermitidos, {
        data: {idVariable: idVariable, nombreVariable:nombreVariable},
      });
    }
  }

  export interface DialogDatavariable {
    idVariable: '';
    nombreVariable: '';
  }
  
  @Component({
    selector: 'view-valores-permitidos',
    templateUrl: 'view-valores-permitidos.html',
    styleUrls: ['./view-variable-proyecto.component.css']
  })
  
  export class ViewValoresPermitidos{
    constructor(
      public dialogRef: MatDialogRef<ViewValoresPermitidos>,
      @Inject(MAT_DIALOG_DATA) public data:DialogDatavariable,
      private valorPermitidoService:ValorPermitidoService
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    listaDatos:any = [];
  
    ngOnInit(): void {
    
      this.valorPermitidoService.obtenerPorVariable(this.data.idVariable).subscribe(
        (dato:any) => {
          console.log(dato);
          this.listaDatos=dato;
        }
      ) 
    }
    
  
  }
  
    
    