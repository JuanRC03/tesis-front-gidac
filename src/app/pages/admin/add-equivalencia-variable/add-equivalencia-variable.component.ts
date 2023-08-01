import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CatalogoEspochService } from 'src/app/services/catalogo-espoch.service';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { EquivalenciaVariableService } from 'src/app/services/equivalencia-variable.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { MedidaService } from 'src/app/services/medida.service';
import { TipoVariableService } from 'src/app/services/tipo-variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-equivalencia-variable',
  templateUrl: './add-equivalencia-variable.component.html',
  styleUrls: ['./add-equivalencia-variable.component.css']
})
export class AddEquivalenciaVariableComponent implements OnInit {

  constructor(
    private equivalenciaVariableService:EquivalenciaVariableService,
    private tipoVariableService:TipoVariableService,
    private catalogoOrganizacionService:CatalogoOrganizacionService,
    private snack: MatSnackBar,
    private route:ActivatedRoute,
    private catalogoEspochService:CatalogoEspochService,
    private medidaService:MedidaService,
    private familiaService:FamiliaService) { }

  public equivalenciaVariable = {
    variable:{
      idVariable:'',
      nombreVariable:'',
      tipoVariable:{
        idTipoVariable:0,
      },
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
  idTipoVariableAux=0;
  ngOnInit(): void {
    this.listarTipoVariable();
    this.listarCatalogoOrganizacion();
    this.listarCatalogoEspoch();
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

  datoTipoVariable : any;

  obtenerTipoVariable()
    {
      this.tipoVariableService.obtener(this.idTipoVariableAux).subscribe(
          res=>{
            this.datoTipoVariable=res;
          },
          err=>console.log(err)
        )
    }

    datoCatalogoOrganizacion : any;

    obtenerCatalogoOrganizacion()
    {
      this.catalogoOrganizacionService.obtener(this.codigoVariableOrganizacionAux).subscribe(
          res=>{
            this.datoCatalogoOrganizacion=res;
          },
          err=>console.log(err)
        )
    }

  public cargarDatosVariable(){
    if (this.equivalenciaVariable.variable.tipoVariable.idTipoVariable == 0) {
      this.snack.open('El tipo de variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.equivalenciaVariable.catalogoOrganizacion.codigoVariableOrganizacion.trim() == '') {
      this.snack.open('La variable de la organización es requeredia !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.equivalenciaVariable.catalogoEspoch.codigoVariableEspoch== 0) {
      this.snack.open('La variable de la organización es requeredia !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if(this.idTipoVariableAux!=this.equivalenciaVariable.variable.tipoVariable.idTipoVariable){
      this.listaValoresPermitidos=[];
    }
    this.idTipoVariableAux=this.equivalenciaVariable.variable.tipoVariable.idTipoVariable;
    this.codigoVariableOrganizacionAux=this.equivalenciaVariable.catalogoOrganizacion.codigoVariableOrganizacion;
    if(this.idTipoVariableAux!=0){
      this.obtenerTipoVariable();
    }
    if(this.codigoVariableOrganizacionAux!=''){
      this.obtenerCatalogoOrganizacion();
    }
    this.codigoVariableEspochAux=this.equivalenciaVariable.catalogoEspoch.codigoVariableEspoch;
  }
  
  

  public agregar() {

    if (this.equivalenciaVariable.variable.tipoVariable.idTipoVariable == 0) {
      this.snack.open('El tipo de variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

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

    if (this.listaValoresPermitidos.length === 0) {
      this.snack.open('Aun no ha ingresado ningun valor permitido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.equivalenciaVariable.variable.idVariable=this.equivalenciaVariable.catalogoOrganizacion.codigoVariableOrganizacion;
    this.equivalenciaVariable.variable.nombreVariable=this.equivalenciaVariable.catalogoOrganizacion.nombreVariableOrganizacion;
    console.log(this.listaDatosSeleccionados);
    const formData = new FormData();
    
    formData.append('equivalenciaVariables', JSON.stringify(this.equivalenciaVariable));
    formData.append('listaValoresPermitidos', JSON.stringify(this.listaValoresPermitidos));
    formData.append('listaFamilia', JSON.stringify(this.listaDatosSeleccionados));

    this.equivalenciaVariableService.guardar(formData).subscribe(
      (data) => {
        Swal.fire('Variable añadida', 'La variable se añadio con éxito', 'success').then(
          (e) => {
            
            this.equivalenciaVariable.catalogoOrganizacion.codigoVariableOrganizacion='';
            this.equivalenciaVariable.catalogoEspoch.codigoVariableEspoch=0;
            this.equivalenciaVariable.variable.tipoVariable.idTipoVariable=0;
            this.listaValoresPermitidos=[];
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



