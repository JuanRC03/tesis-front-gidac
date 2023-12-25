import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { VariableService } from 'src/app/services/variable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-catalogo-organizacion-admin-datos',
  templateUrl: './view-catalogo-organizacion-admin-datos.component.html',
  styleUrls: ['./view-catalogo-organizacion-admin-datos.component.css']
})
export class ViewCatalogoOrganizacionAdminDatosComponent implements OnInit {

  constructor(private catalogoOrganizacionService: CatalogoOrganizacionService,
    public dialog: MatDialog,
    private route: ActivatedRoute,) {
  }

  displayedColumns = ['dato1', 'dato2', 'dato3', 'opciones'];

  ngAfterViewInit(): void {
  }

  idOrganizacion = 0;
  siglasOrganizacion = '';

  ngOnInit(): void {
    this.idOrganizacion = this.route.snapshot.params['idOrganizacion'];
    this.siglasOrganizacion = this.route.snapshot.params['siglas'];
    this.listar();
    this.listarEliminados();
  }

  listaDatos: any = []

  listar() {
    this.catalogoOrganizacionService.obtenerCatalogoPorOrganizacion(this.idOrganizacion).subscribe(
      res => {
        this.listaDatos = res;
        console.log(this.listaDatos)
      },
      err => console.log(err)
    )
  }

  listaDatosEliminados: any = []

  listarEliminados() {
    this.catalogoOrganizacionService.obtenerCatalogoPorOrganizacionEliminado(this.idOrganizacion).subscribe(
      res => {
        this.listaDatosEliminados = res;
        console.log(this.listaDatos)
      },
      err => console.log(err)
    )
  }


