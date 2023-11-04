import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { EstadoProyectoInvestigacionService } from 'src/app/services/estado-proyecto-investigacion.service';
import { LoginService } from 'src/app/services/login.service';
import { EventEmitter } from 'stream';
import { AnyARecord } from 'dns';
import { TipoInvestigacionService } from 'src/app/services/tipo-investigacion.service';
import { TipoProyectoService } from 'src/app/services/tipo-proyecto.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { LocalizacionProyectoService } from 'src/app/services/localizacion-proyecto.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { SectorImpactoService } from 'src/app/services/sector-impacto.service';
import { LineaInvestigacionService } from 'src/app/services/linea-investigacion.service';
import { AreasInvestigacionService } from 'src/app/services/areas-investigacion.service';
import { LineaInvestigacionProyectoService } from 'src/app/services/linea-investigacion-proyecto.service';
import { AreaInvestigacionProyectoService } from 'src/app/services/area-investigacion-proyecto.service';
import { SectorImpactoProyectoService } from 'src/app/services/sector-impacto-proyecto.service';


interface EstadoProyecto {
  idEstadoProyecto: number;
  nombreEstadoProyecto: string;
}


@Component({
  selector: 'app-view-proyecto-investigacion',
  templateUrl: './view-proyecto-investigacion.component.html',
  styleUrls: ['./view-proyecto-investigacion.component.css']
})
export class ViewProyectoInvestigacionComponent implements OnInit {

  proyectoInvestigacio: any = []
  proyectoInvestigacioEliminados: any = []
  estadoProyectoInvestigacion: any = [];

  constructor(private investigacionService: InvestigacionService,
    private estadoProyectoInvestigacionService: EstadoProyectoInvestigacionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private investigacionInvestigadoresService: InvestigacionInvestigadoresService
  ) { }

