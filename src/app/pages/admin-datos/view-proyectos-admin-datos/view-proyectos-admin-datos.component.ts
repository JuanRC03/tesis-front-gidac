import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AreaInvestigacionProyectoService } from 'src/app/services/area-investigacion-proyecto.service';
import { EstadoProyectoInvestigacionService } from 'src/app/services/estado-proyecto-investigacion.service';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { InvestigacionService } from 'src/app/services/investigacion.service';
import { LineaInvestigacionProyectoService } from 'src/app/services/linea-investigacion-proyecto.service';
import { LocalizacionProyectoService } from 'src/app/services/localizacion-proyecto.service';
import { SectorImpactoProyectoService } from 'src/app/services/sector-impacto-proyecto.service';
import Swal from 'sweetalert2';

interface EstadoProyecto {
  idEstadoProyecto: number;
  nombreEstadoProyecto: string;
}

@Component({
  selector: 'app-view-proyectos-admin-datos',
  templateUrl: './view-proyectos-admin-datos.component.html',
  styleUrls: ['./view-proyectos-admin-datos.component.css']
})
export class ViewProyectosAdminDatosComponent implements OnInit {

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
    this.listarProyectosVigentes();
    this.listarProyectosEliminados();
    this.listarEstadoProyectoInvestigacion();
  }

  listarProyectosVigentes() {
    this.investigacionService.obtenerProyectoVigentesTrue().subscribe(
      (dato: any) => {
        console.log(dato);
        this.proyectoInvestigacio = dato;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  listarProyectosEliminados() {
    this.investigacionService.obtenerProyectoVigentesFalse().subscribe(
      (dato: any) => {
        console.log(dato);
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
        console.log(res);
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

  page_number1: number = 1
    handlePage1(e: PageEvent) {
      this.page_size = e.pageSize
      this.page_number1 = e.pageIndex + 1
    }

  public search: string = '';

  onSearch(search: string) {
    this.search = search;
  }

  //abrir el dialogo informacion
  openDialogInformacion(idProyecto: any): void {
    const dialogRef = this.dialog.open(ViewInformacionProyectoInvestigacionAdminDatos, {
      data: { idProyectoInvestigacion: idProyecto },
    });
  }

}

export interface DialogDataProyectoInvestigacion {
  idProyecto: 0,
  nombreProyecto: '',
  idUsuario: 0,
}


export interface DialogDataInformacionproyectoInvestigacion {
  idProyectoInvestigacion: '';
}

@Component({
  selector: 'view-informacion-proyecto-investigacion-admin-datos',
  templateUrl: 'view-informacion-proyecto-investigacion-admin-datos.html',
  styleUrls: ['./view-proyectos-admin-datos.component.css']
})

export class ViewInformacionProyectoInvestigacionAdminDatos {
  constructor(
    public dialogRef: MatDialogRef<ViewInformacionProyectoInvestigacionAdminDatos>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataInformacionproyectoInvestigacion,
    private investigacionInvestigadoresService: InvestigacionInvestigadoresService,
    private investigacionService: InvestigacionService,
    private sectorImpactoProyectoService: SectorImpactoProyectoService,
    private localizacionProyectoService: LocalizacionProyectoService,
    private lineaInvestigacionProyectoService: LineaInvestigacionProyectoService,
    private areaInvestigacionProyectoService: AreaInvestigacionProyectoService,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  informacionProyectoInvestigacion: any;
  grupoInvestigacion: any = [];
  informacionDirector: any = [];
  informacionImpacto: any = [];
  informacionAreaInvestigacion: any = [];
  informacionUbicacion: any = [];
  informacionLinea: any = [];

  ngOnInit(): void {

    this.investigacionService.obtenerProyectoInvestigacion(this.data.idProyectoInvestigacion).subscribe(
      (dato: any) => {
        this.informacionProyectoInvestigacion = this.transformarFechas(dato);
      }
    )
    this.investigacionInvestigadoresService.listarInvestigadoresEnProyectosInvestigacion(this.data.idProyectoInvestigacion).subscribe(
      (data: any) => {
        this.grupoInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
    this.investigacionInvestigadoresService.obtenerDirectorProyecto(this.data.idProyectoInvestigacion).subscribe(
      (data: any) => {
        this.informacionDirector = data;
      },
      (error) => {
        console.log(error);
      }
    )

    this.sectorImpactoProyectoService.listarPorProyecto(this.data.idProyectoInvestigacion).subscribe(
      (data: any) => {
        this.informacionImpacto = data;
      },
      (error) => {
        console.log(error);
      }
    )
    this.localizacionProyectoService.listarPorProyecto(this.data.idProyectoInvestigacion).subscribe(
      (data: any) => {
        this.informacionUbicacion = data;
      },
      (error) => {
        console.log(error);
      }
    )

    this.areaInvestigacionProyectoService.listarPorProyecto(this.data.idProyectoInvestigacion).subscribe(
      (data: any) => {
        this.informacionAreaInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )

    this.lineaInvestigacionProyectoService.listarPorProyecto(this.data.idProyectoInvestigacion).subscribe(
      (data: any) => {
        this.informacionLinea = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  transformarFechas(data: any): any {
    const fechaInicioCompleta = data.fechaInicio;
    const fechaFinCompleta = data.fechaFin;
    const fechaInicioObj = new Date(fechaInicioCompleta);
    const fechaFinObj = new Date(fechaFinCompleta);
    const fechaInicioFormateada = this.formatoFecha(fechaInicioObj);
    const fechaFinFormateada = this.formatoFecha(fechaFinObj);

    // Devolver un nuevo objeto con las fechas formateadas y el resto de la estructura de datos sin cambios
    return { ...data, fechaInicio: fechaInicioFormateada, fechaFin: fechaFinFormateada };
  }

  formatoFecha(fecha: Date): string {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();

    return `${dia}/${mes}/${anio}`;
  }

}
