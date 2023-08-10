
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashUserComponent } from './pages/investigador/dash-user/dash-user.component';

import { PerfilAdministradorComponent } from './pages/admin/perfil-administrador/perfil-administrador.component';
import { AddUsuariosComponent } from './pages/admin/add-usuarios/add-usuarios.component';
import { ActualizarUsuariosComponent } from './pages/admin/actualizar-usuarios/actualizar-usuarios.component';
import { ViewUserComponent } from './pages/admin/view-user/view-user.component';
import { ActualizarPerfilComponent } from './pages/admin/actualizar-perfil/actualizar-perfil.component';
import { ActualizarPerfilUsuarioComponent } from './pages/investigador/actualizar-perfil-usuario/actualizar-perfil-usuario.component';
import { AddInvestigacionComponent } from './pages/admin/add-investigacion/add-investigacion.component';
import { ViewInvestigacionComponent } from './pages/admin/view-investigacion/view-investigacion.component';
import { ViewInvestigadoresComponent } from './pages/admin/view-investigadores/view-investigadores.component';
import { AddInvestigadoresInvestigacionComponent } from './pages/admin/add-investigadores-investigacion/add-investigadores-investigacion.component';
import { UsuariosTableComponent } from './pages/admin/usuarios-table/usuarios-table.component';
import { CarbonoTableComponent } from './pages/investigador/carbono-table/carbono-table.component';
import { AddCarbonoComponent } from './pages/investigador/add-carbono/add-carbono.component';
import { DashAdminComponent } from './pages/admin/dash-admin/dash-admin.component';
import { SideComponent } from './pages/admin/side/side.component';
import { SideUserComponent } from './pages/investigador/side-user/side-user.component';
import { SideDirectorComponent } from './pages/director/side-director/side-director.component';
import { DirectorGuard } from './services/director.guard';
import { DashDirecComponent } from './pages/director/dash-direc/dash-direc.component';
import { SolicitudesAccesoComponent } from './pages/director/solicitudes-acceso/solicitudes-acceso.component';
import { SolicitudesEliminarComponent } from './pages/director/solicitudes-eliminar/solicitudes-eliminar.component';
import { ActualizarInformacionWebComponent } from './pages/admin/actualizar-informacion-web/actualizar-informacion-web.component';
import { HomeComponent } from './pages/home/home.component';
import { AddAdministradorComponent } from './pages/admin/add-administrador/add-administrador.component';
import { AddDirectorComponent } from './pages/admin/add-director/add-director.component';
import { ViewAdministradorComponent } from './pages/admin/view-administrador/view-administrador.component';
import { ViewDirectorComponent } from './pages/admin/view-director/view-director.component';
import { AddAreaInvestigacionComponent } from './pages/admin/add-area-investigacion/add-area-investigacion.component';
import { ViewAreaInvestigacionComponent } from './pages/admin/view-area-investigacion/view-area-investigacion.component';
import { AddInvestigadorComponent } from './pages/director/add-investigador/add-investigador.component';
import { ViewInvestigadorComponent } from './pages/director/view-investigador/view-investigador.component';
import { AddProyectoInvestigacionComponent } from './pages/director/add-proyecto-investigacion/add-proyecto-investigacion.component';
import { ViewProyectoInvestigacionComponent } from './pages/director/view-proyecto-investigacion/view-proyecto-investigacion.component';
import { ViewInvestigadoresDeProyectosInvestigacionComponent } from './pages/director/view-investigadores-de-proyectos-investigacion/view-investigadores-de-proyectos-investigacion.component';
import { AddInvestigadorEnProyectoInvestigacionComponent } from './pages/director/add-investigador-en-proyecto-investigacion/add-investigador-en-proyecto-investigacion.component';
import { ActualizarPerfilDirectorComponent } from './pages/director/actualizar-perfil-director/actualizar-perfil-director.component';
import { ViewConglomeradosComponent } from './pages/investigador/view-conglomerados/view-conglomerados.component';
import { ViewDatoRecolectadoComponent } from './pages/investigador/view-dato-recolectado/view-dato-recolectado.component';
import { ViewParcelaComponent } from './pages/investigador/view-parcela/view-parcela.component';
import { ViewPuntoComponent } from './pages/investigador/view-punto/view-punto.component';
import { ViewMedidaComponent } from './pages/investigador/view-medida/view-medida.component';
import { ViewVariablesComponent } from './pages/investigador/view-variables/view-variables.component';
import { ViewProfundidadesComponent } from './pages/investigador/view-profundidades/view-profundidades.component';

