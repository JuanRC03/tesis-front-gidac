import { AfterViewInit, Component, ViewChild, EventEmitter, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ViewVariablesAdminDataSource, ViewVariablesAdminItem } from './view-variables-admin-datasource';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoProyectoService } from 'src/app/services/tipo-proyecto.service';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { CatalogoEspochService } from 'src/app/services/catalogo-espoch.service';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';
import { TipoVariableService } from 'src/app/services/tipo-variable.service';
import { MedidaService } from 'src/app/services/medida.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-view-variables-admin',
  templateUrl: './view-variables-admin.component.html',
  styleUrls: ['./view-variables-admin.component.css']
})
export class ViewVariablesAdminComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewVariablesAdminItem>;
  dataSource: ViewVariablesAdminDataSource;


  constructor(private variableService:VariableService, public dialog: MatDialog,) {
    this.dataSource = new ViewVariablesAdminDataSource();
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'dato4', 'opciones'];
  displayedColumnsEliminados = ['dato1', 'dato2', 'dato3', 'opciones'];

  

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminado();
    this.listarIncompletos();
  }

    listaCompletos : any = []
    listaIncompletos : any = []
    listaEliminados : any = []

    listarVigentes()
    {
      this.variableService.listarCompletas().subscribe(
          res=>{
            console.log(res)
            this.listaCompletos=res;
            
          },
          err=>console.log(err)
        )
    }

    cantidadIncompletos=0;
    hiddenIncompletos = true;

    toggleBadgeVisibilitySolicitud() {
      this.hiddenIncompletos = true;
    }
    listarIncompletos()
    {
      this.variableService.listarIncompletas().subscribe(
          res=>{
            this.listaIncompletos=res;
            this.cantidadIncompletos=this.listaIncompletos.length;
            if(this.cantidadIncompletos==0){
              this.hiddenIncompletos=true;
            }else{
              this.hiddenIncompletos=false;
            }
          },
          err=>console.log(err)
        )
    }

    listarEliminado()
    {
      this.variableService.listar().subscribe(
          res=>{
            this.listaEliminados=res;
          },
          err=>console.log(err)
        )
    }
  
    eliminar(id:any){
      Swal.fire({
        title:'Eliminar variable',
        text:'¿Estás seguro de eliminar la variable?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Eliminar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.variableService.eliminar(id).subscribe(
            (data) => {
              this.listaCompletos = this.listaCompletos.filter((lista:any) => lista.idVariable != id);
              Swal.fire('Variable eliminado','La variable ha sido eliminado','success');
              this.listarEliminado();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la variable','error');
            }
          )
        }
      })
    }

    restaurar(id:any){
      Swal.fire({
        title:'Restaurar variable',
        text:'¿Estás seguro de restaurar al variable?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.variableService.eliminar(id).subscribe(
            (data) => {
              this.listaEliminados = this.listaEliminados.filter((lista:any) => lista.idVariable != id);
              Swal.fire('Variable restaurada','La variable ha sido restaurado','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar la variable','error');
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

    openDialogAgregarEquivalencia(): void {
      const dialogRef = this.dialog.open(DialogAddEquivalencia, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
        this.listarIncompletos();
      });
      
    }

    openDialogCompletarDatos(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(DialogCompletarDatosVariable, {
        data: { idVariable: id, nombreVariable:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
        this.listarIncompletos();
      });
    }
  }


  
@Component({
  selector: 'add-equivalencia-variable',
  templateUrl: 'add-equivalencia-variable.html',
  styleUrls: ['./view-variables-admin.component.css']
})
export class DialogAddEquivalencia {
  constructor(
    
    public dialogRef: MatDialogRef<DialogAddEquivalencia>,
    private snack: MatSnackBar,
    private service: TipoProyectoService,
    private catalogoOrganizacionService:CatalogoOrganizacionService,
    private catalogoEspochService:CatalogoEspochService,
    private equivalenciaVariableService:EquivalenciaVariableService


  ) { }

  public equivalenciaVariable = {
    variable:{
      idVariable:'',
      nombreVariable:''
    },
    catalogoOrganizacion:{
      codigoVariableOrganizacion:'',
      nombreVariableOrganizacion:''
    },
    catalogoEspoch:{
      codigoVariableEspoch:0,
      nombreVariableEspoch:''
    }
  }

  codigoVariableOrganizacionAux='';
  codigoVariableEspochAux=0;

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  investigacion: any = [];

  ngOnInit(): void {
    this.listarCatalogoOrganizacion();
    this.listarCatalogoEspoch();
  }

    catalogoOrganizacion : any = []

    listarCatalogoOrganizacion()
    {
      this.catalogoOrganizacionService.listar().subscribe(
          res=>{
            this.catalogoOrganizacion=res;
          },
          err=>console.log(err)
        )
    }

    catalogoEspoch : any = []

    listarCatalogoEspoch()
    {
      this.catalogoEspochService.listar().subscribe(
          res=>{
            this.catalogoEspoch=res;
          },
          err=>console.log(err)
        )
    }

    public agregar() {

      if (this.equivalenciaVariable.catalogoOrganizacion.codigoVariableOrganizacion.trim()=='') {
        this.snack.open('La variable de la organización es requeredia !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }
  
  
      if (this.equivalenciaVariable.catalogoEspoch.codigoVariableEspoch== 0) {
        this.snack.open('El nombre de la variable del proyecto es requerida !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }
  
      this.equivalenciaVariable.variable.idVariable=this.equivalenciaVariable.catalogoOrganizacion.codigoVariableOrganizacion;
      this.equivalenciaVariable.variable.nombreVariable=this.equivalenciaVariable.catalogoOrganizacion.nombreVariableOrganizacion;
      
      this.equivalenciaVariableService.guardar(this.equivalenciaVariable).subscribe(
        (data) => {
          Swal.fire('Equivalencia agregada', 'La equivalencia de la variable se añadio con éxito', 'success').then(
            (e) => {
              
              this.afterClosed.emit();
              this.dialogRef.close();
            })
        }, (error) => {
          Swal.fire('Error al añadir la equivalencia', 'No se registro la nueva equivalencia', 'error');
          console.log(error);
        }
      );
    }
}

  


interface DatosActualizar {
  idVariable: '',
  nombreVariable: '',
}
  
@Component({
  selector: 'completar-datos-variable',
  templateUrl: 'completar-datos-variable.html',
  styleUrls: ['./view-variables-admin.component.css']
})
export class DialogCompletarDatosVariable {
  constructor(
    
    public dialogRef: MatDialogRef<DialogCompletarDatosVariable>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private service: TipoProyectoService,
    private catalogoOrganizacionService:CatalogoOrganizacionService,
    private catalogoEspochService:CatalogoEspochService,
    private equivalenciaVariableService:EquivalenciaVariableService,
    private tipoVariableService:TipoVariableService,
    private medidaService:MedidaService,
    private familiaService:FamiliaService

  ) { }


  variable={
    idVariable:'',
    nombreVariable:'',
    tipoVariable:{
      idTipoVariable:0,
      nombreTipoVariable:'',
    },
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }


  idTipoVariableAux=0;
  ngOnInit(): void {
    this.variable.idVariable=this.datos.idVariable;
    this.variable.nombreVariable=this.datos.nombreVariable;
    this.listarTipoVariable();
    this.listarMedidas();
    this.cargarJerarquia();
  }

  

  medida : any = []

  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            console.log(this.medida);
          },
          err=>console.log(err)
        )
    }


  tipoVariable : any = []

  listarTipoVariable()
    {
      this.tipoVariableService.listar().subscribe(
          res=>{
            this.tipoVariable=res;
          },
          err=>console.log(err)
        )
    }

    
  datoTipoVariable : any=0;

  obtenerTipoVariable()
    {
      this.tipoVariableService.obtener(this.idTipoVariableAux).subscribe(
          res=>{
            this.datoTipoVariable=res;
          },
          err=>console.log(err)
        )
    }


    

    
    public agregar() {

      if (this.variable.tipoVariable.idTipoVariable == 0) {
        this.snack.open('El tipo de variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }
  
      if (this.listaValoresPermitidos.length === 0) {
        this.snack.open('Aun no ha ingresado ningun valor permitido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }
  
      const formData = new FormData();
      
      formData.append('variable', JSON.stringify(this.variable));
      formData.append('listaValoresPermitidos', JSON.stringify(this.listaValoresPermitidos));
      formData.append('listaFamilia', JSON.stringify(this.listaDatosSeleccionados));
  
      this.equivalenciaVariableService.guardarDatosVariable(formData).subscribe(
        (data) => {
          Swal.fire('Variable añadida', 'La variable se añadio con éxito', 'success').then(
            (e) => {
              this.afterClosed.emit();
              this.dialogRef.close();
            })
        }, (error) => {
          Swal.fire('Error al anadir la variable', 'No se registro la nueva variable', 'error');
          console.log(error);
        }
      );
    }
  
    //valores permitidos
    displayedColumnsNumerico: string[] = ['dato1', 'dato2', 'opcion'];
    displayedColumnsNominal: string[] = ['dato1', 'opcion'];
      listaValoresPermitidos: any[] = [];
      unidadMedida = {
        idUnidadMedida:0,
        unidadMedida: '',
        abreviatura: '',
      };
      valorPermitido = {
        idUnidadMedida:0,
        unidadMedida: '',
        abreviatura: '',
        valorMaximo: '',
        valorMinimo: '',
        valorPermitido: ''
      };
    
      valorMaximoAux=0;
      valorMinimoAux=0;

      cargarTipoVariable(){
        this.listaValoresPermitidos= [];
        this.idTipoVariableAux=this.variable.tipoVariable.idTipoVariable;
        if(this.idTipoVariableAux!=0){
          this.obtenerTipoVariable();
        }
      }
      agregarValorPermitido() {
        
        if(this.idTipoVariableAux==1){
          if(this.valorPermitido.valorMaximo=='' || this.valorPermitido.valorMinimo==''){
            this.snack.open('Ingrese los valores !!','Aceptar',{
              duration : 3000
            });
          }else{
            this.valorMaximoAux = parseFloat(this.valorPermitido.valorMaximo);
            this.valorMinimoAux = parseFloat(this.valorPermitido.valorMinimo);
            if(this.valorMinimoAux<this.valorMaximoAux){
              this.listaValoresPermitidos.push({
                idUnidadMedida: this.unidadMedida.idUnidadMedida,
                unidadMedida: this.unidadMedida.unidadMedida,
                abreviatura: this.unidadMedida.abreviatura,
                valorMaximo: this.valorPermitido.valorMaximo,
                valorMinimo: this.valorPermitido.valorMinimo,
                });
                this.valorPermitido.valorMinimo = '';
                this.valorPermitido.valorMaximo = '';
              }else{
                this.snack.open('El valor minimo de ser menor que el maximo !!','Aceptar',{
                  duration : 3000
                });
              }
  
          }
        }else{
          if(this.valorPermitido.valorPermitido==''){
            this.snack.open('Ingrese el valor permitido !!','Aceptar',{
              duration : 3000
            });
          }else{
              this.listaValoresPermitidos.push({
                valorPermitido: this.valorPermitido.valorPermitido,
                });
                this.valorPermitido.valorPermitido = '';
          }
        }
      }
    
      eliminarValorPermitido(index: number) {
        this.listaValoresPermitidos.splice(index, 1);
      }
  
  
      //areas investigacion:
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    displayedColumns: string[] = ['select', 'dato1'];
    dataSource = new MatTableDataSource<FamiliaDTO>();
    selection = new SelectionModel<FamiliaDTO>(true, []);
    listaDatos: FamiliaDTO[] = [];
    listaDatosSeleccionados: FamiliaDTO[] = [];
    toggleRow(row: FamiliaDTO) {
      this.selection.toggle(row);
    }
  
    checkboxLabel(row?: FamiliaDTO): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idFamilia}`;
    }
  
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      this.listaDatosSeleccionados = this.selection.selected;
      return numSelected === numRows;
    }
  
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.listaDatosSeleccionados = this.selection.selected;
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  
  
    hijosFinales!: FamiliaDTO[];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    cargarJerarquia(): void {
      this.familiaService.getHijosFinales().subscribe((hijosFinales: FamiliaDTO[]) => {
        setTimeout(() => {
          this.hijosFinales = hijosFinales;
          this.dataSource.data = hijosFinales;
          this.dataSource.paginator = this.paginator;
          this.listaDatos = hijosFinales.map((familia: any) => ({ ...familia, checked: false }));
          //this.changeDetectorRef.detectChanges();
        });
      });
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
  
  export interface FamiliaDTO {
    idFamilia: number;
    descripcion: string;
    descripcionCompleta: string;
    checked: boolean;
  }
  
  
  
  

  
