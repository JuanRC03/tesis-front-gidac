import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-investigador',
  templateUrl: './add-investigador.component.html',
  styleUrls: ['./add-investigador.component.css']
})
export class AddInvestigadorComponent implements OnInit {

  
  constructor(
    private userService: UserService,
    private snack: MatSnackBar) { }

  
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
      idRol: 3
    }
  }

  ngOnInit(): void {

  }


  public agregarInvestigador() {
    if (this.usuario.nombreUsuario.trim() == '' || this.usuario.nombreUsuario.trim() == null) {
      this.snack.open('El nombre del investigador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.usuario.apellidoUsuario.trim() == '' || this.usuario.apellidoUsuario.trim() == null) {
      this.snack.open('El apellido del investigador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.usuario.cedula.trim() == '' || this.usuario.cedula.trim() == null) {
      this.snack.open('La cédula del investigador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.usuario.telefono.trim() == '' || this.usuario.telefono.trim() == null) {
      this.snack.open('El teléfono del investigador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.usuario.email.trim() == '' || this.usuario.email.trim() == null) {
      this.snack.open('El email del investigador es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.userService.aniadirUsuario(this.usuario).subscribe(
      (data) => {
        Swal.fire('Información guardada', 'El investigador se agrego con éxito', 'success').then(
          (e) => {
            this.usuario.nombreUsuario='';
            this.usuario.apellidoUsuario='';
            this.usuario.email='';
            this.usuario.cedula='';
            this.usuario.telefono='';
          })
      }, (error) => {
        Swal.fire('Error en el sistema', 'No se agrego el nuevo investigador', 'error');
        console.log(error);
      }
    );
  }

  
}