  eliminar(id: any) {
    Swal.fire({
      title: 'Eliminar información',
      text: '¿Estás seguro de eliminar la variable?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.catalogoOrganizacionService.eliminar(id).subscribe(
          (data) => {
            this.listaDatos = this.listaDatos.filter((lista: any) => lista.idVariableOrganizacion != id);
            Swal.fire('Información eliminada', 'La variable ha sido eliminada', 'success').then(() => {
              this.listarEliminados();
            });
          },
          (error) => {
            Swal.fire('Error en el sistema', 'Error al eliminar la variable', 'error');
          }
        )
      }
    })
  }

  restablecer(id:any){
    Swal.fire({
      title:'Restaurar información',
      text:'¿Estás seguro de restaurar la variable?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Restaurar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.catalogoOrganizacionService.restablecer(id).subscribe(
          (data) => {
            this.listaDatosEliminados = this.listaDatosEliminados.filter((datos:any) => datos.idVariableOrganizacion!= id);
            Swal.fire('Información restaurada','La variable ha sido restaurada','success');
            this.listar();
          },
          (error) => {
            Swal.fire('Error','Error al restaurar la variable','error');
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


  agregar(): void {
    const dialogRef = this.dialog.open(DialogAgregarVariableOrganizacionAdminDatos, {
      data: { idOrganizacion: this.idOrganizacion },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listar();

    });
  }

  editar(id: any, dato1: any, dato2: any, dato3: any, dato4: any, dato5: any): void {
    const dialogRef = this.dialog.open(DialogEditarVariableOrganizacionAdminDatos, {
      data: { idVariableOrganizacion: id, codigoVariableOrganizacion: dato1, nombreVariableOrganizacion: dato2, descripcion: dato3, idVariable: dato4, variableSistema: dato5, idOrganizacion: this.idOrganizacion },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.listar();

    });
  }

}





interface DatosActualizar {
  idVariableOrganizacion: 0,
  codigoVariableOrganizacion: '',
  descripcion: '',
  nombreVariableOrganizacion: '',
  vigencia: 1,
  variableSistema: 0,
  idOrganizacion: 0,
  idVariable: 0,
}


@Component({
  selector: 'agregar-variable-catalogo-admin-datos',
  templateUrl: 'agregar-variable-catalogo-admin-datos.html',
  styleUrls: ['./view-catalogo-organizacion-admin-datos.component.css']
})
export class DialogAgregarVariableOrganizacionAdminDatos {
  constructor(

    public dialogRef: MatDialogRef<DialogAgregarVariableOrganizacionAdminDatos>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data1: DatosActualizar,
    private catalogoOrganizacionService: CatalogoOrganizacionService,
    private variableService: VariableService,
  ) { }



  public data = {
    codigoVariableOrganizacion: '',
    descripcion: '',
    nombreVariableOrganizacion: '',
    vigencia: 1,
    variableSistema: 0,
    organizacion: {
      idOrganizacion: 0,
    },
    variable: {
      idVariable: 0
    }
  }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
  }


  idTipoVariableAux = 0;
  ngOnInit(): void {
    this.data.organizacion.idOrganizacion = this.data1.idOrganizacion;
    this.listarVariables();
    this.listar()
  }



  varible: any = []

  listarVariables() {
    this.variableService.listarVigetes().subscribe(
      res => {
        this.varible = res;
      },
      err => console.log(err)
    )
  }

  listaDatos: any = []

  listar() {
    this.catalogoOrganizacionService.obtenerCatalogoPorOrganizacion(this.data1.idOrganizacion).subscribe(
      res => {
        this.listaDatos = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  public agregar() {


    if (this.data.codigoVariableOrganizacion == '') {
      this.snack.open('El código de la variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.nombreVariableOrganizacion == '') {
      this.snack.open('El nombre de la variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.descripcion == '') {
      this.snack.open('La descripción de la variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.variable.idVariable == 0) {
      this.snack.open('La variable equivalente es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    
    let auxCodigo = false;
    let auxNombre = false;
    for (const datosVariable of this.listaDatos) {
      if (datosVariable.codigoVariableOrganizacion == this.data.codigoVariableOrganizacion) {
        auxCodigo = true;
      }
      if (datosVariable.nombreVariableOrganizacion == this.data.nombreVariableOrganizacion) {
        auxNombre = true;
      }
    }
    if (auxCodigo == true && auxNombre==true) {
      this.snack.open('El nombre y código de la variable debe ser unico !!', 'Aceptar', {
        duration: 3000
      });
      return;
    } 

    if (auxCodigo == true) {
      this.snack.open('El código de la variable debe ser unico !!', 'Aceptar', {
        duration: 3000
      });
      return;
    } 

    if (auxNombre==true) {
      this.snack.open('El nombre de la variable debe ser unico !!', 'Aceptar', {
        duration: 3000
      });
      return;
    } 

    

    this.catalogoOrganizacionService.guardar(this.data).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'La variable se agrego con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego la variable', 'error');
        console.log(error);
      }
    );
  }


}

@Component({
  selector: 'editar-variable-catalogo-admin-datos',
  templateUrl: 'editar-variable-catalogo-admin-datos.html',
  styleUrls: ['./view-catalogo-organizacion-admin-datos.component.css']
})
export class DialogEditarVariableOrganizacionAdminDatos {
  constructor(

    public dialogRef: MatDialogRef<DialogEditarVariableOrganizacionAdminDatos>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data1: DatosActualizar,
    private catalogoOrganizacionService: CatalogoOrganizacionService,
    private variableService: VariableService,
  ) { }

  public afterClosed: EventEmitter<void> = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close();
    this.listar()
  }

  listaDatos: any = []

  listar() {
    this.catalogoOrganizacionService.obtenerCatalogoPorOrganizacion(this.data1.idOrganizacion).subscribe(
      res => {
        this.listaDatos = res;
      },
      err => console.log(err)
    )
  }


  idTipoVariableAux = 0;
  ngOnInit(): void {
    this.data.idVariableOrganizacion = this.data1.idVariableOrganizacion;
    this.data.codigoVariableOrganizacion = this.data1.codigoVariableOrganizacion;
    this.data.descripcion = this.data1.descripcion;
    this.data.nombreVariableOrganizacion = this.data1.nombreVariableOrganizacion;
    this.data.variable.idVariable = this.data1.idVariable;
    this.data.organizacion.idOrganizacion = this.data1.idOrganizacion;
    this.data.variableSistema = this.data1.variableSistema;
    
    console.log(this.data.variableSistema)
    console.log(this.data1.variableSistema)
    this.listarVariables();
  }

  public data = {
    idVariableOrganizacion: 0,
    codigoVariableOrganizacion: '',
    descripcion: '',
    nombreVariableOrganizacion: '',
    vigencia: 1,
    variableSistema: 0,
    organizacion: {
      idOrganizacion: 0,
    },
    variable: {
      idVariable: 0
    }
  }



  varible: any = []


  listarVariables() {
    this.variableService.listarVigetes().subscribe(
      res => {
        this.varible = res;
      },
      err => console.log(err)
    )
  }


  public agregar() {

    if (this.data.codigoVariableOrganizacion == '') {
      this.snack.open('El código de la variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.nombreVariableOrganizacion == '') {
      this.snack.open('El nombre de la variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.descripcion == '') {
      this.snack.open('La descripción de la variable es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.data.variable.idVariable == 0) {
      this.snack.open('La variable equivalente es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    let auxCodigo = false;
    let auxNombre = false;
    for (const datosVariable of this.listaDatos) {
      console.log(datosVariable.codigoVariableOrganizacion)
      if (datosVariable.codigoVariableOrganizacion == this.data.codigoVariableOrganizacion) {
        auxCodigo = true;
      }
      if (datosVariable.nombreVariableOrganizacion == this.data.nombreVariableOrganizacion) {
        auxNombre = true;
      }
    }
    if (auxCodigo == true && auxNombre==true) {
      this.snack.open('El nombre y código de la variable debe ser unico !!', 'Aceptar', {
        duration: 3000
      });
      return;
    } 

    if (auxCodigo == true) {
      this.snack.open('El código de la variable debe ser unico !!', 'Aceptar', {
        duration: 3000
      });
      return;
    } 

    if (auxNombre==true) {
      this.snack.open('El nombre de la variable debe ser unico !!', 'Aceptar', {
        duration: 3000
      });
      return;
    } 

    this.catalogoOrganizacionService.actualizar(this.data).subscribe(
      (data) => {
        Swal.fire('Información actualizada', 'La variable se actualizo con éxito', 'success').then(
          (e) => {
            this.afterClosed.emit();
            this.dialogRef.close();
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se actualizado la variable', 'error');
        console.log(error);
      }
    );
  }
}

export interface FamiliaDTO {
  idFamilia: number;
  descripcion: string;
  descripcionCompleta: string;
  checked: boolean;
}


