import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-actualizar-usuarios',
  templateUrl: './actualizar-usuarios.component.html',
  styleUrls: ['./actualizar-usuarios.component.css']
})
export class ActualizarUsuariosComponent implements OnInit {


  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private loginService:LoginService,
              private router:Router,
              private snack:MatSnackBar) { }
  usuarioId= 0;
  user:any = null;

  public userFinal = {
    id:0,
    username : '',
    password : '',
    nombre : '',
    apellido : '',
    email : '',
    telefono : '',
    enabled: 0
  }

  loginData = {
    "username" : '',
    "password" : '',
  }

  datosUs={
    "username" : '',
    "password" : '',
  }

  ngOnInit(): void {
    this.usuarioId = this.route.snapshot.params['id'];
    this.userService.obtenerUsuarioID(this.usuarioId).subscribe(
      (data) => {
        this.user = data;
        this.userFinal.id=this.usuarioId;
        this.userFinal.username=this.user.username;
        this.userFinal.nombre=this.user.nombre;
        this.userFinal.apellido=this.user.apellido;
        this.userFinal.email=this.user.email;
        this.userFinal.telefono=this.user.telefono;
        this.userFinal.enabled=this.user.enabled;
        this.loginData.username=this.user.username;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  bool=true;

  public actualizarDatos(){


    if(this.userFinal.username.trim() == '' || this.userFinal.username.trim() == null){
      this.snack.open('El username del usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.userFinal.nombre.trim() == '' || this.userFinal.nombre.trim() == null){
      this.snack.open('El nombre del usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.userFinal.apellido.trim() == '' || this.userFinal.apellido.trim() == null){
      this.snack.open('El apellido del usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.userFinal.email.trim() == '' || this.userFinal.email.trim() == null){
      this.snack.open('El email del usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.userFinal.telefono.trim() == '' || this.userFinal.telefono.trim() == null){
      this.snack.open('El teléfono del usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      this.snack.open('La contraseña antigua del usuario es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.userFinal.password.trim() == '' || this.userFinal.password.trim() == null){
      this.snack.open('La contraseña nueva del usuario es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }
    /*
    this.loginService.generateToken(this.loginData).subscribe(
      (data1:any) => {
        localStorage.clear();
        this.loginService.editarUsuario(this.userFinal).subscribe(
          (data) => {
            Swal.fire('Perfil actualizado','El perfil ha sido actualizado con éxito','success').then(
              (e) => {
                  this.loginData.password=this.userFinal.password;
                  this.loginData.username=this.userFinal.username;

                  this.loginService.generateToken(this.loginData).subscribe(
                  (data2:any) => {
                    this.loginService.loginUser(data2.token);

                    this.loginService.getCurrentUser().subscribe((user1:any) => {
                      this.loginService.setUser(user1);
                      location.reload();
                    })
                    
                    },(error) => {
                        Swal.fire('Error al actualizar el perfil','Perfil no encontrado','error');
                        console.log(error);
                      }
                 )
                },(error) => {
                  Swal.fire('Error al actualizar el perfil','Login fallido, cierre sesión y vuelva a ingresar','error');
                  console.log(error);
                }
            );
          },
          (error) => {
            Swal.fire('Error al actualizar el perfil','Los datos ingresados no son validos','error');
            console.log(error);
          }
        )
      },(error) => {
        Swal.fire('Error al actualizar el perfil','La contraseña antigua ingresada no es valida','error');
        console.log(error);
      }
    )
    */
  }
  hidePass1 = true;
  hidePass2 = true;
}
