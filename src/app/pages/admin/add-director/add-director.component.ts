import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.css']
})
export class AddDirectorComponent implements OnInit {

  
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
      idRol: 2
    }
  }

  ngOnInit(): void {

  }


  public agregarDirector() {
    if (this.usuario.nombreUsuario.trim() == '' || this.usuario.nombreUsuario.trim() == null) {
      this.snack.open('El nombre del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }
    if (this.usuario.apellidoUsuario.trim() == '' || this.usuario.apellidoUsuario.trim() == null) {
      this.snack.open('El apellido del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.usuario.cedula.trim() == '' || this.usuario.cedula.trim() == null) {
      this.snack.open('La cédula del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.usuario.telefono.trim() == '' || this.usuario.telefono.trim() == null) {
      this.snack.open('El teléfono del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    if (this.usuario.email.trim() == '' || this.usuario.email.trim() == null) {
      this.snack.open('El email del director es requerido !!', 'Aceptar', {
        duration: 3000
      })
      return;
    }

    this.userService.aniadirUsuario(this.usuario).subscribe(
      (data) => {
        Swal.fire('Director añadido', 'El director se añadio con éxito', 'success').then(
          (e) => {
            this.usuario.nombreUsuario='';
            this.usuario.apellidoUsuario='';
            this.usuario.cedula='';
            this.usuario.telefono='';
            this.usuario.email='';
          })
      }, (error) => {
        Swal.fire('Error al anadir director', 'No se registro el nuevo director', 'error');
        console.log(error);
      }
    );
  }

  
}
