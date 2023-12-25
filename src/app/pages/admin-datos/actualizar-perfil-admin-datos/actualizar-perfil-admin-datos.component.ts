import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-perfil-admin-datos',
  templateUrl: './actualizar-perfil-admin-datos.component.html',
  styleUrls: ['./actualizar-perfil-admin-datos.component.css']
})
export class ActualizarPerfilAdminDatosComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private userService:UserService,
              private loginService:LoginService,
              private router:Router,
              private snack:MatSnackBar,
              private sanitizer:DomSanitizer) { }

  idUsuario= 0;
  user:any = null;

  public userFinal = {
    idUsuario:0,
    nombreUsuario : '',
    apellidoUsuario : '',
    cedula:'',
    telefono:'',
    email : '',
    contrasenia : '',
    vigencia: 0,
    imagenPerfil:null as any,
    fechaCreacion:Date,
    rol:{
      idRol:4
    }
  }

  usuarioFin:any=null;

  loginData = {
    "email" : '',
    "contrasenia" : '',
  }

  datosUs={
    "email" : '',
    "contrasenia" : '',
  }

  imageUrl:any;
  imagenUrl: string='';
  imagenUrlAux: string='';
  imagen: File= new File([], "");

  file: File = new File([], "");
  
  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.params['id'];
    this.userService.obtenerUsuarioID(this.idUsuario).subscribe(
      (data:any) => {
        this.user = data;
        
        this.userFinal.idUsuario=this.idUsuario;
        this.userFinal.nombreUsuario=this.user.nombreUsuario;
        this.userFinal.apellidoUsuario=this.user.apellidoUsuario;
        this.userFinal.email=this.user.email;
        this.userFinal.cedula=this.user.cedula;
        this.userFinal.telefono=this.user.telefono;
        this.userFinal.imagenPerfil=this.user.imagenPerfil;
        this.userFinal.vigencia=this.user.vigencia;
        this.userFinal.fechaCreacion=this.user.fechaCreacion;
        this.loginData.email=this.user.email;
        
        this.userService.getImagen(this.idUsuario).subscribe((imagen: Blob)=>{
          if (imagen.size > 0) {
            const reader = new FileReader();
            reader.onload = () => {
            this.imagenUrl = reader.result as string;
            this.imagenUrlAux= reader.result as string;
          };
          reader.readAsDataURL(imagen);
          }else{
            this.imagenUrl= '../../../../assets/img/auxPerfil.jpg'; 
            this.imagenUrlAux = '../../../../assets/img/auxPerfil.jpg'; 
          }
        })
      },
      (error) => {
        console.log(error);
      }
    )
  }


  public actualizarDatos(){
    if(this.userFinal.nombreUsuario.trim() == '' || this.userFinal.nombreUsuario.trim() == null){
      this.snack.open('El nombre es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.userFinal.apellidoUsuario.trim() == '' || this.userFinal.apellidoUsuario.trim() == null){
      this.snack.open('El apellido es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }
    if(this.userFinal.cedula.trim() == '' || this.userFinal.cedula.trim() == null){
      this.snack.open('La cédula es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.userFinal.telefono.trim() == '' || this.userFinal.telefono.trim() == null){
      this.snack.open('El teléfono es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.userFinal.email.trim() == '' || this.userFinal.email.trim() == null){
      this.snack.open('El email es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.contrasenia.trim() == '' || this.loginData.contrasenia.trim() == null){
      this.snack.open('La contraseña antigua es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.userFinal.contrasenia.trim() == '' || this.userFinal.contrasenia.trim() == null){
      this.snack.open('La contraseña nueva es requerida  !!','Aceptar',{
        duration:3000
      })
      return;
    }
    
    this.loginService.generateToken(this.loginData).subscribe(
      (data1:any) => {
        localStorage.clear();
        const formData = new FormData();
        formData.append('user', JSON.stringify(this.userFinal));
        formData.append('imagen', this.imagen);
        
        this.userService.editarPerfil(formData).subscribe(
          (data) => {
            Swal.fire('Información actualizada','El perfil ha sido actualizado con éxito','success').then(
              (e) => {
                  this.loginData.contrasenia=this.userFinal.contrasenia;
                  this.loginData.email=this.userFinal.email;

                  this.loginService.generateToken(this.loginData).subscribe(
                  (data2:any) => {
                    this.loginService.loginUser(data2.token);

                    this.loginService.getCurrentUser().subscribe((user1:any) => {
                      this.loginService.setUser(user1);
                      location.reload();
                    })
                    
                    },(error) => {
                        Swal.fire('Error en el sistema','Perfil no encontrado','error');
                        console.log(error);
                      }
                 )
                },(error) => {
                  Swal.fire('Error en el sistema','Login fallido, cierre sesión y vuelva a ingresar','error');
                  console.log(error);
                }
            );
          },
          (error) => {
            Swal.fire('Error en el sistema','Los datos ingresados no son validos','error');
            console.log(error);
            
          }
        )
      },(error) => {
        Swal.fire('Error en el sistema','La contraseña antigua ingresada no es valida','error');
        console.log(error);
      }
    )
  }

  hidePass1 = true;
  hidePass2 = true;

  onFotoSeleccionada(event: any)  {
    if(event.target.files && event.target.files.length > 0){
      this.imagen = event.target.files[0];
      console.log(this.imagen );
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagenUrl = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }else{
      this.imagenUrl=this.imagenUrlAux;
    }
  }
}
