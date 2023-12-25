
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { DirectorGuard } from './services/director.guard';
import { AdminDatosGuard } from './services/admin-datos.guard';

//Usuario comun
import { HomeComponent } from './pages/home/home.component';

//Administrador
import { SideComponent } from './pages/admin/side/side.component';
import { DashAdminComponent } from './pages/admin/dash-admin/dash-admin.component';
import { ActualizarPerfilComponent } from './pages/admin/actualizar-perfil/actualizar-perfil.component';
import { ActualizarInformacionWebComponent } from './pages/admin/actualizar-informacion-web/actualizar-informacion-web.component';
import { AddAdministradorComponent } from './pages/admin/add-administrador/add-administrador.component';
import { ViewAdministradorComponent } from './pages/admin/view-administrador/view-administrador.component';
import { AddDirectorComponent } from './pages/admin/add-director/add-director.component';
import { ViewDirectorComponent } from './pages/admin/view-director/view-director.component';
import { ViewInformacionWebComponent } from './pages/admin/view-informacion-web/view-informacion-web.component';
import { ViewAccesoComponent } from './pages/admin/view-acceso/view-acceso.component';
import { ViewPaisAdminComponent } from './pages/admin/view-pais-admin/view-pais-admin.component';
import { ViewProvinciaAdminComponent } from './pages/admin/view-provincia-admin/view-provincia-admin.component';
import { ViewCantonAdminComponent } from './pages/admin/view-canton-admin/view-canton-admin.component';
import { ViewParroquiaAdminComponent } from './pages/admin/view-parroquia-admin/view-parroquia-admin.component';
import { ViewTipoProyectoAdminComponent } from './pages/admin/view-tipo-proyecto-admin/view-tipo-proyecto-admin.component';
import { ViewTipoInvestigacionAdminComponent } from './pages/admin/view-tipo-investigacion-admin/view-tipo-investigacion-admin.component';
import { ViewLineaInvestigacionAdminComponent } from './pages/admin/view-linea-investigacion-admin/view-linea-investigacion-admin.component';
import { ViewSectorImpactoAdminComponent } from './pages/admin/view-sector-impacto-admin/view-sector-impacto-admin.component';
import { ViewAreaInvestigacionesAdminComponent } from './pages/admin/view-area-investigaciones-admin/view-area-investigaciones-admin.component';
import { ViewCatalogoOrganizacionAdminComponent } from './pages/admin/view-catalogo-organizacion-admin/view-catalogo-organizacion-admin.component';
import { ViewOrganizacionAdminComponent } from './pages/admin/view-organizacion-admin/view-organizacion-admin.component';
import { ViewFamiliaAdminComponent } from './pages/admin/view-familia-admin/view-familia-admin.component';
import { ImportarCatalogoOrganizacionComponent } from './pages/admin/importar-catalogo-organizacion/importar-catalogo-organizacion.component';
import { ImportarCatalogoEspochComponent } from './pages/admin/importar-catalogo-espoch/importar-catalogo-espoch.component';
import { ViewVariablesAdminComponent } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { ViewEmailEnvioComponent } from './pages/admin/view-email-envio/view-email-envio.component';
import { ViewTiempoEdicionDatoComponent } from './pages/admin/view-tiempo-edicion-dato/view-tiempo-edicion-dato.component';
import { ViewAdministradorDatosComponent } from './pages/admin/view-administrador-datos/view-administrador-datos.component';

//Director
import { SideDirectorComponent } from './pages/director/side-director/side-director.component';
import { DashDirecComponent } from './pages/director/dash-direc/dash-direc.component';
import { ActualizarPerfilDirectorComponent } from './pages/director/actualizar-perfil-director/actualizar-perfil-director.component';
import { AddInvestigadorComponent } from './pages/director/add-investigador/add-investigador.component';
import { ViewInvestigadorComponent } from './pages/director/view-investigador/view-investigador.component';
import { AddProyectoInvestigacionComponent } from './pages/director/add-proyecto-investigacion/add-proyecto-investigacion.component';
import { ViewProyectoInvestigacionComponent } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { ViewInvestigadoresDeProyectosInvestigacionComponent } from './pages/director/view-investigadores-de-proyectos-investigacion/view-investigadores-de-proyectos-investigacion.component';
import { AddInvestigadorEnProyectoInvestigacionComponent } from './pages/director/add-investigador-en-proyecto-investigacion/add-investigador-en-proyecto-investigacion.component';
import { SolicitudesAccesoComponent } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { SolicitudesEliminarComponent } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { ConglomeradoDirectorComponent } from './pages/director/conglomerado-director/conglomerado-director.component';
import { ParcelaDirectorComponent } from './pages/director/parcela-director/parcela-director.component';
import { PuntoDirectorComponent } from './pages/director/punto-director/punto-director.component';
import { DatoDirectorComponent } from './pages/director/dato-director/dato-director.component';
import { DescargaDatoDirectorComponent } from './pages/director/descarga-dato-director/descarga-dato-director.component';

