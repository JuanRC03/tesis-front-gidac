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
import { OrganizacionService } from 'src/app/services/organizacion.service';
import { ValorPermitidoService } from 'src/app/services/valor-permitido.service';
import { VariableUnidadMedidaService } from 'src/app/services/variable-unidad-medida.service';
import { ViewMedidaComponent } from '../../investigador/view-medida/view-medida.component';

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

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];

  

  ngAfterViewInit(): void {
  }
  
  ngOnInit(): void {
    this.listarVigentes();
    this.listarEliminado();
    //this.listarIncompletos();
  }

    listaCompletos : any = []
    listaIncompletos : any = []
    listaEliminados : any = []

    listarVigentes()
    {
      this.variableService.listarVigetes().subscribe(
          res=>{
            this.listaCompletos=res;
          },
          err=>console.log(err)
        )
    }

    cantidadIncompletos=0;
   
    listarEliminado()
    {
      this.variableService.listarNoVigetes().subscribe(
          res=>{
            this.listaEliminados=res;
          },
          err=>console.log(err)
        )
    }
  
    eliminar(id:any){
      Swal.fire({
        title:'Eliminar información',
        text:'¿Estás seguro de eliminar la variable del sistema?',
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
              Swal.fire('Información eliminada','La variable del sistema ha sido eliminada','success');
              this.listarEliminado();
            },
            (error) => {
              Swal.fire('Error','Error al eliminar la variable del sistema','error');
            }
          )
        }
      })
    }

    restaurar(id:any){
      Swal.fire({
        title:'Restaurar información ',
        text:'¿Estás seguro de restaurar la variable del sistema?',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText:'Restaurar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if(result.isConfirmed){
          this.variableService.activar(id).subscribe(
            (data) => {
              this.listaEliminados = this.listaEliminados.filter((lista:any) => lista.idVariable != id);
              Swal.fire('Información restaurada','La variable del sistema ha sido restaurada','success');
              this.listarVigentes();
            },
            (error) => {
              Swal.fire('Error','Error al restaurar la variable del sistema','error');
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
    
    page_number1: number = 1

    handlePage1(e: PageEvent) {
      this.page_size = e.pageSize
      this.page_number1 = e.pageIndex + 1
    }

    public search: string = '';
  
    onSearch( search: string ) {
      this.search = search;
    }

    openDialogAgregarEquivalencia(): void {
      const dialogRef = this.dialog.open(DialogAddEquivalencia, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
        
      });
    }

    openDialogEditarEquivalencia(id:any): void {
      const dialogRef = this.dialog.open(DialogEditarEquivalencia, {
        data: { idVariable: id},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
      });
    }

    openDialogCompletarDatos(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(DialogCompletarDatosVariable, {
        data: { idVariable: id, nombreVariable:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
        
      });
    }

    openViewVariableSistema(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(ViewCatalogoVariable, {
        data: { idVariable: id, nombreVariable:nombre},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.listarVigentes();
        
      });
    }

    openViewUnidadMedidaVariable(id:any, nombre:any): void {
      const dialogRef = this.dialog.open(ViewUnidadMedidavariableAdmin, {
        data: { idVariable: id, nombreVariable:nombre},
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
    private variableService:VariableService,
    private tipoVariableService:TipoVariableService,
    private medidaService:MedidaService,
    private familiaService:FamiliaService,
    private organizacionService:OrganizacionService,
    private matDialog:MatDialog,
  ) { }

  variable={
    codigoVariable:'',
    nombreVariable:'',
    tipoVariable:{
      idTipoVariable:0,
      nombreTipoVariable:'',
    },
  }

  variableOrganizacion={
    codigoVariableOrganizacion:'',
    nombreVariableOrganizacion:'',
    descripcion:'',
    vigencia:1,
    organizacion:{
      idOrganizacion:0,
      nombreOrganizacion:'',
    },
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }


  idTipoVariableAux=0;
  ngOnInit(): void {
    this.listarTipoVariable();
    this.listarMedidas();
    this.listarOrganizacion();
    this.cargarJerarquia();
  }

  medida : any = []

  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            this.medida.unshift({ idUnidadMedida: -1, unidadMedida: 'Nuevo' });
            console.log(this.medida);
          },
          err=>console.log(err)
        )
    }

    organizacionDatos : any = []

  listarOrganizacion()
    {
      this.organizacionService.listar().subscribe(
          res=>{
            this.organizacionDatos=res;
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
      if (this.variable.codigoVariable == '') {
        this.snack.open('El código de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      if (this.variable.nombreVariable == '') {
        this.snack.open('El nombre de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      if (this.variableOrganizacion.descripcion == '') {
        this.snack.open('La descripción de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      if (this.variableOrganizacion.organizacion.idOrganizacion == 0) {
        this.snack.open('La organización de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

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

      if (this.listaDatosSeleccionados.length === 0) {
        this.snack.open('Aun no ha seleccionado ninguna falimia !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      this.variableOrganizacion.codigoVariableOrganizacion=this.variable.codigoVariable;
      this.variableOrganizacion.nombreVariableOrganizacion=this.variable.nombreVariable;
      const formData = new FormData();
      
      formData.append('variable', JSON.stringify(this.variable));
      formData.append('catalogoOrganizacion', JSON.stringify(this.variableOrganizacion));
      formData.append('listaValoresPermitidos', JSON.stringify(this.listaValoresPermitidos));
      formData.append('listaFamilia', JSON.stringify(this.listaDatosSeleccionados));
  
      this.variableService.guardarDatosVariable(formData).subscribe(
        (data) => {
          Swal.fire('Información agregada', 'La variable se agrego con éxito', 'success').then(
            (e) => {
              this.afterClosed.emit();
              this.dialogRef.close();
            })
        }, (error) => {
          Swal.fire('Error en el sistema', 'No se agrego la nueva variable del sistema', 'error');
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
            if(this.valorPermitido.idUnidadMedida==0){
              this.snack.open('La unidad de medida es requerida !!','Aceptar',{
                duration : 3000
              });
            }
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
                this.snack.open('El valor mínimo de ser menor que el máximo !!','Aceptar',{
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

    agregarUnidadMedida(): void {
      const dialogRef = this.matDialog.open(AgregarUnidadMedidaVariable, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarMedidas();
      });
    }

    onSelectionChange(event: any) {
      const idSeleccionado = event.value.idUnidadMedida;
      if(idSeleccionado==-1){
        this.agregarUnidadMedida();
      }
    }
}



@Component({
  selector: 'agregar-unidad-medida-variable',
  templateUrl: 'agregar-unidad-medida-variable.html',
  styleUrls: ['./view-variables-admin.component.css']
})

export class AgregarUnidadMedidaVariable {
  constructor(
    public dialogRef: MatDialogRef<AgregarUnidadMedidaVariable>,
    private medidaService:MedidaService,
    private snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public medida = {
    abreviatura: '',
    magnitud: '',
    unidadMedida: '',
    vigencia:1
  }

  ngOnInit(): void {
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  public agregar() {

    if (this.medida.abreviatura.trim() == '' || this.medida.abreviatura.trim() == null) {
      this.snack.open('La abreviatura es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.medida.unidadMedida.trim() == '' || this.medida.unidadMedida.trim() == null) {
      this.snack.open('La unidad de medida es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.medida.magnitud.trim() == '' || this.medida.magnitud.trim() == null) {
      this.snack.open('La magnitud es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.medidaService.guardar(this.medida).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'La unidad de medida se agrego con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego la unidad de medida', 'error');
        console.log(error);
      }
    );
  }

}




@Component({
  selector: 'editar-equivalencia-variable',
  templateUrl: 'editar-equivalencia-variable.html',
  styleUrls: ['./view-variables-admin.component.css']
})
export class DialogEditarEquivalencia {
  constructor(
    
    public dialogRef: MatDialogRef<DialogEditarEquivalencia>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private snack: MatSnackBar,
    private service: TipoProyectoService,
    private catalogoOrganizacionService:CatalogoOrganizacionService,
    private catalogoEspochService:CatalogoEspochService,
    private variableService:VariableService,
    private tipoVariableService:TipoVariableService,
    private medidaService:MedidaService,
    private familiaService:FamiliaService,
    private organizacionService:OrganizacionService,
    private valorPermitidoService:ValorPermitidoService,
    private matDialog:MatDialog
  ) { }

  variable={
    idVariable:0,
    codigoVariable:'',
    nombreVariable:'',
    vigencia:1,
    tipoVariable:{
      idTipoVariable:0,
      nombreTipoVariable:'',
    },
  }

  variableOrganizacion={
    idVariableOrganizacion:0,
    codigoVariableOrganizacion:'',
    nombreVariableOrganizacion:'',
    descripcion:'',
    vigencia:1,
    organizacion:{
      idOrganizacion:0,
      nombreOrganizacion:'',
    },
    variable:{
      idVariable:0,
    },
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }


  idTipoVariableAux=0;
  ngOnInit(): void {
    
    this.obtenerVariableData();
    this.listarTipoVariable();
    this.listarMedidas();
    this.listarOrganizacion();
  }

  variableData:any = null;

  obtenerVariableData()
    {
      this.variableService.obtener(this.datos.idVariable).subscribe(
          (res:any)=>{
            this.variable.idVariable=res.idVariable
            this.variable.codigoVariable=res.codigoVariable
            this.variable.nombreVariable=res.nombreVariable
            this.variable.tipoVariable.idTipoVariable=res.tipoVariable.idTipoVariable
            this.variable.tipoVariable.nombreTipoVariable=res.tipoVariable.nombreTipoVariable
            this.obtenerCatalogoData();
            this.cargarTipoVariable();
            this.listarValorPermitido();
            this.cargarJerarquia();
            
          },
          err=>console.log(err)
        )
    }

    obtenerCatalogoData()
    {
      this.catalogoOrganizacionService.obtenerPorCodigoOrganizacion(this.variable.codigoVariable).subscribe(
          (res:any)=>{
            this.variableOrganizacion.idVariableOrganizacion=res.idVariableOrganizacion
            this.variableOrganizacion.codigoVariableOrganizacion=res.codigoVariableOrganizacion
            this.variableOrganizacion.nombreVariableOrganizacion=res.nombreVariableOrganizacion
            this.variableOrganizacion.descripcion=res.descripcion
            this.variableOrganizacion.organizacion.idOrganizacion=res.organizacion.idOrganizacion
            this.variableOrganizacion.organizacion.nombreOrganizacion=res.organizacion.nombreOrganizacion
            this.variableOrganizacion.variable.idVariable=res.variable.idVariable
          },
          err=>console.log(err)
        )
    }
  

  medida : any = []

  listarMedidas()
    {
      this.medidaService.listar().subscribe(
          res=>{
            this.medida=res;
            this.medida.unshift({ idUnidadMedida: -1, unidadMedida: 'Nuevo' });
          },
          err=>console.log(err)
        )
    }

    organizacionDatos : any = []

  listarOrganizacion()
    {
      this.organizacionService.listar().subscribe(
          res=>{
            this.organizacionDatos=res;
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

    listaValoresPermitidos: any = [];
    
    listarValorPermitido()
      {
        this.valorPermitidoService.listarPorVariable(this.variable.idVariable).subscribe(
            (res:any)=>{
              this.listaValoresPermitidos=res;
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

    public actualizarDatosGenerales() {
      if (this.variable.codigoVariable == '') {
        this.snack.open('El código de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      if (this.variable.nombreVariable == '') {
        this.snack.open('El nombre de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      if (this.variableOrganizacion.descripcion == '') {
        this.snack.open('La descripción de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      if (this.variableOrganizacion.organizacion.idOrganizacion == 0) {
        this.snack.open('La organización de la variable es requerido !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      this.variableOrganizacion.codigoVariableOrganizacion=this.variable.codigoVariable;
      this.variableOrganizacion.nombreVariableOrganizacion=this.variable.nombreVariable;
      const formData = new FormData();
      
      formData.append('variable', JSON.stringify(this.variable));
      formData.append('catalogoOrganizacion', JSON.stringify(this.variableOrganizacion));
  
      this.variableService.actualizarDatosGeneralesVariable(formData).subscribe(
        (data) => {
          Swal.fire('Información actualizada', 'Los datos generales de la variable se actualizo con éxito', 'success');
        }, (error) => {
          Swal.fire('Error en el sistema', 'No se actualizo los datos generales de la variable', 'error');
          console.log(error);
        }
      );
    }

    public actualizarFamilia() {
      
      if (this.listaDatosSeleccionados.length === 0) {
        this.snack.open('Aun no ha seleccionado ninguna falimia !!', 'Aceptar', {
          duration: 3000
        })
        return;
      }

      const formData = new FormData();
      
      formData.append('variable', JSON.stringify(this.variable));
      formData.append('listaFamilia', JSON.stringify(this.listaDatosSeleccionados));
  
      this.familiaService.actualizarFamiliasVariable(formData).subscribe(
        (data) => {
          Swal.fire('Información actualizada', 'Las familias se actualizaron con éxito', 'success').then(
            (e) => {
              this.cargarJerarquia()
            })
        }, (error) => {
          Swal.fire('Error en el sistema', 'No se actualizaron las familias', 'error');
          console.log(error);
        }
      );
    }
  
    //valores permitidos
    displayedColumnsNumerico: string[] = ['dato1', 'dato2', 'opcion'];
    displayedColumnsNominal: string[] = ['dato1', 'opcion'];
      
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
            if(this.valorPermitido.idUnidadMedida==0){
              this.snack.open('La unidad de medida es requerida !!','Aceptar',{
                duration : 3000
              });
            }
            this.valorMaximoAux = parseFloat(this.valorPermitido.valorMaximo);
            this.valorMinimoAux = parseFloat(this.valorPermitido.valorMinimo);
            if(this.valorMinimoAux<this.valorMaximoAux){

              this.valorPermitido.idUnidadMedida=this.unidadMedida.idUnidadMedida;
            
              const formData = new FormData();
              formData.append('variable', JSON.stringify(this.variable));
              formData.append('valoresPermitidos', JSON.stringify(this.valorPermitido));

                this.valorPermitidoService.guardarValorPermitido(formData).subscribe(
                  (data) => {
                    Swal.fire('Información actualizada 1', 'El valor permitido se añadio con éxito', 'success').then(
                      (e) => {
                        this.listarValorPermitido();
                      })
                  }, (error) => {
                    Swal.fire('Error en el sistema', 'No se registro el valor permitido', 'error');
                    console.log(error);
                  }
                );

                this.valorPermitido.idUnidadMedida = 0;
                this.valorPermitido.unidadMedida = '';
                this.valorPermitido.abreviatura = '';
                this.valorPermitido.valorMaximo = '';
                this.valorPermitido.valorMinimo = '';
                this.valorPermitido.valorPermitido = '';

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

              const formData = new FormData();
              formData.append('variable', JSON.stringify(this.variable));
              formData.append('valoresPermitidos', JSON.stringify(this.valorPermitido));

              this.valorPermitidoService.guardarValorPermitido(formData).subscribe(
                (data) => {
                  Swal.fire('Información actualizada', 'El valor permitido se añadio con éxito', 'success').then(
                    (e) => {
                      this.listarValorPermitido();
                    })
                }, (error) => {
                  Swal.fire('Error en el sistema', 'No se registro el valor permitido', 'error');
                  console.log(error);
                }
              );                
                this.valorPermitido.idUnidadMedida = 0;
                this.valorPermitido.unidadMedida = '';
                this.valorPermitido.abreviatura = '';
                this.valorPermitido.valorMaximo = '';
                this.valorPermitido.valorMinimo = '';
                this.valorPermitido.valorPermitido = '';
                this.unidadMedida.idUnidadMedida=0;
          }
        }
      }
    
      eliminarValorPermitido(id:any){
        Swal.fire({
          title:'Eliminar valor permitido',
          text:'¿Estás seguro de eliminar valor permitido?',
          icon:'warning',
          showCancelButton:true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor:'#d33',
          confirmButtonText:'Eliminar',
          cancelButtonText:'Cancelar'
        }).then((result) => {
          if(result.isConfirmed){
            this.valorPermitidoService.eliminar(id).subscribe(
              (data) => {
                Swal.fire('Eliminar información ','EL valor permitido ha sido eliminado','success');
                this.listarValorPermitido();
              },
              (error) => {
                Swal.fire('Error','Error al eliminar el valor permitido','error');
              }
            )
          }
        })
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
          this.listarFamilias()
        });
      });
    }

    listarFamilias() {
      this.familiaService.listarFamiliasSeleccionadasPorVariable(this.variable.idVariable).subscribe(
        (res: any) => {
          this.selection.clear();
          for (const item of res) {
            const foundItem = this.dataSource.data.find(row => row.idFamilia === item.familia.idFamilia);
            if (foundItem) {
              this.selection.select(foundItem);
            }
          }
        },
        err => console.log(err)
      );
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

    agregarUnidadMedida(): void {
      const dialogRef = this.matDialog.open(AgregarUnidadMedidaVariable, {});
      dialogRef.afterClosed().subscribe(() => {
        this.listarMedidas();
      });
    }

    onSelectionChange(event: any) {
      const idSeleccionado = event.value.idUnidadMedida;
      if(idSeleccionado==-1){
        this.agregarUnidadMedida();
      }
    }

}


interface DatosActualizar {
  idVariable: '',
  nombreVariable: '',
}

@Component({
  selector: 'view-equivalencia-catalogo-variable',
  templateUrl: 'view-equivalencia-catalogo-variable.html',
  styleUrls: ['./view-variables-admin.component.css']
})
export class ViewCatalogoVariable {
  constructor(
    
    public dialogRef: MatDialogRef<ViewCatalogoVariable>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private catalogoOrganizacionService:CatalogoOrganizacionService,
  ) { }


  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  displayedColumns = ['dato1', 'dato2', 'dato3'];

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.listarCatalogoVariable();
  }

  listaDatos : any = []

  listarCatalogoVariable()
    {
      this.catalogoOrganizacionService.obtenerPorVariableSistemaVigente(this.datos.idVariable).subscribe(
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
  
  
  
  

  

interface DatosActualizar {
  idVariable: '',
  nombreVariable: '',
}

@Component({
  selector: 'view-unidad-medida-variable-admin',
  templateUrl: 'view-unidad-medida-variable-admin.html',
  styleUrls: ['./view-variables-admin.component.css']
})
export class ViewUnidadMedidavariableAdmin {
  constructor(
    
    public dialogRef: MatDialogRef<ViewUnidadMedidavariableAdmin>,
    @Inject(MAT_DIALOG_DATA) public datos: DatosActualizar,
    private variableUnidadMedidaService:VariableUnidadMedidaService,
  ) { }


  displayedColumns = ['dato1', 'dato2', 'dato3'];

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

}