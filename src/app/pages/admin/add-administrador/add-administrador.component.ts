import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-administrador',
  templateUrl: './add-administrador.component.html',
  styleUrls: ['./add-administrador.component.css']
})
export class AddAdministradorComponent implements OnInit {

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,) { }

  
  hidePass = true;

  public usuario = {
    nombreUsuario: '',
    apellidoUsuario: '',
    cedula:'',
    telefono:'',
    email: '',
    contrasenia: '',
    vigencia: 1,
    imagenPerfil: null,
    rol: {
      idRol: 1
    }
  }

  ngOnInit(): void {
    this.usuario.email="";
  }


  public agregarAdministrador() {
    if (this.usuario.nombreUsuario.trim() == '' || this.usuario.nombreUsuario.trim() == null) {
      this.snack.open('El nombre del administrador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.usuario.apellidoUsuario.trim() == '' || this.usuario.apellidoUsuario.trim() == null) {
      this.snack.open('El apellido del administrador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.usuario.cedula.trim() == '' || this.usuario.cedula.trim() == null) {
      this.snack.open('La cédula del administrador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.usuario.telefono.trim() == '' || this.usuario.telefono.trim() == null) {
      this.snack.open('El teléfono del administrador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.usuario.email.trim() == '' || this.usuario.email.trim() == null) {
      this.snack.open('El email del administrador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.userService.aniadirUsuario(this.usuario).subscribe(
      (data) => {
        Swal.fire('Administrador añadido', 'El administrador se añadio con éxito', 'success').then(
          (e) => {
            this.usuario.nombreUsuario='';
            this.usuario.apellidoUsuario='';
            this.usuario.cedula='';
            this.usuario.telefono='';
            this.usuario.email='';
          })
      }, (error) => {
        Swal.fire('Error al anadir administrador', 'No se registro el nuevo administrador', 'error');
        console.log(error);
      }
    );
  }

  
}