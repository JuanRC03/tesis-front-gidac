import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.component.html',
  styleUrls: ['./perfil-administrador.component.css']
})
export class PerfilAdministradorComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private router:Router) { }
  usuarioId= 0;
  user:any = null;

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.params['id'];
    this.userService.obtenerUsuarioID(this.usuarioId).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public actualizarDatos(){
    this.userService.editarUsuario(this.user).subscribe(
      (data) => {
        Swal.fire('Examen actualizado','El examen ha sido actualizado con éxito','success').then(
          (e) => {
            this.router.navigate(["'/admin"]);
          }
        );
      },
      (error) => {
        Swal.fire('Error en el sistema','No se ha podido actualizar el examen','error');
        console.log(error);
      }
    )
  }

}
