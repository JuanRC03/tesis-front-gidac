import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular material
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule} from '@angular/material/tree';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { NgxUiLoaderModule , NgxUiLoaderHttpModule } from "ngx-ui-loader";
import {MatChipsModule} from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';

//Usuario comun
import { HomeComponent } from './pages/home/home.component';
import { autenticacion } from './pages/home/home.component';
import { ResetPassword } from './pages/home/home.component';
import { ViewProyectosHome } from './pages/home/home.component';
import { ViewCatalogoHome } from './pages/home/home.component';
import { ViewInformacionHome } from './pages/home/home.component';
import { ViewExplorarHome } from './pages/home/home.component';
import { DialogSolicitudAcceso } from './pages/home/home.component';
import { ViewInformacionProyectoInvestigacion } from './pages/home/home.component';

//Administrador
import { DialogAddPais } from './pages/admin/view-pais-admin/view-pais-admin.component';
import { DialogEditarPais } from './pages/admin/view-pais-admin/view-pais-admin.component';
import { DialogAddProvincia } from './pages/admin/view-provincia-admin/view-provincia-admin.component';
import { DialogEditarProvincia } from './pages/admin/view-provincia-admin/view-provincia-admin.component';
import { DialogAddCanton } from './pages/admin/view-canton-admin/view-canton-admin.component';
import { DialogEditarCanton } from './pages/admin/view-canton-admin/view-canton-admin.component';
import { DialogAddParroquia } from './pages/admin/view-parroquia-admin/view-parroquia-admin.component';
import { DialogEditarParroquia } from './pages/admin/view-parroquia-admin/view-parroquia-admin.component';
import { SideComponent } from './pages/admin/side/side.component';
import { ActualizarPerfilComponent } from './pages/admin/actualizar-perfil/actualizar-perfil.component';
import { DashAdminComponent } from './pages/admin/dash-admin/dash-admin.component';
import { ActualizarInformacionWebComponent } from './pages/admin/actualizar-informacion-web/actualizar-informacion-web.component';
import { AddAdministradorComponent } from './pages/admin/add-administrador/add-administrador.component';
import { AddDirectorComponent } from './pages/admin/add-director/add-director.component';
import { ViewAdministradorComponent } from './pages/admin/view-administrador/view-administrador.component';
import { ViewDirectorComponent } from './pages/admin/view-director/view-director.component';
import { DialogEditarEquivalencia } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { ViewInformacionWebComponent } from './pages/admin/view-informacion-web/view-informacion-web.component';
import { ViewAppWebIformacion } from './pages/admin/view-informacion-web/view-informacion-web.component';
import { ViewAccesoComponent } from './pages/admin/view-acceso/view-acceso.component';
import { ViewProvinciaAdminComponent } from './pages/admin/view-provincia-admin/view-provincia-admin.component';
import { ViewCantonAdminComponent } from './pages/admin/view-canton-admin/view-canton-admin.component';
import { ViewParroquiaAdminComponent } from './pages/admin/view-parroquia-admin/view-parroquia-admin.component';
import { ViewPaisAdminComponent } from './pages/admin/view-pais-admin/view-pais-admin.component';
import { ViewSectorImpactoAdminComponent } from './pages/admin/view-sector-impacto-admin/view-sector-impacto-admin.component';
import { ViewTipoInvestigacionAdminComponent } from './pages/admin/view-tipo-investigacion-admin/view-tipo-investigacion-admin.component';
import { ViewTipoProyectoAdminComponent } from './pages/admin/view-tipo-proyecto-admin/view-tipo-proyecto-admin.component';
import { ViewLineaInvestigacionAdminComponent } from './pages/admin/view-linea-investigacion-admin/view-linea-investigacion-admin.component';
import { ViewAreaInvestigacionesAdminComponent } from './pages/admin/view-area-investigaciones-admin/view-area-investigaciones-admin.component';
import { ViewCatalogoOrganizacionAdminComponent } from './pages/admin/view-catalogo-organizacion-admin/view-catalogo-organizacion-admin.component';
import { ViewOrganizacionAdminComponent } from './pages/admin/view-organizacion-admin/view-organizacion-admin.component';
import { DialogAddOrganizacionAdmin } from './pages/admin/view-organizacion-admin/view-organizacion-admin.component';
import { DialogActualizarOrganizacionAdmin } from './pages/admin/view-organizacion-admin/view-organizacion-admin.component';
import { DialogAddTipoProyectoAdmin } from './pages/admin/view-tipo-proyecto-admin/view-tipo-proyecto-admin.component';
import { DialogActualizarTipoProyectoAdmin } from './pages/admin/view-tipo-proyecto-admin/view-tipo-proyecto-admin.component';
import { DialogAddTipoInvestigacionAdmin } from './pages/admin/view-tipo-investigacion-admin/view-tipo-investigacion-admin.component';
import { DialogActualizarTipoInvestigacionAdmin } from './pages/admin/view-tipo-investigacion-admin/view-tipo-investigacion-admin.component';
import { DialogActualizarSectorImpactoAdmin } from './pages/admin/view-sector-impacto-admin/view-sector-impacto-admin.component';
import { DialogAddSectorImpactoAdmin } from './pages/admin/view-sector-impacto-admin/view-sector-impacto-admin.component';
import { DialogActualizarLineaInvestigacionAdmin } from './pages/admin/view-linea-investigacion-admin/view-linea-investigacion-admin.component';
import { DialogAddLineaInvestigacionAdmin } from './pages/admin/view-linea-investigacion-admin/view-linea-investigacion-admin.component';
import { DialogAddAreaInvestigacionAdmin } from './pages/admin/view-area-investigaciones-admin/view-area-investigaciones-admin.component';
import { DialogActualizarAreaInvestigacionAdmin } from './pages/admin/view-area-investigaciones-admin/view-area-investigaciones-admin.component';
import { ViewFamiliaAdminComponent } from './pages/admin/view-familia-admin/view-familia-admin.component';
import { DialogActualizarFamiliaAdmin } from './pages/admin/view-familia-admin/view-familia-admin.component';
import { DialogAddFamiliaAdmin } from './pages/admin/view-familia-admin/view-familia-admin.component';
import { ImportarCatalogoOrganizacionComponent } from './pages/admin/importar-catalogo-organizacion/importar-catalogo-organizacion.component';
import { ImportarCatalogoEspochComponent } from './pages/admin/importar-catalogo-espoch/importar-catalogo-espoch.component';
import { ViewVariablesAdminComponent } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { DialogAddEquivalencia } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { DialogCompletarDatosVariable } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { DialogImportarCatalogoOrganizacion } from './pages/admin/view-catalogo-organizacion-admin/view-catalogo-organizacion-admin.component';
import { DialogAgregarVariableOrganizacion } from './pages/admin/view-catalogo-organizacion-admin/view-catalogo-organizacion-admin.component';
import { EditarAdministrador } from './pages/admin/view-administrador/view-administrador.component';
import { EditarDirector } from './pages/admin/view-director/view-director.component';
import { DialogEditarVariableOrganizacion } from './pages/admin/view-catalogo-organizacion-admin/view-catalogo-organizacion-admin.component';
import { FiltroFamiliaAdminPipe } from './pipes/filtro-familia-admin.pipe';
import { FiltroOrganizacionAdminPipe } from './pipes/filtro-organizacion-admin.pipe';
import { AgregarDirector } from './pages/admin/view-director/view-director.component';
import { AgregarAdministrador } from './pages/admin/view-administrador/view-administrador.component';
import { ViewCatalogoVariable } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { ViewUnidadMedidavariableAdmin } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { DialogActualizarEmailEnvio } from './pages/admin/view-email-envio/view-email-envio.component';
import { DialogAddEmailEnvio } from './pages/admin/view-email-envio/view-email-envio.component';
import { AgregarUnidadMedidaVariable } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { DialogAddTiempoEdicionDato } from './pages/admin/view-tiempo-edicion-dato/view-tiempo-edicion-dato.component';
import { DialogActualizarTiempoEdicionDato } from './pages/admin/view-tiempo-edicion-dato/view-tiempo-edicion-dato.component';

