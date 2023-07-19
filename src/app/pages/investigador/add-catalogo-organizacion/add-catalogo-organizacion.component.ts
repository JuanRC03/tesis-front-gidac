import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CatalogoOrganizacionService } from 'src/app/services/catalogo-organizacion.service';
import { OrganizacionService } from 'src/app/services/organizacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-catalogo-organizacion',
  templateUrl: './add-catalogo-organizacion.component.html',
  styleUrls: ['./add-catalogo-organizacion.component.css']
})
export class AddCatalogoOrganizacionComponent implements OnInit {

  constructor(
    private catalogoOrganizacionService: CatalogoOrganizacionService,
    private snack: MatSnackBar,
    private route:ActivatedRoute,
    private organizacionService:OrganizacionService) { }

  
  hidePass = true;

  idBusqueda= 0;

  public variableOrganizacion = {
    codigoVariableOrganizacion: '',
    nombreVariableOrganizacion: '',
    descripcion: '',
    organizacion:{
      idOrganizacion:0,
    }
  }

  ngOnInit(): void {
  }

  lista: any = [];
  listarMedidas()
  {
    this.organizacionService.listar().subscribe(
        res=>{
          this.lista=res;
        },
        err=>console.log(err)
      )
  }

  public agregar() {

    if (this.variableOrganizacion.codigoVariableOrganizacion.trim() == '' || this.variableOrganizacion.codigoVariableOrganizacion.trim() == null) {
      this.snack.open('El código de la variable es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.variableOrganizacion.nombreVariableOrganizacion.trim() == '' || this.variableOrganizacion.nombreVariableOrganizacion.trim() == null) {
      this.snack.open('El nombre de la variable es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.variableOrganizacion.descripcion.trim() == '' || this.variableOrganizacion.descripcion.trim() == null) {
      this.snack.open('La descripción de la variable es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.variableOrganizacion.organizacion.idOrganizacion == 0 ) {
      this.snack.open('La organizacion es requerida !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    

    this.catalogoOrganizacionService.guardar(this.variableOrganizacion).subscribe(
      (data) => {
        Swal.fire('Variable añadida añadido', 'La variable de la organizacion se añadio con éxito', 'success').then(
          (e) => {
            this.variableOrganizacion.codigoVariableOrganizacion='';
            this.variableOrganizacion.nombreVariableOrganizacion='';
            this.variableOrganizacion.descripcion='';
            this.variableOrganizacion.organizacion.idOrganizacion=0;
            
          })
      }, (error) => {
        Swal.fire('Error al anadir la variable', 'No se registro la nueva variable de la organización', 'error');
        console.log(error);
      }
    );
  }
}

