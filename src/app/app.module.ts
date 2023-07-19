import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { NgxUiLoaderModule , NgxUiLoaderHttpModule } from "ngx-ui-loader";

//paginador y busqueda

import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import { PaginatePipe } from './pipes/paginate.pipe';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroUbicacionPipe } from './pipes/filtro-ubicacion.pipe';
import { FiltroUsuariosPipe } from './pipes/filtro-usuarios.pipe';
import { SideComponent } from './pages/admin/side/side.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ViewUserComponent } from './pages/admin/view-user/view-user.component';
import { ActualizarUsuariosComponent } from './pages/admin/actualizar-usuarios/actualizar-usuarios.component';
import { AddUsuariosComponent } from './pages/admin/add-usuarios/add-usuarios.component';
import { ActualizarPerfilComponent } from './pages/admin/actualizar-perfil/actualizar-perfil.component';
import { AddInvestigacionComponent } from './pages/admin/add-investigacion/add-investigacion.component';
import { ViewInvestigacionComponent } from './pages/admin/view-investigacion/view-investigacion.component';
import { ViewInvestigadoresComponent } from './pages/admin/view-investigadores/view-investigadores.component';
import { AddInvestigadoresInvestigacionComponent } from './pages/admin/add-investigadores-investigacion/add-investigadores-investigacion.component';
import { UsuariosTableComponent } from './pages/admin/usuarios-table/usuarios-table.component';
import { FiltroInvestigacionPipe } from './pipes/filtro-investigacion.pipe';


import {MatRadioModule} from '@angular/material/radio';
import { SideUserComponent } from './pages/investigador/side-user/side-user.component';
import { DashUserComponent } from './pages/investigador/dash-user/dash-user.component';
import { ActualizarPerfilUsuarioComponent } from './pages/investigador/actualizar-perfil-usuario/actualizar-perfil-usuario.component';
import { CarbonoTableComponent } from './pages/investigador/carbono-table/carbono-table.component';
import { AddCarbonoComponent } from './pages/investigador/add-carbono/add-carbono.component';
import { DashAdminComponent } from './pages/admin/dash-admin/dash-admin.component';
import { SideDirectorComponent } from './pages/director/side-director/side-director.component';
import { DashDirecComponent } from './pages/director/dash-direc/dash-direc.component';
import { SolicitudesAccesoComponent } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { DialogRechazo } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { DialogEliminar } from './pages/investigador/carbono-table/carbono-table.component';
import { FiltroSolicitudesPipe } from './pipes/filtro-solicitudes.pipe';
import { SolicitudesEliminarComponent } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { DialogAprobadoEliminar } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { ActualizarInformacionWebComponent } from './pages/admin/actualizar-informacion-web/actualizar-informacion-web.component';
import { HomeComponent } from './pages/home/home.component';
import { autenticacion } from './pages/home/home.component';
import { ResetPassword } from './pages/home/home.component';
import { DialogSolicitudAcceso } from './pages/home/home.component';
import { AddAdministradorComponent } from './pages/admin/add-administrador/add-administrador.component';
import { AddDirectorComponent } from './pages/admin/add-director/add-director.component';
import { ViewAdministradorComponent } from './pages/admin/view-administrador/view-administrador.component';
import { ViewDirectorComponent } from './pages/admin/view-director/view-director.component';
import { AddAreaInvestigacionComponent } from './pages/admin/add-area-investigacion/add-area-investigacion.component';
import { ViewAreaInvestigacionComponent } from './pages/admin/view-area-investigacion/view-area-investigacion.component';
import { FiltroAreaInvestigacionPipe } from './pipes/filtro-area-investigacion.pipe';
import { AddInvestigadorComponent } from './pages/director/add-investigador/add-investigador.component';
import { ViewInvestigadorComponent } from './pages/director/view-investigador/view-investigador.component';
import { AddProyectoInvestigacionComponent } from './pages/director/add-proyecto-investigacion/add-proyecto-investigacion.component';
import { ViewProyectoInvestigacionComponent } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { ViewInvestigadoresDeProyectosInvestigacionComponent } from './pages/director/view-investigadores-de-proyectos-investigacion/view-investigadores-de-proyectos-investigacion.component';
import { AddInvestigadorEnProyectoInvestigacionComponent } from './pages/director/add-investigador-en-proyecto-investigacion/add-investigador-en-proyecto-investigacion.component';
import { ActualizarPerfilDirectorComponent } from './pages/director/actualizar-perfil-director/actualizar-perfil-director.component';
import { InvestigacionesAreaInvestigacion } from './pages/admin/view-area-investigacion/view-area-investigacion.component';
import { DirectoresDisponiblesAreaInvestigacion } from './pages/admin/view-area-investigacion/view-area-investigacion.component';
import { ViewDirectorAsignado } from './pages/admin/view-area-investigacion/view-area-investigacion.component';
import { ReasignarDirectoresAreaInvestigacion } from './pages/admin/view-area-investigacion/view-area-investigacion.component';
import { ViewInvestigadoresProyectosInvestigacion } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { FiltroGrupoInvestigacionPipe } from './pipes/filtro-grupo-investigacion.pipe';
import { ViewInvestigadoresProyectosInvestigacionEliminado } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { FiltroProyectoEstadoPipe } from './pipes/filtro-proyecto-estado.pipe';
import { AddConglomeradoComponent } from './pages/investigador/add-conglomerado/add-conglomerado.component';