//Director
import { SideDirectorComponent } from './pages/director/side-director/side-director.component';
import { DashDirecComponent } from './pages/director/dash-direc/dash-direc.component';
import { SolicitudesAccesoComponent } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { DialogRechazo } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { SolicitudesEliminarComponent } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { DialogAprobadoEliminar } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { AddInvestigadorComponent } from './pages/director/add-investigador/add-investigador.component';
import { ViewInvestigadorComponent } from './pages/director/view-investigador/view-investigador.component';
import { AddProyectoInvestigacionComponent } from './pages/director/add-proyecto-investigacion/add-proyecto-investigacion.component';
import { EditarProyectoInvestigador, ViewProyectoInvestigacionComponent } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { ViewInvestigadoresDeProyectosInvestigacionComponent } from './pages/director/view-investigadores-de-proyectos-investigacion/view-investigadores-de-proyectos-investigacion.component';
import { AddInvestigadorEnProyectoInvestigacionComponent } from './pages/director/add-investigador-en-proyecto-investigacion/add-investigador-en-proyecto-investigacion.component';
import { ActualizarPerfilDirectorComponent } from './pages/director/actualizar-perfil-director/actualizar-perfil-director.component';
import { ViewInvestigadoresProyectosInvestigacion } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { ViewInvestigadoresProyectosInvestigacionEliminado } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { DialogIformacionRechazado } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { DialogIformacionAprobado } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { ViewSolicitudActualizarAprobado } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { ViewSolicitudActualizarRechazado } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { EditarInvestigador } from './pages/director/view-investigador/view-investigador.component';
import { AgregarInvestigador } from './pages/director/view-investigador/view-investigador.component';
import { ViewInformacionProyectoInvestigacionDirector } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';

