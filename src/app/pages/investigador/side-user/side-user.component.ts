import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { InvestigacionInvestigadoresService } from 'src/app/services/investigacion-investigadores.service';
import { Router } from '@angular/router';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { AppWebService } from 'src/app/services/app-web.service';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-side-user',
  templateUrl: './side-user.component.html',
  styleUrls: ['./side-user.component.css']
})
export class SideUserComponent {

  isMenuOpen1 = false;
  isArrowUp1 = false;

  isMenuOpen2 = false;
  isArrowUp2 = false;

  isMenuOpen3 = false;
  isArrowUp3 = false;

  isMenuOpen4 = false;
  isArrowUp4 = false;



  toggleMenu1() {
    this.isMenuOpen1 = !this.isMenuOpen1;
    this.isArrowUp1 = !this.isArrowUp1;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
  }

  toggleMenu2() {
    this.isMenuOpen2 = !this.isMenuOpen2;
    this.isArrowUp2 = !this.isArrowUp2;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
  }

  toggleMenu3() {
    this.isMenuOpen3 = !this.isMenuOpen3;
    this.isArrowUp3 = !this.isArrowUp3;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
  }

  toggleMenu4() {
    this.isMenuOpen4 = !this.isMenuOpen4;
    this.isArrowUp4 = !this.isArrowUp4;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
  }

  esconderToggleMenu() {
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    
  }



  @ViewChild('drawer') drawer!: MatDrawer;

  isLoggedIn = false;
  usuario:any = null;
  idUsuario= 0;
  
  menuVisible = true;

  botonMenuVisible=true;

  imagenUrl: string=''; 

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  toggleBoton() {
    this.botonMenuVisible=false;
    this.menuVisible=true;
  }
  public cambiarMenu(){
    this.isHandset$=this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
      
    );

  

  constructor(private breakpointObserver: BreakpointObserver, 
              public login:LoginService,
              private userService:UserService,
              private appWebService:AppWebService,
              private solicitudAccesoService:SolicitudAccesoService,
              private mediaMatcher: MediaMatcher,
              private router:Router,
              private investigacionInvestigadoresService:InvestigacionInvestigadoresService) {
                

              }

  navbar:any;
  InvestigadorInvestigacion:any = [];
  ngOnInit(): void {
    
    this.isLoggedIn = this.login.isLoggedIn();
    this.usuario = this.login.getUser();
    this.idUsuario = this.usuario.idUsuario;
    this.userService.getImagen(this.idUsuario).subscribe((imagen: Blob) => {
      if (imagen.size > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenUrl = reader.result as string;
        };
        reader.readAsDataURL(imagen);
      } else {
        this.imagenUrl = '../../../../assets/img/auxPerfil.jpg';
      }
    })
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.usuario = this.login.getUser();
        console.log(this.usuario);

      }
    )
    this.listarInvestigaciones();

    
  }

  listarInvestigaciones(){
    this.investigacionInvestigadoresService.listarInvestigacionInvestigador(this.idUsuario).subscribe(
      (data:any) => {
        this.InvestigadorInvestigacion = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  contAux:any;
  contadorDeSolicitudes={
    contSolAcceso:0,
    contSolEliminar:0
  }
  listarContadorDeSolicitudes()
  {
    this.solicitudAccesoService.getCantidadSolicitude().subscribe(
        res=>{
          this.contAux=res;
          this.contadorDeSolicitudes.contSolAcceso=this.contAux.contSolAcceso;
          this.contadorDeSolicitudes.contSolEliminar=this.contAux.contSolEliminar;
          if(this.contadorDeSolicitudes.contSolAcceso==0){
            this.hiddenSolicitud=true;
          }else{
            this.hiddenSolicitud=false;
          }
          if(this.contadorDeSolicitudes.contSolEliminar==0){
            this.hiddenEliminar = true;
          }else{
            this.hiddenEliminar = false;
          }
        },
        err=>console.log(err)
      )

  }

  public logout(){
    this.login.logout();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'La sesión se ha cerrado con exito',
      showConfirmButton: false,
      timer: 3000
    })
    setTimeout(() => {
      this.navegarPagina()
    }, 3000);
  }

  panelOpenState = true;


  hiddenSolicitud = true;

  toggleBadgeVisibilitySolicitud() {
    this.hiddenSolicitud = true;
  }

  hiddenEliminar = false;

  toggleBadgeVisibilityEliminar() {
    this.hiddenEliminar= true;
  }
 
  recargarPagina(){
    location.reload();
  }
  navegarPagina(){
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  actualizarConglomerado(id:any){
    this.router.navigate(['/user-dashboard/view-conglomerados/'+id]).then(() => {
      window.location.reload();
      this.isMenuOpen1=true;
    });
  }

  abrirProyecto(id:any){
    localStorage.setItem('isMenuOpen3', this.isMenuOpen3 ? 'true' : 'false');
    localStorage.setItem('isArrowUp3', this.isArrowUp3 ? 'true' : 'false');
    this.router.navigate(['/user-dashboard/view-dash-proyecto/' + id]).then(() => {
      location.reload();
    });
  }

  toggleMenuProyecto(modelo: any): void {
    modelo.isMenuOpen = !modelo.isMenuOpen;
    this.esconderToggleMenu();
  }
  
}


