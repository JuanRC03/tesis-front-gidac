import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { AppWebService } from 'src/app/services/app-web.service';
import { SolicitudAccesoService } from 'src/app/services/solicitud-acceso.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { DirectorAreaInvestigacionService } from 'src/app/services/director-area-investigacion.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-side-director',
  templateUrl: './side-director.component.html',
  styleUrls: ['./side-director.component.css']
})
export class SideDirectorComponent {

  isMenuOpen1 = false;
  isArrowUp1 = false;

  isMenuOpen2 = false;
  isArrowUp2 = false;

  isMenuOpen3 = false;
  isArrowUp3 = false;

  toggleMenu1() {
    this.isMenuOpen1 = !this.isMenuOpen1;
    this.isArrowUp1 = !this.isArrowUp1;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
  }

  toggleMenu2() {
    this.isMenuOpen2 = !this.isMenuOpen2;
    this.isArrowUp2 = !this.isArrowUp2;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
  }

  toggleMenu3() {
    this.isMenuOpen3 = !this.isMenuOpen3;
    this.isArrowUp3 = !this.isArrowUp3;
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
  }

  esconderToggleMenu() {
    this.isMenuOpen1 = false;
    this.isArrowUp1 = false;
    this.isMenuOpen2 = false;
    this.isArrowUp2 = false;
    this.isMenuOpen3 = false;
    this.isArrowUp3 = false;
  }

  menuVisible = true;

  botonMenuVisible=true;

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
  navegarPagina(){
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  @ViewChild('drawer') drawer!: MatDrawer;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  isLoggedIn = false;
  usuario:any = null;
  idUsuario= 0;

  imagenUrl: string=''; 
  

  constructor(private breakpointObserver: BreakpointObserver, 
              public login:LoginService,
              private userService:UserService,
              private appWebService:AppWebService,
              private solicitudAccesoService:SolicitudAccesoService,
              private router:Router,
              private directorAreaInvestigacionService:DirectorAreaInvestigacionService,
  ) {}

  navbar:any;
  subscription: any;
  ngOnInit(): void {
    
    this.isLoggedIn = this.login.isLoggedIn();
    this.usuario = this.login.getUser();
    
    this.idUsuario=this.usuario.idUsuario;
    this.listarContadorDeSolicitudes();

    const intervalo = interval(10 * 60 * 1000); // 10 minutos en milisegundos
    this.subscription = intervalo.pipe(take(2)).subscribe(() => {
      this.ngOnDestroy();
      this.listarContadorDeSolicitudes();
    });
    
    
        this.userService.getImagen(this.idUsuario).subscribe((imagen: Blob)=>{
          if (imagen.size > 0) {
            const reader = new FileReader();
            reader.onload = () => {
              this.imagenUrl = reader.result as string;
            };
            reader.readAsDataURL(imagen);
          }else{
            this.imagenUrl= '../../../../assets/img/auxPerfil.jpg'; 
          }
        })
        
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.usuario = this.login.getUser();
        console.log(this.usuario);
        
      }
    )
    
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  contAux:any;
  contadorDeSolicitudes={
    contSolAcceso:0,
    contSolEliminar:0
  }
  
  listarContadorDeSolicitudes()
  {
    this.solicitudAccesoService.getCantidadSolicitudes(this.idUsuario).subscribe(
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
 

}