import { ViewConglomeradosComponent } from './pages/investigador/view-conglomerados/view-conglomerados.component';
import { ViewParcelaComponent } from './pages/investigador/view-parcela/view-parcela.component';
import { ViewPuntoComponent } from './pages/investigador/view-punto/view-punto.component';
import { ViewDatoRecolectadoComponent } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';


import { AddParcelaComponent } from './pages/investigador/add-parcela/add-parcela.component';
import { AddMedidaComponent } from './pages/investigador/add-medida/add-medida.component';
import { AddProfundidadComponent } from './pages/investigador/add-profundidad/add-profundidad.component';
import { AddPuntoComponent } from './pages/investigador/add-punto/add-punto.component';
import { AddDatoRecolectadoComponent } from './pages/investigador/add-dato-recolectado/add-dato-recolectado.component';
import { AddVariableComponent } from './pages/investigador/add-variable/add-variable.component';
import { ViewMedidaComponent } from './pages/investigador/view-medida/view-medida.component';
import { ViewVariablesComponent } from './pages/investigador/view-variables/view-variables.component';
import { ViewProfundidadesComponent } from './pages/investigador/view-profundidades/view-profundidades.component';
import { DialogIformacionRechazado } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { DialogIformacionAprobado } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { ViewInformacionWebComponent } from './pages/admin/view-informacion-web/view-informacion-web.component';
import { ViewAppWebIformacion } from './pages/admin/view-informacion-web/view-informacion-web.component';
import { ViewAccesoComponent } from './pages/admin/view-acceso/view-acceso.component';
import { ViewInformacionProyectoInvestigacion } from './pages/home/home.component';
import { ViewTipoVariableComponent } from './pages/investigador/view-tipo-variable/view-tipo-variable.component';
import { ViewAlturaComponent } from './pages/investigador/view-altura/view-altura.component';
import { AddTipoVariableComponent } from './pages/investigador/add-tipo-variable/add-tipo-variable.component';
import { AddAlturaComponent } from './pages/investigador/add-altura/add-altura.component';
import { ImportarDatos } from './pages/investigador/view-conglomerados/view-conglomerados.component';
import { ImportarXlsComponent } from './pages/investigador/importar-xls/importar-xls.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ChartsModule } from 'ng2-charts';
import { AddCatalogoOrganizacionComponent } from './pages/investigador/add-catalogo-organizacion/add-catalogo-organizacion.component';
import { ViewCatalogoOrganizacionComponent } from './pages/investigador/view-catalogo-organizacion/view-catalogo-organizacion.component';
import { ViewVariableProyectoComponent } from './pages/investigador/view-variable-proyecto/view-variable-proyecto.component';
import { ViewValoresPermitidos } from './pages/investigador/view-variable-proyecto/view-variable-proyecto.component';
import { FiltroVariableDescargaPipe } from './pipes/filtro-variable-descarga.pipe';
import { DescargarDatosComponent } from './pages/investigador/descargar-datos/descargar-datos.component';
import { DialogoSolicitudActualizar } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';
import { MapaEjemploComponent } from './pages/mapa-ejemplo/mapa-ejemplo.component';
import { MapaComponent } from './pages/investigador/mapa/mapa.component';
import { FiltroCatalogoOrganizacionPipe } from './pipes/filtro-catalogo-organizacion.pipe';
import { ViewSolicitudActualizarAprobado } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { ViewSolicitudActualizarRechazado } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { ViewProvinciaAdminComponent } from './pages/admin/view-provincia-admin/view-provincia-admin.component';
import { ViewCantonAdminComponent } from './pages/admin/view-canton-admin/view-canton-admin.component';
import { ViewParroquiaAdminComponent } from './pages/admin/view-parroquia-admin/view-parroquia-admin.component';
import { ViewPaisAdminComponent } from './pages/admin/view-pais-admin/view-pais-admin.component';
import { ViewInstitucionAdminComponent } from './pages/admin/view-institucion-admin/view-institucion-admin.component';
import { ViewSectorImpactoAdminComponent } from './pages/admin/view-sector-impacto-admin/view-sector-impacto-admin.component';
import { ViewTipoInvestigacionAdminComponent } from './pages/admin/view-tipo-investigacion-admin/view-tipo-investigacion-admin.component';
import { ViewTipoProyectoAdminComponent } from './pages/admin/view-tipo-proyecto-admin/view-tipo-proyecto-admin.component';
import { ViewLineaInvestigacionAdminComponent } from './pages/admin/view-linea-investigacion-admin/view-linea-investigacion-admin.component';
import { AddInstitucionComponent } from './pages/admin/add-institucion/add-institucion.component';
import { AddInstitucionAdminComponent } from './pages/admin/add-institucion-admin/add-institucion-admin.component';
import { ViewAreasInvestigacionAdminComponent } from './pages/admin/view-areas-investigacion-admin/view-areas-investigacion-admin.component';
import { ViewAreaInvestigacionesAdminComponent } from './pages/admin/view-area-investigaciones-admin/view-area-investigaciones-admin.component';
import { ConvertirXlsComponent } from './pages/investigador/convertir-xls/convertir-xls.component';
import { ViewLocalizacionAdminComponent } from './pages/admin/view-localizacion-admin/view-localizacion-admin.component';
import { AddLocalizacionAdminComponent } from './pages/admin/add-localizacion-admin/add-localizacion-admin.component';
import { ViewDashProyectoComponent } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component';
import { SpinerComponent } from './pages/shared/spiner/spiner.component';
import { SpinnerModule } from './pages/shared/spinner/spinner.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './pages/shared/interceptors/spinner.interceptor';
import { AddAreaComponent } from './pages/investigador/add-area/add-area.component';
import { ViewAreasComponent } from './pages/investigador/view-areas/view-areas.component';
import { ViewCatalogoEspochAdminComponent } from './pages/admin/view-catalogo-espoch-admin/view-catalogo-espoch-admin.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CarbonoTableComponent,
    SidebarComponent,
    UsuariosTableComponent,
    PaginatePipe,
    FiltroPipe,
    FiltroUbicacionPipe,
    FiltroUsuariosPipe,
    SideComponent,
    SideUserComponent,
    DashUserComponent,
    ViewUserComponent,
    ActualizarUsuariosComponent,
    AddUsuariosComponent,
    ActualizarPerfilComponent,
    AddInvestigacionComponent,
    ViewInvestigacionComponent,
    ViewInvestigadoresComponent,
    AddInvestigadoresInvestigacionComponent,
    FiltroInvestigacionPipe,
    ActualizarPerfilUsuarioComponent,
    AddCarbonoComponent,
    DashAdminComponent,
    SideDirectorComponent,
    DashDirecComponent,
    SolicitudesAccesoComponent,
    FiltroSolicitudesPipe,
    DialogRechazo,
    DialogEliminar,
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
    AddAreaInvestigacionComponent,
    ViewAreaInvestigacionComponent,
    FiltroAreaInvestigacionPipe,
    AddInvestigadorComponent,
    ViewInvestigadorComponent,
    AddProyectoInvestigacionComponent,
    ViewProyectoInvestigacionComponent,
    ViewInvestigadoresDeProyectosInvestigacionComponent,
    AddInvestigadorEnProyectoInvestigacionComponent,
    ActualizarPerfilDirectorComponent,
    InvestigacionesAreaInvestigacion,
    DirectoresDisponiblesAreaInvestigacion,
    ViewDirectorAsignado,
    ReasignarDirectoresAreaInvestigacion,
    ViewInvestigadoresProyectosInvestigacion,
    FiltroGrupoInvestigacionPipe,
    ViewInvestigadoresProyectosInvestigacionEliminado,
    FiltroProyectoEstadoPipe,
    AddConglomeradoComponent,
    ViewConglomeradosComponent,
    ViewParcelaComponent,
    ViewPuntoComponent,
    ViewDatoRecolectadoComponent,
    AddParcelaComponent,
    AddMedidaComponent,
    AddProfundidadComponent,
    AddPuntoComponent,
    AddDatoRecolectadoComponent,
    AddVariableComponent,
    ViewMedidaComponent,
    ViewVariablesComponent,
    ViewProfundidadesComponent,
    DialogIformacionRechazado,
    DialogIformacionAprobado,
    ViewInformacionWebComponent,
    ViewAppWebIformacion,
    ViewAccesoComponent,
    ViewInformacionProyectoInvestigacion,
    ViewAlturaComponent,
    AddTipoVariableComponent,
    AddAlturaComponent,
    ViewTipoVariableComponent,
    ImportarDatos,
    ImportarXlsComponent,
    AddCatalogoOrganizacionComponent,
    ViewCatalogoOrganizacionComponent,
    ViewVariableProyectoComponent,
    ViewValoresPermitidos,
    FiltroVariableDescargaPipe,
    DescargarDatosComponent,
    DialogoSolicitudActualizar,
    MapaEjemploComponent,
    MapaComponent,
    FiltroCatalogoOrganizacionPipe,
    ViewSolicitudActualizarAprobado,
    ViewSolicitudActualizarRechazado,
    ViewProvinciaAdminComponent,
    ViewCantonAdminComponent,
    ViewParroquiaAdminComponent,
    ViewPaisAdminComponent,
    ViewInstitucionAdminComponent,
    ViewSectorImpactoAdminComponent,
    ViewTipoInvestigacionAdminComponent,
    ViewTipoProyectoAdminComponent,
    ViewLineaInvestigacionAdminComponent,
    AddInstitucionComponent,
    AddInstitucionAdminComponent,
    ViewAreasInvestigacionAdminComponent,
    ViewAreaInvestigacionesAdminComponent,
    ConvertirXlsComponent,
    ViewLocalizacionAdminComponent,
    AddLocalizacionAdminComponent,
    ViewDashProyectoComponent,
    SpinerComponent,
    AddAreaComponent,
    ViewAreasComponent,
    ViewCatalogoEspochAdminComponent,
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
    DialogAddFamiliaAdmin
   

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
    SpinnerModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true},authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