//Investigador
import { SideUserComponent } from './pages/investigador/side-user/side-user.component';
import { DashUserComponent } from './pages/investigador/dash-user/dash-user.component';
import { ActualizarPerfilUsuarioComponent } from './pages/investigador/actualizar-perfil-usuario/actualizar-perfil-usuario.component';
import { ViewConglomeradosComponent } from './pages/investigador/view-conglomerados/view-conglomerados.component';
import { ViewDatoRecolectadoComponent } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';
import { ViewParcelaComponent } from './pages/investigador/view-parcela/view-parcela.component';
import { ViewPuntoComponent } from './pages/investigador/view-punto/view-punto.component';
import { ViewMedidaComponent } from './pages/investigador/view-medida/view-medida.component';
import { ViewProfundidadesComponent } from './pages/investigador/view-profundidades/view-profundidades.component';
import { AddMedidaComponent } from './pages/investigador/add-medida/add-medida.component';
import { ViewAlturaComponent } from './pages/investigador/view-altura/view-altura.component';
import { ImportarXlsComponent } from './pages/investigador/importar-xls/importar-xls.component';
import { ViewCatalogoOrganizacionComponent } from './pages/investigador/view-catalogo-organizacion/view-catalogo-organizacion.component';
import { DescargarDatosComponent } from './pages/investigador/descargar-datos/descargar-datos.component';
import { MapaEjemploComponent } from './pages/mapa-ejemplo/mapa-ejemplo.component';
import { ViewDashProyectoComponent } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component';
import { ViewAreasComponent } from './pages/investigador/view-areas/view-areas.component';
import { ViewCatalogoOrganizacionInvestigadorComponent } from './pages/investigador/view-catalogo-organizacion-investigador/view-catalogo-organizacion-investigador.component';
import { ViewSolicitudActualizarInvestigadorComponent } from './pages/investigador/view-solicitud-actualizar-investigador/view-solicitud-actualizar-investigador.component';
import { ViewOrganizacionInvestigadorComponent } from './pages/investigador/view-organizacion-investigador/view-organizacion-investigador.component';