//Investigador
import { ViewConglomeradosComponent } from './pages/investigador/view-conglomerados/view-conglomerados.component';
import { ViewParcelaComponent } from './pages/investigador/view-parcela/view-parcela.component';
import { ViewPuntoComponent } from './pages/investigador/view-punto/view-punto.component';
import { ViewDatoRecolectadoComponent } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';
import { AddMedidaComponent } from './pages/investigador/add-medida/add-medida.component';
import { ViewMedidaComponent } from './pages/investigador/view-medida/view-medida.component';
import { ViewProfundidadesComponent } from './pages/investigador/view-profundidades/view-profundidades.component';
import { ViewAlturaComponent } from './pages/investigador/view-altura/view-altura.component';
import { ImportarDatos } from './pages/investigador/view-conglomerados/view-conglomerados.component';
import { ImportarXlsComponent } from './pages/investigador/importar-xls/importar-xls.component';
import { DescargarDatosComponent } from './pages/investigador/descargar-datos/descargar-datos.component';
import { DialogoSolicitudActualizar } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';
import { ViewCatalogoOrganizacionComponent } from './pages/investigador/view-catalogo-organizacion/view-catalogo-organizacion.component';
import { ViewCatalogoOrganizacionInvestigadorComponent } from './pages/investigador/view-catalogo-organizacion-investigador/view-catalogo-organizacion-investigador.component';
import { ViewSolicitudActualizarInvestigadorComponent } from './pages/investigador/view-solicitud-actualizar-investigador/view-solicitud-actualizar-investigador.component';
import { ViewSolicitudActualizarAprobadoInvestigador } from './pages/investigador/view-solicitud-actualizar-investigador/view-solicitud-actualizar-investigador.component';
import { ViewSolicitudActualizarRechazadoInvestigador } from './pages/investigador/view-solicitud-actualizar-investigador/view-solicitud-actualizar-investigador.component';
import { EditarUnidadMedida } from './pages/investigador/view-medida/view-medida.component';
import { AgregarUnidadMedida } from './pages/investigador/view-medida/view-medida.component';
import { AgregarAltura } from './pages/investigador/view-altura/view-altura.component';
import { EditarAltura } from './pages/investigador/view-altura/view-altura.component';
import { AgregarArea } from './pages/investigador/view-areas/view-areas.component';
import { EditarArea } from './pages/investigador/view-areas/view-areas.component';
import { AgregarProfundidad } from './pages/investigador/view-profundidades/view-profundidades.component';
import { EditarProfundidad } from './pages/investigador/view-profundidades/view-profundidades.component';
import { AgregarConglomerado1 } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component'; 
import { EditarConglomerado1 } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component'; 
import { AgregarParcela } from './pages/investigador/view-parcela/view-parcela.component';
import { EditarParcela } from './pages/investigador/view-parcela/view-parcela.component';
import { AgregarPunto } from './pages/investigador/view-punto/view-punto.component';
import { EditarPunto } from './pages/investigador/view-punto/view-punto.component';
import { AgregarDatoRecolectado } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';
import { EditarDatoRecolectado } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';
import { ViewOrganizacionInvestigadorComponent } from './pages/investigador/view-organizacion-investigador/view-organizacion-investigador.component';
import { ViewAreasComponent } from './pages/investigador/view-areas/view-areas.component';
import { ViewDashProyectoComponent } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component';
import { SideUserComponent } from './pages/investigador/side-user/side-user.component';
import { DashUserComponent } from './pages/investigador/dash-user/dash-user.component';
import { ActualizarPerfilUsuarioComponent } from './pages/investigador/actualizar-perfil-usuario/actualizar-perfil-usuario.component';
import { ViewUnidadMedidavariable } from './pages/investigador/view-catalogo-organizacion/view-catalogo-organizacion.component';
import { ViewValorPermitidoVariableNumerica } from './pages/investigador/view-catalogo-organizacion/view-catalogo-organizacion.component';
import { ViewValorPermitidoVariableTextual } from './pages/investigador/view-catalogo-organizacion/view-catalogo-organizacion.component';
import { AgregarAlturaConglomerado } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component';
import { AgregarUnidadMedidaConglomerado } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component';