import { AddConglomeradoComponent } from './pages/investigador/add-conglomerado/add-conglomerado.component';
import { AddDatoRecolectadoComponent } from './pages/investigador/add-dato-recolectado/add-dato-recolectado.component';
import { AddMedidaComponent } from './pages/investigador/add-medida/add-medida.component';
import { AddParcelaComponent } from './pages/investigador/add-parcela/add-parcela.component';
import { AddProfundidadComponent } from './pages/investigador/add-profundidad/add-profundidad.component';
import { AddPuntoComponent } from './pages/investigador/add-punto/add-punto.component';
import { AddVariableComponent } from './pages/investigador/add-variable/add-variable.component';
import { ViewInformacionWebComponent } from './pages/admin/view-informacion-web/view-informacion-web.component';
import { ViewTipoVariableComponent } from './pages/investigador/view-tipo-variable/view-tipo-variable.component';
import { ViewAlturaComponent } from './pages/investigador/view-altura/view-altura.component';
import { AddAlturaComponent } from './pages/investigador/add-altura/add-altura.component';
import { AddTipoVariableComponent } from './pages/investigador/add-tipo-variable/add-tipo-variable.component';

import { ViewAccesoComponent } from './pages/admin/view-acceso/view-acceso.component';
import { ImportarXlsComponent } from './pages/investigador/importar-xls/importar-xls.component';
import { ViewCatalogoOrganizacionComponent } from './pages/investigador/view-catalogo-organizacion/view-catalogo-organizacion.component';
import { AddCatalogoOrganizacionComponent } from './pages/investigador/add-catalogo-organizacion/add-catalogo-organizacion.component';
import { ViewVariableProyectoComponent } from './pages/investigador/view-variable-proyecto/view-variable-proyecto.component';
import { DescargarDatosComponent } from './pages/investigador/descargar-datos/descargar-datos.component';
import { MapaEjemploComponent } from './pages/mapa-ejemplo/mapa-ejemplo.component';
import { MapaComponent } from './pages/investigador/mapa/mapa.component';