  idUsuario = 0;
  rol = '';
  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
    this.listarProyectosVigentes();
    this.listarProyectosEliminados();
    this.listarEstadoProyectoInvestigacion();
  }

  listarProyectosVigentes() {
    this.investigacionInvestigadoresService.obtenerProyectoVigentesDirector(this.idUsuario).subscribe(
      (dato: any) => {
        this.proyectoInvestigacio = dato;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  listarProyectosEliminados() {
    this.investigacionInvestigadoresService.obtenerProyectoEliminadosDirector(this.idUsuario).subscribe(
      (dato: any) => {
        this.proyectoInvestigacioEliminados = dato;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  listarEstadoProyectoInvestigacion() {

    this.estadoProyectoInvestigacionService.listarEstadoProyectoInvestigacion().subscribe(
      res => {
        this.estadoProyectoInvestigacion = res;
        this.estadoProyectoInvestigacion.unshift({ idEstadoProyecto: 0, nombreEstadoProyecto: 'Todos' });
        this.estadoProyectoInvestigacion.idEstadoProyecto = 0;
      },
      err => console.log(err)
    )
  }


  public searchEstado: string = '';
  opcionSeleccionada: any;
  onEstadoProyectoChange(event: any): void {
    this.opcionSeleccionada = this.estadoProyectoInvestigacion.find((option: EstadoProyecto) => option.idEstadoProyecto === event.value);
    if (this.opcionSeleccionada.idEstadoProyecto == 0) {
      this.searchEstado = "";
    } else {
      this.searchEstado = this.opcionSeleccionada.nombreEstadoProyecto;
    }
  }


  eliminarProyectoInvestigacion(idProyecto: any) {
    Swal.fire({
      title: 'Eliminar información',
      text: '¿Estás seguro de eliminar el proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.investigacionService.eliminarInvestigacion(idProyecto).subscribe(
          (data) => {
            this.proyectoInvestigacio = this.proyectoInvestigacio.filter((proyectoInvestigacio: any) => proyectoInvestigacio.idProyecto != idProyecto);
            Swal.fire('Información eliminada', 'El proyecto ha sido eliminado', 'success');
            this.listarProyectosEliminados();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el proyecto', 'error');
          }
        )
      }
    })
  }

  cambiarPublico(idProyecto: any) {
    Swal.fire({
      title: 'Publicar proyecto',
      text: '¿Estás seguro de publicar el proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Publicar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.investigacionService.cambioEstadoProyectoInvestigacion(idProyecto).subscribe(
          (data) => {
            Swal.fire('Proyecto público', 'El proyecto se encuentra público', 'success').then(() => {

              this.listarProyectosVigentes();
            });

          },
          (error) => {
            Swal.fire('Error', 'Error al publicar el proyecto', 'error');
          }
        )
      }
    })
  }

  cambiarPrivado(idProyecto: any) {
    Swal.fire({
      title: 'Volver privado el proyecto',
      text: '¿Estás seguro volver privado el proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Privado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.investigacionService.cambioEstadoProyectoInvestigacion(idProyecto).subscribe(
          (data) => {
            Swal.fire('Proyecto privado', 'El proyecto se encuentra privado', 'success');
            this.listarProyectosVigentes();
          },
          (error) => {
            Swal.fire('Error', 'Error al privar el proyecto', 'error');
          }
        )
      }
    })
  }

  restaurarProyectoInvestigacion(idProyecto: any) {
    Swal.fire({
      title: 'Restaurar información',
      text: '¿Estás seguro de restaurar el proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Restaurar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.investigacionService.restaurarInvestigacion(idProyecto).subscribe(
          (data) => {
            this.proyectoInvestigacioEliminados = this.proyectoInvestigacioEliminados.filter((proyectoInvestigacioEliminados: any) => proyectoInvestigacioEliminados.idProyecto != idProyecto);
            Swal.fire('Información restaurada', 'El proyecto ha sido restaurado', 'success');
            this.listarProyectosVigentes();
          },
          (error) => {
            Swal.fire('Error', 'Error al restaurar el proyecto', 'error');
          }
        )
      }
    })
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

  //abrir dialogo de investigadores en proyectos de investigacion
  openDialogInvestigadores(idProyecto: any, nombreProyecto: any): void {
    const dialogRef = this.dialog.open(ViewInvestigadoresProyectosInvestigacion, {
      data: { idProyecto: idProyecto, nombreProyecto: nombreProyecto, idUsuario: this.idUsuario },
    });
  }

  //abrir dialogo de investigadores en proyectos de investigacion eliminado
  openDialogInvestigadoresProyectoEliminado(idProyecto: any, nombreProyecto: any): void {
    const dialogRef = this.dialog.open(ViewInvestigadoresProyectosInvestigacionEliminado, {
      data: { idProyecto: idProyecto, nombreProyecto: nombreProyecto, idUsuario: this.idUsuario },
    });
  }

  //abrir dialogo de investigadores en proyectos de investigacion eliminado
  openDialogEditarProyecto(idProyecto: any, nombreProyecto: any, descripcion: any, fechaInicio: any, fechaFin: any, idEstadoProyecto: any, nombreEstadoProyecto: any, idTipoInvestigacion: any, nombreTipoInvestigacion: any, idTipoProyecto: any, nombreTipoProyecto: any): void {
    const dialogRef = this.dialog.open(EditarProyectoInvestigador, {
      data: {
        idProyecto: idProyecto, nombreProyecto: nombreProyecto, descripcion: descripcion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        idEstadoProyecto: idEstadoProyecto,
        nombreEstadoProyecto: nombreEstadoProyecto,
        idTipoInvestigacion: idTipoInvestigacion,
        nombreTipoInvestigacion: nombreTipoInvestigacion,
        idTipoProyecto: idTipoProyecto,
        nombreTipoProyecto: nombreTipoProyecto
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listarProyectosVigentes();
    });
  }
}

export interface DialogDataProyectoInvestigacion {
  idProyecto: 0,
  nombreProyecto: '',
  idUsuario: 0,
}