//Filtros
import { FiltroAreaInvestigacionPipe } from './pipes/filtro-area-investigacion.pipe';
import { FiltroInvestigacionPipe } from './pipes/filtro-investigacion.pipe';
import { FiltroSolicitudesPipe } from './pipes/filtro-solicitudes.pipe';
import { FiltroGrupoInvestigacionPipe } from './pipes/filtro-grupo-investigacion.pipe';
import { FiltroProyectoEstadoPipe } from './pipes/filtro-proyecto-estado.pipe';
import { FiltroAddFamiliaPipe } from './pipes/filtro-add-familia.pipe';
import { FiltroVariablesDifusionPipe } from './pipes/filtro-variables-difusion.pipe';
import { FiltroSectorImpactoPipe } from './pipes/filtro-sector-impacto.pipe';
import { FiltroTipoInvestigacionPipe } from './pipes/filtro-tipo-investigacion.pipe';
import { FiltroTipoProyectoPipe } from './pipes/filtro-tipo-proyecto.pipe';
import { FiltroLineaInvestigacionPipe } from './pipes/filtro-linea-investigacion.pipe';
import { FiltroVaribleOrganizacionPipe } from './pipes/filtro-varible-organizacion.pipe';
import { FiltroVaribleSistemaPipe } from './pipes/filtro-varible-sistema.pipe';
import { FiltroHistorialCambiosPipe } from './pipes/filtro-historial-cambios.pipe';
import { FiltroHistorialAccesoPipe } from './pipes/filtro-historial-acceso.pipe';
import { FiltroSolicitudDescargaPipe } from './pipes/filtro-solicitud-descarga.pipe';
import { FiltroSolicitudActualizarPipe } from './pipes/filtro-solicitud-actualizar.pipe';
import { FiltroSolicitudDescargaRespuestaPipe } from './pipes/filtro-solicitud-descarga-respuesta.pipe';
import { FiltroSolicitudActualizarRespuestaPipe } from './pipes/filtro-solicitud-actualizar-respuesta.pipe';
import { FiltroUnidadMedidaPipe } from './pipes/filtro-unidad-medida.pipe';
import { FiltroAreaPipe } from './pipes/filtro-area.pipe';
import { FiltroAlturaPipe } from './pipes/filtro-altura.pipe';
import { FiltroProfundidadPipe } from './pipes/filtro-profundidad.pipe';
import { FiltroEquivalenciaPipe } from './pipes/filtro-equivalencia.pipe';
import { FiltroConglomeradosPipe } from './pipes/filtro-conglomerados.pipe';
import { FiltroParcelaPipe } from './pipes/filtro-parcela.pipe';
import { FiltroPuntoPipe } from './pipes/filtro-punto.pipe';
import { FiltroDatoRecolectadoPipe } from './pipes/filtro-dato-recolectado.pipe';
import { FiltroVariableDescargaPipe } from './pipes/filtro-variable-descarga.pipe';
import { FiltroCatalogoOrganizacionPipe } from './pipes/filtro-catalogo-organizacion.pipe';
import { PaginatePipe } from './pipes/paginate.pipe';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroUbicacionPipe } from './pipes/filtro-ubicacion.pipe';
import { FiltroUsuariosPipe } from './pipes/filtro-usuarios.pipe';

