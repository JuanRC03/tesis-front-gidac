import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AppWebService } from 'src/app/services/app-web.service';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { MatDrawer } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {


  isMenuOpen1 = false;
  isArrowUp1 = false;

  isMenuOpen2 = false;
  isArrowUp2 = false;

  isMenuOpen3 = false;
  isArrowUp3 = false;

  isMenuOpen4 = false;
  isArrowUp4 = false;

  isMenuOpen5 = false;
  isArrowUp5 = false;

  isMenuOpen6 = false;
  isArrowUp6 = false;

  isMenuOpen7 = false;
  isArrowUp7 = false;

  isMenuOpen8 = false;
  isArrowUp8 = false;

  isMenuOpen9 = false;
  isArrowUp9 = false;

  isMenuOpen10 = false;
  isArrowUp10 = false;


  toggleMenu1() {
    this.isMenuOpen1 = !this.isMenuOpen1;
    this.isArrowUp1 = !this.isArrowUp1;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;

    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
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
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
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
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
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
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
  }

  toggleMenu5() {
    this.isMenuOpen5 = !this.isMenuOpen5;
    this.isArrowUp5 = !this.isArrowUp5;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
  }

  toggleMenu6() {
    this.isMenuOpen6 = !this.isMenuOpen6;
    this.isArrowUp6 = !this.isArrowUp6;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
  }

  toggleMenu7() {
    this.isMenuOpen7 = !this.isMenuOpen7;
    this.isArrowUp7 = !this.isArrowUp7;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
  }

  toggleMenu8() {
    this.isMenuOpen8 = !this.isMenuOpen8;
    this.isArrowUp8 = !this.isArrowUp8;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
  }

  toggleMenu9() {
    this.isMenuOpen9 = !this.isMenuOpen9;
    this.isArrowUp9 = !this.isArrowUp9;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
  }

  toggleMenu10() {
    this.isMenuOpen10 = !this.isMenuOpen10;
    this.isArrowUp10 = !this.isArrowUp10;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
    this.isMenuOpen4 = false;
    this.isArrowUp4 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
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
    this.isMenuOpen5 = false;
    this.isArrowUp5 = false;
    this.isMenuOpen6 = false;
    this.isArrowUp6 = false;
    this.isMenuOpen7 = false;
    this.isArrowUp7 = false;
    this.isMenuOpen8 = false;
    this.isArrowUp8 = false;
    this.isMenuOpen9 = false;
    this.isArrowUp9 = false;
    this.isMenuOpen10 = false;
    this.isArrowUp10 = false;
  }



  @ViewChild('drawer') drawer!: MatDrawer;

  isLoggedIn = false;
  usuario: any = null;
  idUsuario = 0;

  menuVisible = true;

  botonMenuVisible = true;

  imagenUrl: string = '';

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  toggleBoton() {
    this.botonMenuVisible = false;
    this.menuVisible = true;
  }
  public cambiarMenu() {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
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
    public login: LoginService,
    private userService: UserService,
    private appWebService: AppWebService,
    private solicitudAccesoService: SolicitudAccesoService,
    private mediaMatcher: MediaMatcher,
    private router: Router) {


  }

  navbar: any;
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


    /*
        this.appWebService.getNavbar().subscribe(
          res=>{
            this.navbar=res;
            console.log(res);
          },
          err=>console.log(err)
          )*/
  }

  contAux: any;
  contadorDeSolicitudes = {
    contSolAcceso: 0,
    contSolEliminar: 0
  }

  listarContadorDeSolicitudes() {
    this.solicitudAccesoService.getCantidadSolicitude().subscribe(
      res => {
        this.contAux = res;
        this.contadorDeSolicitudes.contSolAcceso = this.contAux.contSolAcceso;
        this.contadorDeSolicitudes.contSolEliminar = this.contAux.contSolEliminar;
        if (this.contadorDeSolicitudes.contSolAcceso == 0) {
          this.hiddenSolicitud = true;
        } else {
          this.hiddenSolicitud = false;
        }
        if (this.contadorDeSolicitudes.contSolEliminar == 0) {
          this.hiddenEliminar = true;
        } else {
          this.hiddenEliminar = false;
        }
      },
      err => console.log(err)
    )

  }

  public logout() {
    this.login.logout();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'La sesión se a cerrado con exito',
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
    this.hiddenEliminar = true;
  }

  recargarPagina() {
    location.reload();
  }
  navegarPagina() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
