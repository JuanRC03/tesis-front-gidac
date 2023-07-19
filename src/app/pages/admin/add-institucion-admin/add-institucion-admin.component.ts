import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CantonService } from 'src/app/services/canton.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import { PaisService } from 'src/app/services/pais.service';
import { ParroquiaService } from 'src/app/services/parroquia.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-institucion-admin',
  templateUrl: './add-institucion-admin.component.html',
  styleUrls: ['./add-institucion-admin.component.css']
})
export class AddInstitucionAdminComponent implements OnInit {

  datos = {
    nombreInstitucion: '',
    siglas: '',
    contacto: '',
    pagina: '',
    correo: '',
    telefono: '',
  }


  constructor(private institucionService:InstitucionService,
    private snack:MatSnackBar,
    private router:Router,
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
    private cantonService:CantonService,
    private parroquiaService:ParroquiaService
    ) { }

  ngOnInit(): void {
    this.listarPaises();
  }

  public paisSeleccionado = {
    codigoPais: '',
  }

  public provinciaSeleccionado = {
    codigoProvincia: '',
  }

  public cantonSeleccionado = {
    codigoCanton: '',
  }

  public parroquiaSeleccionado = {
    codigoParroquia: '',
  }

  listaPaises : any = []
  listaProvincias : any = []
  listaCantones : any = []
  listaParroquias : any = []

  listarPaises()
    {
      
      this.paisService.listar().subscribe(
          (res:any)=>{
            this.listaPaises=res;
            this.listaProvincias= [];
            this.listaCantones= [];
            this.listaParroquias = [];
            this.provinciaSeleccionado.codigoProvincia="";
            
          },
          err=>console.log(err)
        )
    }

    listarProvincias()
    {
      this.listaCantones= []
            this.listaParroquias = []
      this.provinciaService.obtenerPorPais(this.paisSeleccionado.codigoPais).subscribe(
          (res:any)=>{
            this.listaProvincias=res
            this.listaCantones= []
            this.listaParroquias = []
            this.cantonSeleccionado.codigoCanton='';
            this.parroquiaSeleccionado.codigoParroquia='';
          },
          err=>console.log(err)
        )
    }

    listarCantones()
    {
      this.listaParroquias = []
      this.cantonService.obtenerPorProvincia(this.provinciaSeleccionado.codigoProvincia).subscribe(
          (res:any)=>{
            this.listaCantones=res;
            this.listaParroquias = []
            this.parroquiaSeleccionado.codigoParroquia='';
          },
          err=>console.log(err)
        )
    }

    listarParroquias()
    {
      console.log("hola");
      this.parroquiaService.obtenerPorCanton(this.cantonSeleccionado.codigoCanton).subscribe(
          (res:any)=>{
            this.listaParroquias = res;
          },
          err=>console.log(err)
        )
    }

  formSubmit(){
    if(this.datos.nombreInstitucion.trim() == '' || this.datos.nombreInstitucion == null){
      this.snack.open("El nombre de la institucion es requerida !!",'',{
        duration:3000
      })
      return ;
    }

    if(this.datos.siglas.trim() == '' || this.datos.siglas == null){
      this.snack.open("Las siglas de la institucion es requerida !!",'',{
        duration:3000
      })
      return ;
    }

    if(this.datos.pagina.trim() == '' || this.datos.pagina == null){
      this.snack.open("EL url de la página de la institucion es requerida !!",'',{
        duration:3000
      })
      return ;
    }

    if(this.datos.contacto.trim() == '' || this.datos.contacto == null){
      this.snack.open("El nombre del contacto de la institucion es requerida !!",'',{
        duration:3000
      })
      return ;
    }

    if(this.datos.telefono.trim() == '' || this.datos.telefono == null){
      this.snack.open("El teléfono del contacto de la institucion es requerida !!",'',{
        duration:3000
      })
      return ;
    }

    if(this.datos.correo.trim() == '' || this.datos.correo == null){
      this.snack.open("El correo del contacto de la institucion es requerida !!",'',{
        duration:3000
      })
      return ;
    }


    if(this.parroquiaSeleccionado.codigoParroquia.trim() == '' || this.parroquiaSeleccionado.codigoParroquia == null){
      this.snack.open("La ubicacion de la institucion es requerida !!",'',{
        duration:3000
      })
      return ;
    }

    
    this.institucionService.guardar(this.datos).subscribe(
      (dato:any) => {
        this.datos.nombreInstitucion = '';
        this.datos.siglas = '';
        this.datos.pagina = '';
        this.datos.contacto = '';
        this.datos.correo = '';
        this.datos.telefono = '';
        Swal.fire('Institución agregada','La institucin ha sido agregada con éxito','success');
        this.router.navigate(['/admin/ubicaTable']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!','Error al guardar la institución','error')
      }
    )
  }

}