//Administrador de datos
import { AgregarAdministradorDatos } from './pages/admin/view-administrador-datos/view-administrador-datos.component';
import { EditarAdministradorDatos } from './pages/admin/view-administrador-datos/view-administrador-datos.component';
import { DialogAgregarVariableOrganizacionAdminDatos } from './pages/admin-datos/view-catalogo-organizacion-admin-datos/view-catalogo-organizacion-admin-datos.component';
import { DialogEditarVariableOrganizacionAdminDatos } from './pages/admin-datos/view-catalogo-organizacion-admin-datos/view-catalogo-organizacion-admin-datos.component';
import { DialogAddEquivalenciaAdminDatos } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { AgregarUnidadMedidaVariableAdminDatos } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { DialogEditarEquivalenciaAdminDatos } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { ViewCatalogoVariableAdminDatos } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { DialogCompletarDatosVariableAdminDatos } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { ViewUnidadMedidavariableAdminDatos } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { DialogAddOrganizacionAdminDatos } from './pages/admin-datos/view-organizacion-admin-datos/view-organizacion-admin-datos.component';
import { DialogActualizarOrganizacionAdminDatos } from './pages/admin-datos/view-organizacion-admin-datos/view-organizacion-admin-datos.component';
import { DialogActualizarFamiliaAdminDatos } from './pages/admin-datos/view-familia-admin-datos/view-familia-admin-datos.component';
import { DialogAddFamiliaAdminDatos } from './pages/admin-datos/view-familia-admin-datos/view-familia-admin-datos.component';
import { ViewInformacionProyectoInvestigacionAdminDatos } from './pages/admin-datos/view-proyectos-admin-datos/view-proyectos-admin-datos.component';
import { AgregarUnidadMedidaAdminDatos } from './pages/admin-datos/view-unidad-medida-admin-datos/view-unidad-medida-admin-datos.component';
import { EditarUnidadMedidaAdminDatos } from './pages/admin-datos/view-unidad-medida-admin-datos/view-unidad-medida-admin-datos.component';


//Charts
import { ChartsModule } from 'ng2-charts';

//Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { SpinerComponent } from './pages/shared/spiner/spiner.component';
import { SpinnerModule } from './pages/shared/spinner/spinner.module';
import { SpinnerInterceptor } from './pages/shared/interceptors/spinner.interceptor';

