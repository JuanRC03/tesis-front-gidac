import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AreasInvestigacionService } from 'src/app/services/areas-investigacion.service';
import { EstadoProyectoInvestigacionService } from 'src/app/services/estado-proyecto-investigacion.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { LineaInvestigacionService } from 'src/app/services/linea-investigacion.service';
import { SectorImpactoService } from 'src/app/services/sector-impacto.service';
import { TipoInvestigacionService } from 'src/app/services/tipo-investigacion.service';
import { TipoProyectoService } from 'src/app/services/tipo-proyecto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-proyecto-investigacion',
  templateUrl: './add-proyecto-investigacion.component.html',
  styleUrls: ['./add-proyecto-investigacion.component.css']
})
export class AddProyectoInvestigacionComponent implements OnInit {

  estadoProyectoInvestigacion:any = [];
  public fechaPorDefecto: Date = new Date(0);
  proyectoInvestigacion :any= {
    nombreProyecto: '',
    descripcion: '',
    fechaInicio: null,
    fechaFin: null,
    estadoProyectoInvestigacion:{
      idEstadoProyecto:0,
      nombreEstadoProyecto:'',
    },
    tipoInvestigacion:{
      idTipoInvestigacion:0,
      nombreTipoInvestigacion:'',
    },
    tipoProyecto:{
      idTipoProyecto:0,
      nombreTipoProyecto:'',
    }
  }
  
  idUsuario=0;

  constructor(private investigacionService:InvestigacionService,
              private snack:MatSnackBar,
              private router:Router,
              private route:ActivatedRoute,
              private tipoInvestigacionService: TipoInvestigacionService,
              private tipoProyectoService:TipoProyectoService,
              private sectorImpactoService:SectorImpactoService,
              private lineaInvestigacionService: LineaInvestigacionService,
              private areasInvestigacionService: AreasInvestigacionService,
              private estadoProyectoInvestigacionService:EstadoProyectoInvestigacionService,
              private ubicacionService:UbicacionService) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
    