@Component({
  selector: 'view-investigadores-proyectos-investigacion',
  templateUrl: 'view-investigadores-proyectos-investigacion.html',
  styleUrls: ['./view-proyecto-investigacion.component.css']
})
export class ViewInvestigadoresProyectosInvestigacion {
  constructor(
    public dialogRef: MatDialogRef<ViewInvestigadoresProyectosInvestigacion>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProyectoInvestigacion,
    private snack: MatSnackBar,
    private investigacionService: InvestigacionService,
    private userService: UserService,
    private route: ActivatedRoute,
    private investigacionInvestigadoresService: InvestigacionInvestigadoresService,
    private investigadorInvestigacionService: InvestigacionInvestigadoresService,
    private loginService: LoginService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  listaUsuariosDisponibles: any = []
  idProyecto: any;
  nombreProyecto: any;
  grupoInvestigacion: any = [];

  grupoInvestigacionEliminar: any = {
    proyectoInvestigacion: {
      idProyecto: 0
    },
    usuario: {
      idUsuario: 0
    }
  }

  grupoInvestigacionGuardar: any = {
    proyectoInvestigacion: {
      idProyecto: 0
    },
    usuario: {
      idUsuario: 0
    }
  }


  ngOnInit(): void {

    this.idProyecto = this.data.idProyecto;
    this.nombreProyecto = this.data.nombreProyecto;
    this.grupoInvestigacionEliminar.proyectoInvestigacion.idProyecto = this.idProyecto;
    this.grupoInvestigacionGuardar.proyectoInvestigacion.idProyecto = this.idProyecto;
    this.listarAsignados();
    this.listarDisponibles();

  }

  listarAsignados() {
    this.investigacionInvestigadoresService.listarInvestigadoresEnProyectosInvestigacion(this.idProyecto).subscribe(
      (data: any) => {
        this.grupoInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  listarDisponibles() {
    this.userService.listarInvestigadorNoAsignados(this.idProyecto).subscribe(
      res => {
        this.listaUsuariosDisponibles = res;

      },
      err => console.log(err)
    )
  }

  eliminarInvestigador(idUsuario: any) {
    Swal.fire({
      title: 'Eliminar investigador del proyecto',
      text: '¿Estás seguro de eliminar al investigador del proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.grupoInvestigacionEliminar.usuario.idUsuario = idUsuario;
        this.investigacionInvestigadoresService.eliminarInvestigadorDeProyectoInvestigacion(this.grupoInvestigacionEliminar).subscribe(
          (data) => {
            
            Swal.fire('Investigador eliminado', 'Investigador eliminado del proyecto', 'success');
            this.grupoInvestigacion = this.grupoInvestigacion.filter((grupoInvestigacion: any) => grupoInvestigacion.usuario.idUsuario != idUsuario);
            this.listarDisponibles();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el investigador del proyecto', 'error');
          }
        )
      }
    })
  }

  asignarInvestigador(idUsuario: any) {
    Swal.fire({
      title: 'Agregar Investigador',
      text: '¿Estás seguro de agregar al investigador del proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoInvestigacionGuardar.usuario.idUsuario = idUsuario;
        //this.grupoInvestigacion.usuario['idUsuario'] = idUsuario;
        this.investigadorInvestigacionService.guardarGrupoDeInvestigacion(this.grupoInvestigacionGuardar).subscribe(
          (data) => {
            this.listaUsuariosDisponibles = this.listaUsuariosDisponibles.filter((listaUsuariosDisponibles: any) => listaUsuariosDisponibles.idUsuario != idUsuario);
            Swal.fire('Investigador Asignado', 'El investigador se ha asignado al proyecto', 'success');

            this.listarAsignados();
          },
          (error) => {
            Swal.fire('Error', 'Error al agregar el investigador al proyecto', 'error');
          }
        )
      }
    })
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


@Component({
  selector: 'view-investigadores-proyectos-investigacion-eliminado',
  templateUrl: 'view-investigadores-proyectos-investigacion-eliminado.html',
  styleUrls: ['./view-proyecto-investigacion.component.css']
})
export class ViewInvestigadoresProyectosInvestigacionEliminado {
  constructor(
    public dialogRef: MatDialogRef<ViewInvestigadoresProyectosInvestigacionEliminado>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProyectoInvestigacion,
    private snack: MatSnackBar,
    private investigacionService: InvestigacionService,
    private userService: UserService,
    private route: ActivatedRoute,
    private investigacionInvestigadoresService: InvestigacionInvestigadoresService,
    private investigadorInvestigacionService: InvestigacionInvestigadoresService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  idProyecto: any;
  nombreProyecto: any;
  grupoInvestigacion: any = [];

  grupoInvestigacionEliminar: any = {
    proyectoInvestigacion: {
      idProyecto: 0
    },
    usuario: {
      idUsuario: 0
    }
  }

  ngOnInit(): void {
    this.idProyecto = this.data.idProyecto;
    this.nombreProyecto = this.data.nombreProyecto;
    this.grupoInvestigacionEliminar.proyectoInvestigacion.idProyecto = this.idProyecto;
    this.listarAsignados();

  }

  listarAsignados() {
    this.investigacionInvestigadoresService.listarInvestigadoresEnProyectosInvestigacion(this.idProyecto).subscribe(
      (data: any) => {
        this.grupoInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  eliminarInvestigador(idUsuario: any) {
    Swal.fire({
      title: 'Eliminar investigador del proyecto',
      text: '¿Estás seguro de eliminar al investigador del proyecto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.grupoInvestigacionEliminar.usuario.idUsuario = idUsuario;
        this.investigacionInvestigadoresService.eliminarInvestigadorDeProyectoInvestigacion(this.grupoInvestigacionEliminar).subscribe(
          (data) => {
            Swal.fire('Investigador eliminado', 'Investigador eliminado del proyecto', 'success');
            this.grupoInvestigacion = this.grupoInvestigacion.filter((grupoInvestigacion: any) => grupoInvestigacion.usuario.idUsuario != idUsuario);

          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el investigador del proyecto', 'error');
          }
        )
      }
    })
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



export interface dataEditar {
  idProyecto: 0,
  nombreProyecto: '',
  descripcion: '',
  fechaInicio: null | any,
  fechaFin: null | any,
  idEstadoProyecto: 0,
  nombreEstadoProyecto: '',
  idTipoInvestigacion: 0,
  nombreTipoInvestigacion: '',
  idTipoProyecto: 0,
  nombreTipoProyecto: ''
}


@Component({
  selector: 'editar-proyecto-investigacion',
  templateUrl: 'editar-proyecto-investigacion.html',
  styleUrls: ['./view-proyecto-investigacion.component.css']
})

export class EditarProyectoInvestigador {
  constructor(
    public dialogRef: MatDialogRef<EditarProyectoInvestigador>,
    @Inject(MAT_DIALOG_DATA) public data1: dataEditar,
    private userService: UserService,
    private snack: MatSnackBar,
    private estadoProyectoInvestigacionService: EstadoProyectoInvestigacionService,
    private tipoInvestigacionService: TipoInvestigacionService,
    private tipoProyectoService: TipoProyectoService,
    private ubicacionService: UbicacionService,
    private localizacionProyectoService: LocalizacionProyectoService,
    private investigacionService: InvestigacionService,
    private sectorImpactoService:SectorImpactoService,
    private lineaInvestigacionService: LineaInvestigacionService,
    private areasInvestigacionService: AreasInvestigacionService,
    private lineaInvestigacionProyectoService: LineaInvestigacionProyectoService,
    private areaInvestigacionProyectoService: AreaInvestigacionProyectoService,
    private sectorImpactoProyectoService: SectorImpactoProyectoService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  estadoProyectoInvestigacion: any = [];
  listarEstadoProyectoInvestigacion() {
    this.estadoProyectoInvestigacionService.listarEstadoProyectoInvestigacion().subscribe(
      (res: any) => {
        this.estadoProyectoInvestigacion = res;
      },
      err => console.log(err)
    )
  }

  listaTipoInvestigacion: any = []

  listarTipoInvestigacion() {
    this.tipoInvestigacionService.listarVigentes().subscribe(
      (res: any) => {
        this.listaTipoInvestigacion = res;
      },
      err => console.log(err)
    )
  }

  listaTipoProyecto: any = []

  listarTipoProyecto() {
    this.tipoProyectoService.listarVigentes().subscribe(
      (res: any) => {
        this.listaTipoProyecto = res;
      },
      err => console.log(err)
    )
  }

  data: any = {
    idProyecto: 0,
    nombreProyecto: '',
    descripcion: '',
    fechaInicio: null as any,
    fechaFin: null as any,
    estadoProyectoInvestigacion: {
      idEstadoProyecto: 0,
      nombreEstadoProyecto: '',
    },
    tipoInvestigacion: {
      idTipoInvestigacion: 0,
      nombreTipoInvestigacion: '',
    },
    tipoProyecto: {
      idTipoProyecto: 0,
      nombreTipoProyecto: '',
    }
  }

  localizacionProyecto: any = {
    proyectoInvestigacion: {
      idProyecto: 0
    },
    localizacion: {
      idLocalizacion: 0
    }
  }

  ngOnInit(): void {

    

    this.listarEstadoProyectoInvestigacion();
    this.listarTipoInvestigacion();
    this.listarTipoProyecto();
    this.listarPaises();
    this.listarLocalizacionRegistradas();
    this.listarLineasInvestigacion();
    this.listarAreasInvestigacionDisponibles();
    this.listarSectorImpacto();
    
    this.data.idProyecto = this.data1.idProyecto
    this.data.nombreProyecto = this.data1.nombreProyecto
    this.data.descripcion = this.data1.descripcion
    this.data.fechaInicio = new Date(this.data1.fechaInicio).toISOString().substring(0, 10);
    this.data.fechaFin = new Date(this.data1.fechaFin).toISOString().substring(0, 10);
    this.data.estadoProyectoInvestigacion.idEstadoProyecto = this.data1.idEstadoProyecto
    this.data.estadoProyectoInvestigacion.nombreEstadoProyecto = this.data1.nombreEstadoProyecto
    this.data.tipoInvestigacion.idTipoInvestigacion = this.data1.idTipoInvestigacion
    this.data.tipoInvestigacion.nombreTipoInvestigacion = this.data1.nombreTipoInvestigacion
    this.data.tipoProyecto.idTipoProyecto = this.data1.idTipoProyecto
    this.data.tipoProyecto.nombreTipoProyecto = this.data1.nombreTipoProyecto

  }

  //----------------------------------------------------
  //Agrgegar listar ubicaciones
  public paisSeleccionado = {
    codigoPais: '',
    nombrePais: '',
  }

  public provinciaSeleccionado = {
    codigoProvincia: '',
    nombreProvincia: '',
  }

  public cantonSeleccionado = {
    codigoCanton: '',
    nombreCanton: '',
  }

  public parroquiaSeleccionado = {
    idLocalizacion: 0,
    codigoParroquia: '',
    nombreParroquia: '',
  }

  usuarioDirector = {
    idUsuario: 0
  }

  listaPaises: any = []
  listaProvincias: any = []
  listaCantones: any = []
  listaParroquias: any = []

  listarPaises() {
    this.ubicacionService.obtenerPaises().subscribe(
      (res: any) => {
        this.listaPaises = res;
        this.listaProvincias = [];
        this.listaCantones = [];
        this.listaParroquias = [];
        this.provinciaSeleccionado.codigoProvincia = "";
      },
      err => console.log(err)
    )
  }

  listarProvincias() {
    this.listaCantones = []
    this.listaParroquias = []
    this.ubicacionService.obtenerProvincias(this.paisSeleccionado.codigoPais).subscribe(
      (res: any) => {
        this.listaProvincias = res
        this.listaCantones = []
        this.listaParroquias = []
        this.cantonSeleccionado.codigoCanton = '';
        this.parroquiaSeleccionado.idLocalizacion = 0;
      },
      err => console.log(err)
    )
  }

  listarCantones() {
    this.listaParroquias = []
    this.ubicacionService.obtenerCantones(this.paisSeleccionado.codigoPais, this.provinciaSeleccionado.codigoProvincia).subscribe(
      (res: any) => {
        this.listaCantones = res;
        this.listaParroquias = []
        this.parroquiaSeleccionado.idLocalizacion = 0;
      },
      err => console.log(err)
    )
  }

  listarParroquias() {
    this.ubicacionService.obtenerParroquias(this.paisSeleccionado.codigoPais, this.provinciaSeleccionado.codigoProvincia, this.cantonSeleccionado.codigoCanton).subscribe(
      (res: any) => {
        this.listaParroquias = res;
      },
      err => console.log(err)
    )
  }

  listarLocalizacionRegistradas() {
    this.localizacionProyectoService.listarPorProyecto(this.data1.idProyecto).subscribe(
      (res: any) => {
        this.listalocalizacion = [];
        for (const item of res) {
          this.listalocalizacion.push(item.localizacion);
        }
      },
      err => console.log(err)
    );
  }

  listalocalizacion: any[] = [];
  localizacion = {
    idLocalizacion: 0,
    codigoPais: '',
    nombrePais: '',
    codigoProvincia: '',
    nombreProvincia: '',
    codigoCanton: '',
    nombreCanton: '',
    codigoParroquia: '',
    nombreParroquia: '',
  };

  agregarLocalizacion() {
    if (this.parroquiaSeleccionado.idLocalizacion == 0) {
      this.snack.open('Seleccione una localización del proyecto !!', 'Aceptar', {
        duration: 3000
      });
    } else {
      let aux = true;
      for (const ubicacion of this.listalocalizacion) {
        if (ubicacion.idLocalizacion == this.parroquiaSeleccionado.idLocalizacion) {
          aux = false;
        }
      }
      if (aux == true) {
        this.localizacionProyecto.proyectoInvestigacion.idProyecto = this.data1.idProyecto;
        this.localizacionProyecto.localizacion.idLocalizacion = this.parroquiaSeleccionado.idLocalizacion;
        this.localizacionProyectoService.guardar(this.localizacionProyecto).subscribe(
          (data) => {
            Swal.fire('Localización agregada', 'La localización se agrego con éxito', 'success').then(
              (e) => {
                this.listarLocalizacionRegistradas();
              })
          }, (error) => {
            Swal.fire('Error en el sistema', 'No se agrego la localizacion', 'error');
            console.log(error);
          }
        );
      } else {
        this.snack.open('La localizacion ya se encuentra registrada !!', 'Aceptar', {
          duration: 3000
        });
      }
    }
  }

  eliminarLocalizacionProyecto(id: any) {
    Swal.fire({
      title: 'Eliminar localización',
      text: '¿Estás seguro de eliminar la localización?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.localizacionProyectoService.eliminar(this.data1.idProyecto, id).subscribe(
          (data) => {
            Swal.fire('Localización eliminada', 'La localización ha sido eliminado', 'success');
            this.listarLocalizacionRegistradas();
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la localización', 'error');
          }
        )
      }
    })
  }


  //----------------------------------------------------

  actualizarProyecto() {

    if (this.data.nombreProyecto.trim() == '' || this.data.nombreProyecto == null) {
      this.snack.open("El nombre del proyecto es requerida !!", '', {
        duration: 3000
      })
      return;
    }
    if (this.data.descripcion.trim() == '' || this.data.descripcion == null) {
      this.snack.open("La descripción es requerido !!", '', {
        duration: 3000
      })
      return;
    }
    if (this.data.fechaInicio == null) {
      this.snack.open("La fecha de inico es requerida !!", '', {
        duration: 3000
      })
      return;
    }
    if (this.data.fechaFin == null) {
      this.snack.open("La fecha de fin es requerida !!", '', {
        duration: 3000
      })
      return;
    }

    if(this.data.estadoProyectoInvestigacion.idEstadoProyecto == 0){
      this.snack.open("El estado del proyecto de investigacion es requerido !!",'',{
        duration:3000
      })
      return ;
    }
    if(this.data.tipoInvestigacion.idTipoInvestigacion == 0){
      this.snack.open("El tipo de investigación es requerido !!",'',{
        duration:3000
      })
      return ;
    }

    if(this.data.tipoProyecto.idTipoProyecto == 0){
      this.snack.open("El tipo de proyecto es requerido !!",'',{
        duration:3000
      })
      return ;
    }



    this.investigacionService.actualizarInvestigacion(this.data).subscribe(
      (dato: any) => {
        Swal.fire('Proyecto actualizado', 'El proyecto ha sido actualizada con éxito', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al actualizar el proyecto', 'error')
      }
    )
  }


  //-------------------------------------------------------------
  //Seleccionables de informacion extra

  //areas investigacion:

  listaDatosVigentes : any = []

  listarAreasInvestigacionDisponibles(){
    this.areasInvestigacionService.obtenerAreasInvestigacionVigentes().subscribe(
      (dato:any) => {
        this.listaDatosVigentes = dato;
        this.dataSource1.data = dato;
        this.listaDatos1 = dato.map((variable: any) => ({ ...variable, checked: false }));
        this.listarAreasInvestigacionRegistradas();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  listarAreasInvestigacionRegistradas() {
    this.areaInvestigacionProyectoService.listarPorProyecto(this.data1.idProyecto).subscribe(
      (res: any) => {
        this.selection1.clear();
        for (const item of res) {
          const foundItem = this.dataSource1.data.find(row => row.idAreaInvestigacion === item.idAreaInvestigacion);
          if (foundItem) {
            this.selection1.select(foundItem);
          }
        }
      },
      err => console.log(err)
    );
  }

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

  listaSectorImpacto : any = []

  listarSectorImpacto()
  {
    this.sectorImpactoService.listarVigentes().subscribe(
        (res:any)=>{
          this.listaSectorImpacto=res;
          this.dataSource2.data = res;
          this.listaDatos2 = res.map((SectorImpacto: any) => ({ ...SectorImpacto, checked: false }));
          this.listarSectorImpactoRegistradas();
        },
        err=>console.log(err)
      )
  }

  listarSectorImpactoRegistradas() {
    this.sectorImpactoProyectoService.listarPorProyecto(this.data1.idProyecto).subscribe(
      (res: any) => {
        this.selection2.clear();
        for (const item of res) {
          const foundItem = this.dataSource2.data.find(row => row.idSectorImpacto === item.idSectorImpacto);
          if (foundItem) {
            this.selection2.select(foundItem);
          }
        }
      },
      err => console.log(err)
    );
  }

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


  listaLineaInvestigacion: any = []

  listarLineasInvestigacion()
  {
    this.lineaInvestigacionService.listarVigentes().subscribe(
        (res:any)=>{
          this.listaLineaInvestigacion=res;
          this.dataSource3.data = res;
          this.listaDatos3 = res.map((LineaInvestigacion: any) => ({ ...LineaInvestigacion, checked: false }));
          this.listarLienasInvestigacionRegistradas();
        },
        err=>console.log(err)
      )
  }
  
  listarLienasInvestigacionRegistradas() {
    this.lineaInvestigacionProyectoService.listarPorProyecto(this.data1.idProyecto).subscribe(
      (res: any) => {
        this.selection3.clear();
        for (const item of res) {
          const foundItem = this.dataSource3.data.find(row => row.idLineaInvestigacion === item.idLineaInvestigacion);
          if (foundItem) {
            this.selection3.select(foundItem);
          }
        }
      },
      err => console.log(err)
    );
  }

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


  //actualizar seleccionados:

  actualizarInformacionAdicional(){

    const formData = new FormData();
    formData.append('proyectoInvestigacion', JSON.stringify(this.data));
    formData.append('listaAreaInvestigacion', JSON.stringify(this.listaDatosSeleccionados1));
    formData.append('listaSectorImpacto', JSON.stringify(this.listaDatosSeleccionados2));
    formData.append('listaLineaInvestigacion', JSON.stringify(this.listaDatosSeleccionados3));

    this.investigacionService.actualizarInformacionAdicional(formData).subscribe(
      (dato:any) => {
        Swal.fire('Información adicional actualizada','La información adicional se actualizo con éxito','success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al actualizar la información adicional','error')
      }
    )
  }

  //---------------------------------------------------------------------------------
}


export interface Variable {
  idAreaInvestigacion: 0;
  nombreAreaInvestigacion: '';
  checked: boolean;
}

export interface SectorImpacto {
  idSectorImpacto: 0;
  nombreSectorImpacto: '';
  checked: boolean;
}

export interface LineaInvestigacion {
  idLineaInvestigacion: 0;
  nombreLineaInvestigacion: '';
  checked: boolean;
}