//Ejemplo mapa
import { MapaEjemploComponent } from './pages/mapa-ejemplo/mapa-ejemplo.component';
import { FiltroPaisPipe } from './pipes/filtro-pais.pipe';
import { FiltroProvinciaPipe } from './pipes/filtro-provincia.pipe';
import { FiltroCantonPipe } from './pipes/filtro-canton.pipe';
import { FiltroParroquiaPipe } from './pipes/filtro-parroquia.pipe';
import { FiltroEquivalenciaVariableSistemaCatalogPipe } from './pipes/filtro-equivalencia-variable-sistema-catalog.pipe';
import { FiltroUnidadMedidaVariablePipe } from './pipes/filtro-unidad-medida-variable.pipe';
import { ViewEmailEnvioComponent } from './pages/admin/view-email-envio/view-email-envio.component';
import { FiltroEmailEnvioPipe } from './pipes/filtro-email-envio.pipe';
import { FiltroTiempoEdicionDatoPipe } from './pipes/filtro-tiempo-edicion-dato.pipe';
import { ViewTiempoEdicionDatoComponent } from './pages/admin/view-tiempo-edicion-dato/view-tiempo-edicion-dato.component';
import { ViewAdministradorDatosComponent } from './pages/admin/view-administrador-datos/view-administrador-datos.component';
import { FiltroVariableGraficoPipe } from './pipes/filtro-variable-grafico.pipe';
import { SidebarAdminDatosComponent } from './pages/admin-datos/sidebar-admin-datos/sidebar-admin-datos.component';
import { DashAdminDatosComponent } from './pages/admin-datos/dash-admin-datos/dash-admin-datos.component';
import { ViewCatalogoOrganizacionAdminDatosComponent } from './pages/admin-datos/view-catalogo-organizacion-admin-datos/view-catalogo-organizacion-admin-datos.component';
import { ViewOrganizacionAdminDatosComponent } from './pages/admin-datos/view-organizacion-admin-datos/view-organizacion-admin-datos.component';
import { ViewFamiliaAdminDatosComponent } from './pages/admin-datos/view-familia-admin-datos/view-familia-admin-datos.component';
import { ViewVariablesAdminDatosComponent } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { ActualizarPerfilAdminDatosComponent } from './pages/admin-datos/actualizar-perfil-admin-datos/actualizar-perfil-admin-datos.component';
import { ViewProyectosAdminDatosComponent } from './pages/admin-datos/view-proyectos-admin-datos/view-proyectos-admin-datos.component';
import { FiltroProyectoEstadoAdminDatosPipe } from './pipes/filtro-proyecto-estado-admin-datos.pipe';
import { ConglomeradoAdminDatosComponent } from './pages/admin-datos/conglomerado-admin-datos/conglomerado-admin-datos.component';
import { ParcelaAdminDatosComponent } from './pages/admin-datos/parcela-admin-datos/parcela-admin-datos.component';
import { PuntoAdminDatosComponent } from './pages/admin-datos/punto-admin-datos/punto-admin-datos.component';
import { DatoAdminDatosComponent } from './pages/admin-datos/dato-admin-datos/dato-admin-datos.component';
import { DescargarDatoAdminDatosComponent } from './pages/admin-datos/descargar-dato-admin-datos/descargar-dato-admin-datos.component';
import { ConglomeradoDirectorComponent } from './pages/director/conglomerado-director/conglomerado-director.component';
import { ParcelaDirectorComponent } from './pages/director/parcela-director/parcela-director.component';
import { PuntoDirectorComponent } from './pages/director/punto-director/punto-director.component';
import { DatoDirectorComponent } from './pages/director/dato-director/dato-director.component';
import { DescargaDatoDirectorComponent } from './pages/director/descarga-dato-director/descarga-dato-director.component';
import { ViewUnidadMedidaAdminDatosComponent } from './pages/admin-datos/view-unidad-medida-admin-datos/view-unidad-medida-admin-datos.component';