//Administrador de datos
import { SidebarAdminDatosComponent } from './pages/admin-datos/sidebar-admin-datos/sidebar-admin-datos.component';
import { DashAdminDatosComponent } from './pages/admin-datos/dash-admin-datos/dash-admin-datos.component';
import { ViewCatalogoOrganizacionAdminDatosComponent } from './pages/admin-datos/view-catalogo-organizacion-admin-datos/view-catalogo-organizacion-admin-datos.component';
import { ViewFamiliaAdminDatosComponent } from './pages/admin-datos/view-familia-admin-datos/view-familia-admin-datos.component';
import { ViewVariablesAdminDatosComponent } from './pages/admin-datos/view-variables-admin-datos/view-variables-admin-datos.component';
import { ViewOrganizacionAdminDatosComponent } from './pages/admin-datos/view-organizacion-admin-datos/view-organizacion-admin-datos.component';
import { ActualizarPerfilAdminDatosComponent } from './pages/admin-datos/actualizar-perfil-admin-datos/actualizar-perfil-admin-datos.component';
import { ViewProyectosAdminDatosComponent } from './pages/admin-datos/view-proyectos-admin-datos/view-proyectos-admin-datos.component';
import { ConglomeradoAdminDatosComponent } from './pages/admin-datos/conglomerado-admin-datos/conglomerado-admin-datos.component';
import { ParcelaAdminDatosComponent } from './pages/admin-datos/parcela-admin-datos/parcela-admin-datos.component';
import { PuntoAdminDatosComponent } from './pages/admin-datos/punto-admin-datos/punto-admin-datos.component';
import { DatoAdminDatosComponent } from './pages/admin-datos/dato-admin-datos/dato-admin-datos.component';
import { DescargarDatoAdminDatosComponent } from './pages/admin-datos/descargar-dato-admin-datos/descargar-dato-admin-datos.component';
import { ViewUnidadMedidaAdminDatosComponent } from './pages/admin-datos/view-unidad-medida-admin-datos/view-unidad-medida-admin-datos.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full'
  },

  {
    path : 'mapa',
    component : MapaEjemploComponent,
    pathMatch : 'full'
  },
  
  {
    //--------------------------------------------------------------------------
    //ADMINISTRADOR
    path:'admin',
    component:SideComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path : '',
        component : DashAdminComponent
      },
      {
        path:'actualizarPerfil/:id',
        component:ActualizarPerfilComponent
      },
      {
        path:'actualizar-informacion-app-web/:id',
        component:ActualizarInformacionWebComponent
      },
      {
        path:'add-administrador',
        component:AddAdministradorComponent
      },
      {
        path:'view-administrador',
        component:ViewAdministradorComponent
      },
      {
        path:'add-director',
        component:AddDirectorComponent
      },
      {
        path:'view-director',
        component:ViewDirectorComponent
      },
      {
        path:'view-informacion-web',
        component:ViewInformacionWebComponent
      },
      {
        path:'view-accesos',
        component:ViewAccesoComponent
      },
      {
        path:'view-pais-admin',
        component:ViewPaisAdminComponent
      },
      {
        path:'view-provincia-admin/:idPais',
        component:ViewProvinciaAdminComponent
      },
      {
        path:'view-canton-admin/:idProvincia/:idPais',
        component:ViewCantonAdminComponent
      },
      {
        path:'view-parroquia-admin/:idCanton/:idProvincia/:idPais',
        component:ViewParroquiaAdminComponent
      },
      {
        path:'view-tipo-proyecto-admin',
        component:ViewTipoProyectoAdminComponent
      },
      {
        path:'view-tipo-investigacion-admin',
        component:ViewTipoInvestigacionAdminComponent
      },
      {
        path:'view-linea-investigacion-admin',
        component:ViewLineaInvestigacionAdminComponent
      },
      {
        path:'view-sector-impacto-admin',
        component:ViewSectorImpactoAdminComponent
      },
      {
        path:'view-area-investigacion-admin',
        component:ViewAreaInvestigacionesAdminComponent
      },
      {
        path:'view-catalogo-organizacion-admin/:idOrganizacion/:siglas',
        component:ViewCatalogoOrganizacionAdminComponent
      },
      {
        path:'view-organizacion-admin',
        component:ViewOrganizacionAdminComponent
      },
      {
        path:'view-familia-admin',
        component:ViewFamiliaAdminComponent
      },
      {
        path:'importar-catalogo-organizacion',
        component:ImportarCatalogoOrganizacionComponent
      },
      {
        path:'importar-catalogo-espoch',
        component:ImportarCatalogoEspochComponent
      },
      {
        path:'view-variable-admin',
        component:ViewVariablesAdminComponent
      },
      {
        path:'view-envio-email',
        component:ViewEmailEnvioComponent
      },

      {
        path:'view-tiempo-edicion-dato',
        component:ViewTiempoEdicionDatoComponent
      },

      {
        path:'view-administrador-datos',
        component:ViewAdministradorDatosComponent
      },

      
    ]
  },

  {
    //--------------------------------------------------------------------------
    //ADMINISTRADOR DATOS
    path:'admin-datos',
    component:SidebarAdminDatosComponent,
    canActivate:[AdminDatosGuard],
    children:[
      {
        path : '',
        component : DashAdminDatosComponent
      },

      
      {
        path:'view-proyecto-admin-datos',
        component:ViewProyectosAdminDatosComponent
      },

      {
        path:'actualizar-perfil-admin-datos/:id',
        component:ActualizarPerfilAdminDatosComponent
      },

      {
        path:'view-organizacion-admin-datos',
        component:ViewOrganizacionAdminDatosComponent
      },

      {
        path:'view-catalogo-organizacion-admin-datos/:idOrganizacion/:siglas',
        component:ViewCatalogoOrganizacionAdminDatosComponent
      },

      {
        path:'view-familia-admin-datos',
        component:ViewFamiliaAdminDatosComponent
      },

      {
        path:'view-unidad-medida-admin-datos',
        component:ViewUnidadMedidaAdminDatosComponent
      },

      {
        path:'view-variable-admin-datos',
        component:ViewVariablesAdminDatosComponent
      },

      {
        path:'conglomerados-admin-datos/:idProyecto',
        component:ConglomeradoAdminDatosComponent       
      }, 

      {
        path:'parcelas-admin-datos/:idConglomerado/:idProyecto',
        component:ParcelaAdminDatosComponent
      },
      {
        path:'puntos-admin-datos/:idParcela/:idConglomerado/:idProyecto',
        component:PuntoAdminDatosComponent
      },
      {
        path:'datos-admin-datos/:idProfundidad/:idParcela/:idConglomerado/:idProyecto',
        component:DatoAdminDatosComponent
      },

      {
        path:'descargar-datos-admin-datos/:idProyecto',
        component:DescargarDatoAdminDatosComponent
      },

      
    ]
  },

  //--------------------------------------------------------------------------
  //DIRECTOR
  {
    path:'director-dashboard',
    component:SideDirectorComponent,
    canActivate:[DirectorGuard],
    children : [
      {
        path : '',
        component : DashDirecComponent
      },
      {
        path:'actualizar-perfil-director/:id',
        component:ActualizarPerfilDirectorComponent
      },
      {
        path:'add-investigador',
        component:AddInvestigadorComponent
      },
      {
        path:'view-investigador',
        component:ViewInvestigadorComponent
      },
      {
        path:'add-proyecto-investigacion/:idUsuario',
        component:AddProyectoInvestigacionComponent
      },
      {
        path:'view-proyecto-investigacion/:idUsuario',
        component:ViewProyectoInvestigacionComponent
      },
      {
        path:'ver-investigador-de-proyecto-investigacion/:idProyectoInvestigacion/:nombreProyectoInvestigacion',
        component:ViewInvestigadoresDeProyectosInvestigacionComponent
      },
      {
        path:'add-investigador-en-proyecto-investigacion/:idProyectoInvestigacion/:nombreProyectoInvestigacion',
        component : AddInvestigadorEnProyectoInvestigacionComponent
      },
      {
        path:'solicitudes-acceso/:idAreaInvestigacion',
        component:SolicitudesAccesoComponent
      },
      {
        path:'solicitudes-actualizar/:idAreaInvestigacion',
        component:SolicitudesEliminarComponent
      },


      {
        path:'conglomerados-director/:idProyecto',
        component:ConglomeradoDirectorComponent
      }, 

      {
        path:'parcelas-director/:idConglomerado/:idProyecto',
        component:ParcelaDirectorComponent
      },
      {
        path:'puntos-director/:idParcela/:idConglomerado/:idProyecto',
        component:PuntoDirectorComponent
      },
      {
        path:'datos-director/:idProfundidad/:idParcela/:idConglomerado/:idProyecto',
        component:DatoDirectorComponent
      },

      {
        path:'descargar-datos-director/:idProyecto',
        component:DescargaDatoDirectorComponent
      },


      
    ]
  },
  //--------------------------------------------------------------------------
  //INVESTIGADOR
  {
    path:'user-dashboard',
    component:SideUserComponent,
    canActivate:[NormalGuard],
    children : [
      {
        path:'',
        component:DashUserComponent
      },
      {
        path:'actualizarPerfilUser/:id',
        component:ActualizarPerfilUsuarioComponent
      },
      {
        path:'view-conglomerados/:idProyecto',
        component:ViewConglomeradosComponent
      },
      {
        path:'view-parcelas/:idConglomerado/:idProyecto',
        component:ViewParcelaComponent
      },
      {
        path:'view-puntos/:idParcela/:idConglomerado/:idProyecto',
        component:ViewPuntoComponent
      },
      {
        path:'view-datos-recolectados/:idProfundidad/:idParcela/:idConglomerado/:idProyecto',
        component:ViewDatoRecolectadoComponent
      },
      {
        path:'view-medidas',
        component:ViewMedidaComponent
      },
      {
        path:'view-profundidades',
        component:ViewProfundidadesComponent
      },
      {
        path:'add-medida',
        component:AddMedidaComponent    
      },
      {
        path:'descargar-datos/:idProyecto',
        component:DescargarDatosComponent       
      },
      {
        path:'view-altura',
        component:ViewAlturaComponent       
      },
      {
        path:'importar-datos/:idProyecto',
        component:ImportarXlsComponent       
      },
      {
        path:'view-catalogo-organizacion',
        component:ViewCatalogoOrganizacionComponent       
      },
      {
        path:'view-dash-proyecto/:idProyecto',
        component:ViewDashProyectoComponent       
      }, 
      {
        path:'view-areas-medida',
        component:ViewAreasComponent       
      }, 
      {
        path:'view-solicitud-actualizar-investigador/:idUsuario',
        component:ViewSolicitudActualizarInvestigadorComponent       
      }, 
      {
        path:'view-organizacion-investigador',
        component:ViewOrganizacionInvestigadorComponent       
      }, 
      {
        path:'view-catalogo-organizacion-investigador/:idOrganizacion/:siglas',
        component:ViewCatalogoOrganizacionInvestigadorComponent       
      },
    ]
  }
];
import { ViewCatalogoOrganizacionAdminDataSource } from './pages/admin/view-catalogo-organizacion-admin/view-catalogo-organizacion-admin-datasource';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

