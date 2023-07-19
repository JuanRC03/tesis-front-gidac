import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent implements OnInit {

  
constructor(private userService:UserService,private snack:MatSnackBar) { }

public user = {
  username : '',
  cedula : '',
  password : '',
  nombre : '',
  apellido : '',
  email : '',
  telefono : ''
}

ngOnInit(): void {
}

formSubmit(){
  console.log(this.user);
  if(this.user.username == '' || this.user.username == null){
    this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
      duration : 3000,
      verticalPosition : 'top',
      horizontalPosition : 'right'
    });
    return;
  }

  this.userService.aniadirUsuario(this.user).subscribe(
    (data) => {
      console.log(data);
      Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
    },(error) => {
      console.log(error);
      this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
        duration : 3000
      });
    }
  )
}

}