@NgModule({
  declarations: [
    AgregarUnidadMedidaConglomerado,
    AppComponent,
    PaginatePipe,
    FiltroPipe,
    FiltroUbicacionPipe,
    FiltroUsuariosPipe,
    SideComponent,
    SideUserComponent,
    DashUserComponent,
    ActualizarPerfilComponent,
    FiltroInvestigacionPipe,
    ActualizarPerfilUsuarioComponent,
    DashAdminComponent,
    SideDirectorComponent,
    DashDirecComponent,
    SolicitudesAccesoComponent,
    FiltroSolicitudesPipe,
    DialogRechazo,
    DialogAprobadoEliminar,
    SolicitudesEliminarComponent,
    autenticacion,
    ResetPassword,
    DialogSolicitudAcceso,
    ActualizarInformacionWebComponent,
    HomeComponent,
    AddAdministradorComponent,
    AddDirectorComponent,
    ViewAdministradorComponent,
    ViewDirectorComponent,
    FiltroAreaInvestigacionPipe,
    AddInvestigadorComponent,
    ViewInvestigadorComponent,
    AddProyectoInvestigacionComponent,
    ViewProyectoInvestigacionComponent,
    ViewInvestigadoresDeProyectosInvestigacionComponent,
    AddInvestigadorEnProyectoInvestigacionComponent,
    ActualizarPerfilDirectorComponent,
    ViewInvestigadoresProyectosInvestigacion,
    FiltroGrupoInvestigacionPipe,
    ViewInvestigadoresProyectosInvestigacionEliminado,
    FiltroProyectoEstadoPipe,
    ViewConglomeradosComponent,
    ViewParcelaComponent,
    ViewPuntoComponent,
    ViewDatoRecolectadoComponent,
    AddMedidaComponent,
    ViewMedidaComponent,
    ViewProfundidadesComponent,
    DialogIformacionRechazado,
    DialogIformacionAprobado,
    ViewInformacionWebComponent,
    ViewAppWebIformacion,
    ViewAccesoComponent,
    ViewInformacionProyectoInvestigacion,
    ViewAlturaComponent,
    ImportarDatos,
    ImportarXlsComponent,
    ViewCatalogoOrganizacionComponent,
    FiltroVariableDescargaPipe,
    DescargarDatosComponent,
    DialogoSolicitudActualizar,
    MapaEjemploComponent,
    FiltroCatalogoOrganizacionPipe,
    ViewSolicitudActualizarAprobado,
    ViewSolicitudActualizarRechazado,
    ViewProvinciaAdminComponent,
    ViewCantonAdminComponent,
    ViewParroquiaAdminComponent,
    ViewPaisAdminComponent,
    ViewSectorImpactoAdminComponent,
    ViewTipoInvestigacionAdminComponent,
    ViewTipoProyectoAdminComponent,
    ViewLineaInvestigacionAdminComponent,
    ViewAreaInvestigacionesAdminComponent,
    ViewDashProyectoComponent,
    SpinerComponent,
    ViewAreasComponent,
    ViewCatalogoOrganizacionAdminComponent,
    ViewOrganizacionAdminComponent,
    DialogAddOrganizacionAdmin,
    DialogActualizarOrganizacionAdmin,
    DialogAddTipoProyectoAdmin,
    DialogActualizarTipoProyectoAdmin,
    DialogAddTipoInvestigacionAdmin,
    DialogActualizarTipoInvestigacionAdmin,
    DialogActualizarSectorImpactoAdmin,
    DialogAddSectorImpactoAdmin,
    DialogActualizarLineaInvestigacionAdmin,
    DialogAddLineaInvestigacionAdmin,
    DialogAddAreaInvestigacionAdmin,
    DialogActualizarAreaInvestigacionAdmin,
    ViewFamiliaAdminComponent,
    DialogActualizarFamiliaAdmin,
    DialogAddFamiliaAdmin,
    ImportarCatalogoOrganizacionComponent,
    ImportarCatalogoEspochComponent,
    FiltroAddFamiliaPipe,
    ViewVariablesAdminComponent,
    DialogAddEquivalencia,
    DialogCompletarDatosVariable,
    DialogImportarCatalogoOrganizacion,
    FiltroVariablesDifusionPipe,
    ViewCatalogoOrganizacionInvestigadorComponent,
    ViewSolicitudActualizarInvestigadorComponent,
    ViewSolicitudActualizarAprobadoInvestigador,
    ViewSolicitudActualizarRechazadoInvestigador,
    EditarProyectoInvestigador,
    EditarUnidadMedida,
    AgregarUnidadMedida,
    AgregarAltura,
    EditarAltura,
    AgregarArea,
    EditarArea,
    AgregarProfundidad,
    EditarProfundidad,
    AgregarConglomerado1,
    EditarConglomerado1,
    AgregarParcela,
    EditarParcela,
    AgregarPunto,
    EditarPunto,
    AgregarDatoRecolectado,
    EditarDatoRecolectado,
    DialogAgregarVariableOrganizacion,
    EditarAdministrador,
    EditarDirector,
    DialogEditarVariableOrganizacion,
    EditarInvestigador,
    ViewOrganizacionInvestigadorComponent,
    FiltroSectorImpactoPipe,
    FiltroTipoInvestigacionPipe,
    FiltroTipoProyectoPipe,
    FiltroLineaInvestigacionPipe,
    FiltroFamiliaAdminPipe,
    FiltroOrganizacionAdminPipe,
    FiltroVaribleOrganizacionPipe,
    FiltroVaribleSistemaPipe,
    FiltroHistorialCambiosPipe,
    FiltroHistorialAccesoPipe,
    FiltroSolicitudDescargaPipe,
    FiltroSolicitudActualizarPipe,
    FiltroSolicitudDescargaRespuestaPipe,
    FiltroSolicitudActualizarRespuestaPipe,
    FiltroUnidadMedidaPipe,
    FiltroAreaPipe,
    FiltroAlturaPipe,
    FiltroProfundidadPipe,
    FiltroEquivalenciaPipe,
    FiltroConglomeradosPipe,
    FiltroParcelaPipe,
    FiltroPuntoPipe,
    FiltroDatoRecolectadoPipe,
    DialogEditarEquivalencia,
    DialogAddPais,
    DialogEditarPais,
    DialogAddProvincia,
    DialogEditarProvincia,
    DialogAddCanton,
    DialogEditarCanton,
    DialogAddParroquia,
    DialogEditarParroquia,
    ViewProyectosHome,
    ViewCatalogoHome,
    ViewInformacionHome,
    ViewExplorarHome,
    FiltroPaisPipe,
    FiltroProvinciaPipe,
    FiltroCantonPipe,
    FiltroParroquiaPipe,
    AgregarDirector,
    AgregarAdministrador,
    AgregarInvestigador,
    ViewCatalogoVariable,
    FiltroEquivalenciaVariableSistemaCatalogPipe,
    ViewUnidadMedidavariable,
    FiltroUnidadMedidaVariablePipe,
    ViewUnidadMedidavariableAdmin,
    ViewValorPermitidoVariableNumerica,
    ViewValorPermitidoVariableTextual,
    ViewEmailEnvioComponent,
    DialogActualizarEmailEnvio,
    DialogAddEmailEnvio,
    FiltroEmailEnvioPipe,
    AgregarUnidadMedidaVariable,
    AgregarAlturaConglomerado,
    FiltroTiempoEdicionDatoPipe,
    ViewTiempoEdicionDatoComponent,
    DialogAddTiempoEdicionDato,
    DialogActualizarTiempoEdicionDato,
    ViewAdministradorDatosComponent,
    FiltroVariableGraficoPipe,
    SidebarAdminDatosComponent,
    DashAdminDatosComponent,
    AgregarAdministradorDatos,
    EditarAdministradorDatos,
    ViewCatalogoOrganizacionAdminDatosComponent,
    DialogAgregarVariableOrganizacionAdminDatos,
    DialogEditarVariableOrganizacionAdminDatos,
    ViewOrganizacionAdminDatosComponent,
    ViewFamiliaAdminDatosComponent,
    ViewVariablesAdminDatosComponent,
    DialogAddEquivalenciaAdminDatos,
    AgregarUnidadMedidaVariableAdminDatos,
    DialogEditarEquivalenciaAdminDatos,
    ViewCatalogoVariableAdminDatos,
    DialogCompletarDatosVariableAdminDatos,
    ViewUnidadMedidavariableAdminDatos,
    DialogAddOrganizacionAdminDatos,
    DialogActualizarOrganizacionAdminDatos,
    DialogActualizarFamiliaAdminDatos,
    DialogAddFamiliaAdminDatos,
    ActualizarPerfilAdminDatosComponent,
    ViewProyectosAdminDatosComponent,
    ViewInformacionProyectoInvestigacionAdminDatos,
    FiltroProyectoEstadoAdminDatosPipe,
    ViewInformacionProyectoInvestigacionDirector,
    ConglomeradoAdminDatosComponent,
    ParcelaAdminDatosComponent,
    PuntoAdminDatosComponent,
    DatoAdminDatosComponent,
    DescargarDatoAdminDatosComponent,
    ConglomeradoDirectorComponent,
    ParcelaDirectorComponent,
    PuntoDirectorComponent,
    DatoDirectorComponent,
    DescargaDatoDirectorComponent,
    ViewUnidadMedidaAdminDatosComponent,
    AgregarUnidadMedidaAdminDatos,
    EditarUnidadMedidaAdminDatos

  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    MatTabsModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatExpansionModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    LayoutModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatRadioModule,
    MatStepperModule,
    ChartsModule,
    MatCheckboxModule,
    SpinnerModule,
    MatChipsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true},authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