import { ViewPaisAdminComponent } from './pages/admin/view-pais-admin/view-pais-admin.component';
import { ViewProvinciaAdminComponent } from './pages/admin/view-provincia-admin/view-provincia-admin.component';
import { ViewCantonAdminComponent } from './pages/admin/view-canton-admin/view-canton-admin.component';
import { ViewParroquiaAdminComponent } from './pages/admin/view-parroquia-admin/view-parroquia-admin.component';
import { ViewTipoProyectoAdminComponent } from './pages/admin/view-tipo-proyecto-admin/view-tipo-proyecto-admin.component';
import { ViewTipoInvestigacionAdminComponent } from './pages/admin/view-tipo-investigacion-admin/view-tipo-investigacion-admin.component';
import { ViewSectorImpactoAdminComponent } from './pages/admin/view-sector-impacto-admin/view-sector-impacto-admin.component';
import { ViewLineaInvestigacionAdminComponent } from './pages/admin/view-linea-investigacion-admin/view-linea-investigacion-admin.component';
import { ViewInstitucionAdminComponent } from './pages/admin/view-institucion-admin/view-institucion-admin.component';
import { AddInstitucionComponent } from './pages/admin/add-institucion/add-institucion.component';
import { AddInstitucionAdminComponent } from './pages/admin/add-institucion-admin/add-institucion-admin.component';
import { ViewAreaInvestigacionesAdminComponent } from './pages/admin/view-area-investigaciones-admin/view-area-investigaciones-admin.component';
import { ConvertirXlsComponent } from './pages/investigador/convertir-xls/convertir-xls.component';
import { ViewLocalizacionAdminComponent } from './pages/admin/view-localizacion-admin/view-localizacion-admin.component';
import { AddLocalizacionAdminComponent } from './pages/admin/add-localizacion-admin/add-localizacion-admin.component';
import { ViewDashProyectoComponent } from './pages/investigador/view-dash-proyecto/view-dash-proyecto.component';
import { ViewCatalogoEspochAdminComponent } from './pages/admin/view-catalogo-espoch-admin/view-catalogo-espoch-admin.component';
import { ViewCatalogoOrganizacionAdminComponent } from './pages/admin/view-catalogo-organizacion-admin/view-catalogo-organizacion-admin.component';
import { ViewOrganizacionAdminComponent } from './pages/admin/view-organizacion-admin/view-organizacion-admin.component';
import { ViewFamiliaAdminComponent } from './pages/admin/view-familia-admin/view-familia-admin.component';
import { ImportarCatalogoOrganizacionComponent } from './pages/admin/importar-catalogo-organizacion/importar-catalogo-organizacion.component';
import { ImportarCatalogoEspochComponent } from './pages/admin/importar-catalogo-espoch/importar-catalogo-espoch.component';
import { AddEquivalenciaVariableComponent } from './pages/admin/add-equivalencia-variable/add-equivalencia-variable.component';
import { ViewEquivalenciaVariableComponent } from './pages/admin/view-equivalencia-variable/view-equivalencia-variable.component';
import { ViewVariablesAdminComponent } from './pages/admin/view-variables-admin/view-variables-admin.component';
import { ViewAreasComponent } from './pages/investigador/view-areas/view-areas.component';
import { ViewCatalogoEspochInvestigadorComponent } from './pages/investigador/view-catalogo-espoch-investigador/view-catalogo-espoch-investigador.component';
import { ViewCatalogoOrganizacionInvestigadorComponent } from './pages/investigador/view-catalogo-organizacion-investigador/view-catalogo-organizacion-investigador.component';
import { ViewSolicitudActualizarInvestigadorComponent } from './pages/investigador/view-solicitud-actualizar-investigador/view-solicitud-actualizar-investigador.component';

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
        path:'addUsuario',
        component:AddUsuariosComponent
      },
      {
        path:'actualizarPerfil/:id',
        component:ActualizarPerfilComponent
      },
      
      
      {
        path:'actualizarUsuario/:id',
        component:ActualizarUsuariosComponent
      },
      
      {
        path:'actualizar-informacion-app-web/:id',
        component:ActualizarInformacionWebComponent
      },
      {
        path:'addInvestigacion',
        component:AddInvestigacionComponent
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
        path:'add-area-investigacion',
        component:AddAreaInvestigacionComponent
      },

      {
        path:'view-area-investigacion',
        component:ViewAreaInvestigacionComponent
      },
      

      {
        path:'usuariosTable',
        component:UsuariosTableComponent
      },

      {
        path:'viewUser',
        component:ViewUserComponent 
      },
      {
        path:'viewInvestigacion',
        component:ViewInvestigacionComponent 
      },
      {
        path : '',
        component : DashAdminComponent
      },
      
      /*
      {
        path:'ubicaciones',
        component:ViewUbicacionComponent
      },
      {
        path:'add-ubicacion',
        component:AddUbicacionComponent
      },
      {
        path:'ubicacion/:idUbicacion',
        component:ActualizarUbicacionComponent
      },*/

      {
        path:'perfilAdmin/:id',
        component:PerfilAdministradorComponent
      },

      

      
      {
        path:'ver-investigador-investigacion/:idInvestigacion/:nombreInvestigacion',
        component:ViewInvestigadoresComponent
      },
      
      
      {
        path:'add-investigadores-investigador/:idInvestigacion/:nombreInvestigacion',
        component : AddInvestigadoresInvestigacionComponent
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
        path:'add-localizacion-admin',
        component:AddLocalizacionAdminComponent
      },
      {
        path:'view-localizacion-admin',
        component:ViewLocalizacionAdminComponent
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
        path:'view-institucion-admin',
        component:ViewInstitucionAdminComponent
      },

      {
        path:'add-institucion-admin',
        component:AddInstitucionAdminComponent
      },

      {
        path:'view-area-investigacion-admin',
        component:ViewAreaInvestigacionesAdminComponent
      },

      {
        path:'view-catalogo-espoch-admin',
        component:ViewCatalogoEspochAdminComponent
      },

      {
        path:'view-catalogo-organizacion-admin',
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
        path:'add-equivalencia-variable',
        component:AddEquivalenciaVariableComponent
      },

      {
        path:'view-equivalencia-variable',
        component:ViewEquivalenciaVariableComponent
      },

      {
        path:'view-variable-admin',
        component:ViewVariablesAdminComponent
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
      }
      
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
        path:'mapa',
        component:MapaComponent
      },
      
      {
        path:'carbonoTable/:id',
        component:CarbonoTableComponent
      },
      {
        path:'add-Carbono-ETL/:id',
        component:AddCarbonoComponent
      },
      {
        path:'actualizarPerfilUser/:id',
        component:ActualizarPerfilUsuarioComponent
      },
      {
        path:'view-variables-proyecto/:idProyecto',
        component:ViewVariableProyectoComponent
      },
      

      {
        path:'view-conglomerados/:idProyecto',
        component:ViewConglomeradosComponent
      },
      {
        path:'add-conglomerado/:idProyecto',
        component:AddConglomeradoComponent  
      },
      

      {
        path:'view-parcelas/:idConglomerado/:idProyecto',
        component:ViewParcelaComponent
      },
      {
        path:'add-parcela/:idConglomerado/:idProyecto',
        component:AddParcelaComponent     
      },


      {
        path:'view-puntos/:idParcela/:idConglomerado/:idProyecto',
        component:ViewPuntoComponent
      },
      {
        path:'add-punto/:idParcela/:idConglomerado/:idProyecto',
        component:AddPuntoComponent      
      },



      {
        path:'view-datos-recolectados/:idPunto/:idParcela/:idConglomerado/:idProyecto',
        component:ViewDatoRecolectadoComponent
      },
      {
        path:'add-dato-recolectado/:idPunto/:idParcela/:idConglomerado/:idProyecto',
        component:AddDatoRecolectadoComponent   
      },
      
      
      {
        path:'view-medidas',
        component:ViewMedidaComponent
      },
      {
        path:'view-variables',
        component:ViewVariablesComponent
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
        path:'add-profundidad',
        component:AddProfundidadComponent      
      },

      {
        path:'add-variable-proyecto/:idProyecto',
        component:AddVariableComponent       
      },

      {
        path:'descargar-datos/:idProyecto',
        component:DescargarDatosComponent       
      },

      
      {
        path:'add-tipo-variable',
        component:AddTipoVariableComponent       
      },

      {
        path:'add-altura',
        component:AddAlturaComponent       
      },

      {
        path:'view-altura',
        component:ViewAlturaComponent       
      },

      {
        path:'view-tipo-variable',
        component:ViewTipoVariableComponent       
      },  

      {
        path:'importar-xls/:idProyecto',
        component:ImportarXlsComponent       
      },
      {
        path:'view-catalogo-organizacion',
        component:ViewCatalogoOrganizacionComponent       
      },
      {
        path:'add-catalogo-organizacion',
        component:AddCatalogoOrganizacionComponent       
      }, 
      
      {
        path:'convertir-xls',
        component:ConvertirXlsComponent       
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
        path:'view-catalogo-espoch-investigador',
        component:ViewCatalogoEspochInvestigadorComponent       
      }, 

      {
        path:'view-catalogo-organizacion-investigador',
        component:ViewCatalogoOrganizacionInvestigadorComponent       
      }, 

      {
        path:'view-solicitud-actualizar-investigador/:idUsuario',
        component:ViewSolicitudActualizarInvestigadorComponent       
      }, 
  

      
      
  
      


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