    console.log(this.idUsuario)
    this.listarEstadoProyectoInvestigacion();
    this.listarTipoInvestigacion();
    this.listarTipoProyecto();
    this.listarLineasInvestigacion();
    this.listarAreasInvestigacionDisponibles();
    this.listarSectorImpacto();
    this.listarPaises();
    //this.proyectoInvestigacion.areaInvestigacion.idAreaInvestigacion=this.idAreaInvestigacion;
  }


  
  public paisSeleccionado = {
    codigoPais: '',
    nombrePais:'',
  }

  public provinciaSeleccionado = {
    codigoProvincia: '',
    nombreProvincia:'',
  }

  public cantonSeleccionado = {
    codigoCanton: '',
    nombreCanton:'',
  }

  public parroquiaSeleccionado = {
    idLocalizacion: 0,
    codigoParroquia: '',
    nombreParroquia:'',
  }

  usuarioDirector = {
    idUsuario: 0
  }

  listaPaises : any = []
  listaProvincias : any = []
  listaCantones : any = []
  listaParroquias : any = []

  listarPaises()
    {
      this.ubicacionService.obtenerPaises().subscribe(
          (res:any)=>{
            this.listaPaises=res;
            this.listaProvincias= [];
            this.listaCantones= [];
            this.listaParroquias = [];
            this.provinciaSeleccionado.codigoProvincia="";
          },
          err=>console.log(err)
        )
    }

    listarProvincias()
    {
      this.listaCantones= []
            this.listaParroquias = []
      this.ubicacionService.obtenerProvincias(this.paisSeleccionado.codigoPais).subscribe(
          (res:any)=>{
            this.listaProvincias=res
            this.listaCantones= []
            this.listaParroquias = []
            this.cantonSeleccionado.codigoCanton='';
            this.parroquiaSeleccionado.idLocalizacion=0;
          },
          err=>console.log(err)
        )
    }

    listarCantones()
    {
      this.listaParroquias = []
      this.ubicacionService.obtenerCantones(this.paisSeleccionado.codigoPais,this.provinciaSeleccionado.codigoProvincia).subscribe(
          (res:any)=>{
            this.listaCantones=res;
            this.listaParroquias = []
            this.parroquiaSeleccionado.idLocalizacion=0;
          },
          err=>console.log(err)
        )
    }

    listarParroquias()
    {
      this.ubicacionService.obtenerParroquias(this.paisSeleccionado.codigoPais,this.provinciaSeleccionado.codigoProvincia,this.cantonSeleccionado.codigoCanton).subscribe(
          (res:any)=>{
            this.listaParroquias = res;
          },
          err=>console.log(err)
        )
    }

    listalocalizacion: any[] = [];
    localizacion = {
      idLocalizacion: 0,
      codigoPais: '',
      nombrePais:'',
      codigoProvincia: '',
      nombreProvincia:'',
      codigoCanton: '',
      nombreCanton:'',
      codigoParroquia: '',
      nombreParroquia:'',
    };

    agregarLocalizacion() {
      
      if(this.parroquiaSeleccionado.idLocalizacion==0){
        this.snack.open('Seleccione una localización del proyecto !!','Aceptar',{
          duration : 3000
        });
      }else{
        let aux=true;
        for (const ubicacion of this.listalocalizacion) {
          if(ubicacion.idLocalizacion==this.parroquiaSeleccionado.idLocalizacion){
            aux=false;
          }
        }
        if(aux==true){
          this.listalocalizacion.push({
            idLocalizacion:this.parroquiaSeleccionado.idLocalizacion,
            codigoPais: this.paisSeleccionado.codigoPais,
            nombrePais:this.paisSeleccionado.nombrePais,
            codigoProvincia: this.provinciaSeleccionado.codigoProvincia,
            nombreProvincia: this.provinciaSeleccionado.nombreProvincia,
            codigoCanton: this.cantonSeleccionado.codigoCanton,
            nombreCanton:this.cantonSeleccionado.nombreCanton,
            codigoParroquia: this.parroquiaSeleccionado.codigoParroquia,
            nombreParroquia:this.parroquiaSeleccionado.nombreParroquia,
            });
        }else{
          this.snack.open('La localización ya se encuentra asignada !!','Aceptar',{
            duration : 3000
          });
        }
      }
    }
  
    eliminarLocalizaciones(index: number) {
      this.listalocalizacion.splice(index, 1);
    }



  listarEstadoProyectoInvestigacion(){
    
      this.estadoProyectoInvestigacionService.listarEstadoProyectoInvestigacion().subscribe(
          res=>{
            this.estadoProyectoInvestigacion=res;
          },
          err=>console.log(err)
        )
  }

  

    listaTipoProyecto : any = []

    listarTipoProyecto()
    {
      this.tipoProyectoService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaTipoProyecto=res;
          },
          err=>console.log(err)
        )
    }

    listaTipoInvestigacion : any = []

    listarTipoInvestigacion()
    {
      this.tipoInvestigacionService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaTipoInvestigacion=res;
          },
          err=>console.log(err)
        )
    }

    listaSectorImpacto : any = []

    listarSectorImpacto()
    {
      this.sectorImpactoService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaSectorImpacto=res;
            this.dataSource2.data = res;
            this.listaDatos2 = res.map((SectorImpacto: any) => ({ ...SectorImpacto, checked: false }));
          },
          err=>console.log(err)
        )
    }

    listaDatosVigentes : any = []

    listarAreasInvestigacionDisponibles(){
      this.areasInvestigacionService.obtenerAreasInvestigacionVigentes().subscribe(
        (dato:any) => {
          console.log(dato);
          this.listaDatosVigentes = dato;
          this.dataSource1.data = dato;
          this.listaDatos1 = dato.map((variable: any) => ({ ...variable, checked: false }));
        },
        (error) => {
          console.log(error);
        }
      )
    }

    listaLineaInvestigacion: any = []

    listarLineasInvestigacion()
    {
      this.lineaInvestigacionService.listarVigentes().subscribe(
          (res:any)=>{
            this.listaLineaInvestigacion=res;
            this.dataSource3.data = res;
            this.listaDatos3 = res.map((LineaInvestigacion: any) => ({ ...LineaInvestigacion, checked: false }));
          },
          err=>console.log(err)
        )
    }

    formSubmit(){
    
    if(this.proyectoInvestigacion.nombreProyecto.trim() == '' || this.proyectoInvestigacion.nombreProyecto == null){
      this.snack.open("El nombre del proyecto es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.proyectoInvestigacion.descripcion.trim() == '' || this.proyectoInvestigacion.descripcion == null){
      this.snack.open("La descripción es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.proyectoInvestigacion.fechaInicio == null){
      this.snack.open("La fecha de inico es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.proyectoInvestigacion.fechaFin == null){
      this.snack.open("La fecha de fin es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.proyectoInvestigacion.estadoProyectoInvestigacion.idEstadoProyecto == 0){
      this.snack.open("El estado del proyecto de investigacion es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.proyectoInvestigacion.tipoInvestigacion.idTipoInvestigacion == 0){
      this.snack.open("El tipo de investigación es requerido !!",'',{
        duration:3000
      })
      return ;
    }

    if(this.proyectoInvestigacion.tipoProyecto.idTipoProyecto == 0){
      this.snack.open("El tipo de proyecto es requerido !!",'',{
        duration:3000
      })
      return ;
    }

    if (this.listaDatosSeleccionados1.length === 0) {
      this.snack.open('Aun no ha seleccionado ningun área de investigación !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.listaDatosSeleccionados2.length === 0) {
      this.snack.open('Aun no ha seleccionado ningun sector de impacto!!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.listaDatosSeleccionados3.length === 0) {
      this.snack.open('Aun no ha seleccionado ningun línea de investigación !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.listalocalizacion.length === 0) {
      this.snack.open('Aun no ha seleccionado ningun localización !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    
//    this.proyectoInvestigacion.usuario.idUsuario=this.idUsuario;

    this.usuarioDirector.idUsuario=this.idUsuario;

    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.proyectoInvestigacion));
    formData.append('usuarioDirector', JSON.stringify(this.usuarioDirector));
    formData.append('listaAreaInvestigacion', JSON.stringify(this.listaDatosSeleccionados1));
    formData.append('listaSectorImpacto', JSON.stringify(this.listaDatosSeleccionados2));
    formData.append('listaLineaInvestigacion', JSON.stringify(this.listaDatosSeleccionados3));
    formData.append('listaLocalizacion', JSON.stringify(this.listalocalizacion));

    this.investigacionService.añadirInvestigacion(formData).subscribe(
      (dato:any) => {
        this.proyectoInvestigacion.nombreProyecto = '';
        this.proyectoInvestigacion.descripcion = '';
        this.proyectoInvestigacion.fechaInicio = new Date(0);
        this.proyectoInvestigacion.fechaFin = new Date(0);
        Swal.fire('Información guardada ','El proyecto ha sido agregado con éxito','success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/director-dashboard/view-proyecto-investigacion/'+this.idUsuario]);
          }
        });
        
      },
      (error) => {
        console.log(error);
        Swal.fire('Error en el sistema !!','Error al agregar el proyecto','error')
      }
    )
  }


  //areas investigacion:

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns1: string[] = ['select', 'nombreAreaInvestigacion'];
  dataSource1 = new MatTableDataSource<Variable>();
  selection1 = new SelectionModel<Variable>(true, []);
  listaDatos1: Variable[] = [];
  listaDatosSeleccionados1: Variable[] = [];
  toggleRow1(row: Variable) {
    this.selection1.toggle(row);
  }

  checkboxLabel1(row?: Variable): string {
    if (!row) {
      return `${this.isAllSelected1() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection1.isSelected(row) ? 'deselect' : 'select'} row ${row.idAreaInvestigacion}`;
  }

  isAllSelected1() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.dataSource1.data.length;
    this.listaDatosSeleccionados1 = this.selection1.selected;
    return numSelected === numRows;
  }

  toggleAllRows1() {
    if (this.isAllSelected1()) {
      this.selection1.clear();
      return;
    }
    this.listaDatosSeleccionados1 = this.selection1.selected;
    this.dataSource1.data.forEach((row) => this.selection1.select(row));
  }


  //sector impacto

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns2: string[] = ['select', 'nombreSectorImpacto'];
  dataSource2 = new MatTableDataSource<SectorImpacto>();
  selection2 = new SelectionModel<SectorImpacto>(true, []);
  listaDatos2: SectorImpacto[] = [];
  listaDatosSeleccionados2: SectorImpacto[] = [];
  toggleRow2(row: SectorImpacto) {
    this.selection2.toggle(row);
  }

  checkboxLabel2(row?: SectorImpacto): string {
    if (!row) {
      return `${this.isAllSelected2() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection2.isSelected(row) ? 'deselect' : 'select'} row ${row.idSectorImpacto}`;
  }

  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.dataSource2.data.length;
    this.listaDatosSeleccionados2 = this.selection2.selected;
    return numSelected === numRows;
  }

  toggleAllRows2() {
    if (this.isAllSelected2()) {
      this.selection2.clear();
      return;
    }
    this.listaDatosSeleccionados2 = this.selection2.selected;
    this.dataSource2.data.forEach((row) => this.selection2.select(row));
  }
  

  //liena investigacion

  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns3: string[] = ['select', 'nombreLineaInvestigacion'];
  dataSource3 = new MatTableDataSource<LineaInvestigacion>();
  selection3 = new SelectionModel<LineaInvestigacion>(true, []);
  listaDatos3: LineaInvestigacion[] = [];
  listaDatosSeleccionados3: LineaInvestigacion[] = [];
  toggleRow3(row: LineaInvestigacion) {
    this.selection3.toggle(row);
  }

  checkboxLabel3(row?: LineaInvestigacion): string {
    if (!row) {
      return `${this.isAllSelected3() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection3.isSelected(row) ? 'deselect' : 'select'} row ${row.idLineaInvestigacion}`;
  }

  isAllSelected3() {
    const numSelected = this.selection3.selected.length;
    const numRows = this.dataSource3.data.length;
    this.listaDatosSeleccionados3 = this.selection3.selected;
    return numSelected === numRows;
  }

  toggleAllRows3() {
    if (this.isAllSelected3()) {
      this.selection3.clear();
      return;
    }
    this.listaDatosSeleccionados3 = this.selection3.selected;
    this.dataSource3.data.forEach((row) => this.selection3.select(row));
  }

}

export interface Variable {
  idAreaInvestigacion:0;
  nombreAreaInvestigacion:'';
  checked: boolean;
}

export interface SectorImpacto {
  idSectorImpacto:0;
  nombreSectorImpacto:'';
  checked: boolean;
}

export interface LineaInvestigacion {
  idLineaInvestigacion:0;
  nombreLineaInvestigacion:'';
  checked: boolean;
}