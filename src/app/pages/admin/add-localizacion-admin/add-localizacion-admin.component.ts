import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-localizacion-admin',
  templateUrl: './add-localizacion-admin.component.html',
  styleUrls: ['./add-localizacion-admin.component.css']
})
export class AddLocalizacionAdminComponent implements OnInit {

  constructor(private ubicacionService:UbicacionService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.listarPaises();
  }

  public paisSeleccionado1 = {
    codigoPais: '',
    nombrePais:'',
  }

  public provinciaSeleccionado1 = {
    codigoProvincia: '',
    nombreProvincia:'',
  }

  public cantonSeleccionado1 = {
    codigoCanton: '',
    nombreCanton:'',
  }

  public parroquiaSeleccionado1 = {
    idLocalizacion: 0,
    codigoParroquia: '',
    nombreParroquia:'',
  }
  public paisSeleccionado2 = {
    codigoPais: '',
    nombrePais:'',
  }

  public provinciaSeleccionado2 = {
    codigoProvincia: '',
    nombreProvincia:'',
  }

  public cantonSeleccionado2 = {
    codigoCanton: '',
    nombreCanton:'',
  }

  public parroquiaSeleccionado2 = {
    idLocalizacion: 0,
    codigoParroquia: '',
    nombreParroquia:'',
  }
  public paisSeleccionado3 = {
    codigoPais: '',
    nombrePais:'',
  }

  public provinciaSeleccionado3 = {
    codigoProvincia: '',
    nombreProvincia:'',
  }

  public cantonSeleccionado3 = {
    codigoCanton: '',
    nombreCanton:'',
  }

  public parroquiaSeleccionado3 = {
    idLocalizacion: 0,
    codigoParroquia: '',
    nombreParroquia:'',
  }

  public nuevaLocalizacion1 = {
    codigoPais: '',
    nombrePais:'',
    codigoProvincia: '',
    nombreProvincia:'',
    codigoCanton: '',
    nombreCanton:'',
    codigoParroquia: '',
    nombreParroquia:'',
  }

  public nuevaLocalizacion2 = {
    codigoPais: '',
    nombrePais:'',
    codigoProvincia: '',
    nombreProvincia:'',
    codigoCanton: '',
    nombreCanton:'',
    codigoParroquia: '',
    nombreParroquia:'',
  }

  public nuevaLocalizacion3 = {
    codigoPais: '',
    nombrePais:'',
    codigoProvincia: '',
    nombreProvincia:'',
    codigoCanton: '',
    nombreCanton:'',
    codigoParroquia: '',
    nombreParroquia:'',
  }

  public nuevaLocalizacion4 = {
    codigoPais: '',
    nombrePais:'',
    codigoProvincia: '',
    nombreProvincia:'',
    codigoCanton: '',
    nombreCanton:'',
    codigoParroquia: '',
    nombreParroquia:'',
  }

  usuarioDirector = {
    idUsuario: 0
  }

  listaPaises : any = []
  listaPaises1 : any = []
  listaPaises2 : any = []
  listaPaises3 : any = []
  listaProvincias3 : any = []
  listaCantones3 : any = []
  listaParroquias3 : any = []

  listaProvincias2 : any = []
  listaCantones2 : any = []
  listaParroquias2 : any = []

  listaProvincias1 : any = []
  listaCantones1 : any = []
  listaParroquias1 : any = []

  listarPaises()
    {
      
      this.ubicacionService.obtenerPaises().subscribe(
          (res:any)=>{
            this.listaPaises=res;
            this.listaPaises1=res;
            this.listaPaises2=res;
            this.listaPaises3=res;
            this.listaProvincias1= [];
            this.listaCantones1= [];
            this.listaParroquias1 = [];
            
            this.listaProvincias2= [];
            this.listaCantones2= [];
            this.listaParroquias2 = [];

            this.listaProvincias3= [];
            this.listaCantones3= [];
            this.listaParroquias3 = [];

            this.provinciaSeleccionado1.codigoProvincia="";
            this.provinciaSeleccionado2.codigoProvincia="";
            this.provinciaSeleccionado3.codigoProvincia="";
            
          },
          err=>console.log(err)
        )
    }

    listarProvincias1()
    {
      this.listaCantones1= []
      this.listaParroquias1 = []
      this.nuevaLocalizacion1.codigoPais=this.paisSeleccionado1.codigoPais;
      this.nuevaLocalizacion1.nombrePais=this.paisSeleccionado1.nombrePais;
      this.nuevaLocalizacion1.codigoCanton='';
      this.nuevaLocalizacion1.nombreCanton=''
      this.nuevaLocalizacion1.codigoProvincia='';
      this.nuevaLocalizacion1.nombreProvincia='';
      this.ubicacionService.obtenerProvincias(this.paisSeleccionado1.codigoPais).subscribe(
          (res:any)=>{
            this.listaProvincias1=res
            this.listaCantones1= []
            this.listaParroquias1 = []
            this.listaCantones2= []
            this.listaParroquias2 = []
            this.listaCantones3= []
            this.listaParroquias3 = []
            this.cantonSeleccionado1.codigoCanton='';
            this.parroquiaSeleccionado1.idLocalizacion=0;
            this.cantonSeleccionado2.codigoCanton='';
            this.parroquiaSeleccionado2.idLocalizacion=0;
            this.cantonSeleccionado3.codigoCanton='';
            this.parroquiaSeleccionado3.idLocalizacion=0;
          },
          err=>console.log(err)
        )
    }

    listarCantones1()
    {
      this.listaParroquias1 = []
      this.nuevaLocalizacion1.codigoProvincia=this.provinciaSeleccionado1.codigoProvincia;
      this.nuevaLocalizacion1.nombreProvincia=this.provinciaSeleccionado1.nombreProvincia;
      this.nuevaLocalizacion1.codigoCanton='';
      this.nuevaLocalizacion1.nombreCanton='';
      this.ubicacionService.obtenerCantones(this.paisSeleccionado1.codigoPais,this.provinciaSeleccionado1.codigoProvincia).subscribe(
          (res:any)=>{
            this.listaCantones1=res;
            this.listaParroquias1 = []
            this.listaParroquias2 = []
            this.listaParroquias3 = []
            this.parroquiaSeleccionado1.idLocalizacion=0;
            this.parroquiaSeleccionado2.idLocalizacion=0;
            this.parroquiaSeleccionado3.idLocalizacion=0;
          },
          err=>console.log(err)
        )
    }

    listarParroquias1()
    {
      this.nuevaLocalizacion1.codigoCanton=this.cantonSeleccionado1.codigoCanton;
      this.nuevaLocalizacion1.nombreCanton=this.cantonSeleccionado1.nombreCanton;
      this.ubicacionService.obtenerParroquias(this.paisSeleccionado1.codigoPais,this.provinciaSeleccionado1.codigoProvincia,this.cantonSeleccionado1.codigoCanton).subscribe(
          (res:any)=>{
            console.log(res);
            this.listaParroquias1 = res;
          },
          err=>console.log(err)
        )
    }

    //listas con provincia

    listarProvincias2()
    {
      this.listaCantones2= []
      this.listaParroquias2 = []
      this.nuevaLocalizacion2.codigoPais=this.paisSeleccionado2.codigoPais;
      this.nuevaLocalizacion2.nombrePais=this.paisSeleccionado2.nombrePais;
      this.nuevaLocalizacion2.codigoCanton='';
      this.nuevaLocalizacion2.nombreCanton=''
      this.nuevaLocalizacion2.codigoProvincia='';
      this.nuevaLocalizacion2.nombreProvincia='';
      this.ubicacionService.obtenerProvincias(this.paisSeleccionado2.codigoPais).subscribe(
          (res:any)=>{
            this.listaProvincias2=res
            this.listaCantones2= []
            this.listaParroquias2 = []
            this.listaCantones3= []
            this.listaParroquias3 = []
            this.listaCantones1= []
            this.listaParroquias1 = []
            this.cantonSeleccionado2.codigoCanton='';
            this.parroquiaSeleccionado2.idLocalizacion=0;
            this.cantonSeleccionado1.codigoCanton='';
            this.parroquiaSeleccionado1.idLocalizacion=0;
            this.cantonSeleccionado3.codigoCanton='';
            this.parroquiaSeleccionado3.idLocalizacion=0;
          },
          err=>console.log(err)
        )
    }

    listarCantones2()
    {
      this.listaParroquias2 = []
      this.nuevaLocalizacion2.codigoProvincia=this.provinciaSeleccionado2.codigoProvincia;
      this.nuevaLocalizacion2.nombreProvincia=this.provinciaSeleccionado2.nombreProvincia;
      this.nuevaLocalizacion2.codigoCanton='';
      this.nuevaLocalizacion2.nombreCanton='';
      this.ubicacionService.obtenerCantones(this.paisSeleccionado2.codigoPais,this.provinciaSeleccionado2.codigoProvincia).subscribe(
          (res:any)=>{
            this.listaCantones2=res;
            this.listaParroquias2 = []
            this.listaParroquias1 = []
            this.listaParroquias3 = []
            this.parroquiaSeleccionado2.idLocalizacion=0;
            this.parroquiaSeleccionado1.idLocalizacion=0;
            this.parroquiaSeleccionado3.idLocalizacion=0;
          },
          err=>console.log(err)
        )
    }

    listarParroquias2()
    {
      this.nuevaLocalizacion2.codigoCanton=this.cantonSeleccionado2.codigoCanton;
      this.nuevaLocalizacion2.nombreCanton=this.cantonSeleccionado2.nombreCanton;
      this.ubicacionService.obtenerParroquias(this.paisSeleccionado2.codigoPais,this.provinciaSeleccionado2.codigoProvincia,this.cantonSeleccionado2.codigoCanton).subscribe(
          (res:any)=>{
            this.listaParroquias2 = res;
          },
          err=>console.log(err)
        )
    }

    
    //listas con provincia

    listarProvincias3()
    {
      this.listaCantones3= []
      this.listaParroquias3 = []
      this.nuevaLocalizacion3.codigoPais=this.paisSeleccionado3.codigoPais;
      this.nuevaLocalizacion3.nombrePais=this.paisSeleccionado3.nombrePais;
      this.nuevaLocalizacion3.codigoCanton='';
      this.nuevaLocalizacion3.nombreCanton=''
      this.nuevaLocalizacion3.codigoProvincia='';
      this.nuevaLocalizacion3.nombreProvincia='';
      this.ubicacionService.obtenerProvincias(this.paisSeleccionado3.codigoPais).subscribe(
          (res:any)=>{
            this.listaProvincias3=res
            this.listaCantones3= []
            this.listaParroquias3 = []
            this.listaCantones2= []
            this.listaParroquias2 = []
            this.listaCantones1= []
            this.listaParroquias1 = []
            this.cantonSeleccionado3.codigoCanton='';
            this.parroquiaSeleccionado3.idLocalizacion=0;
          },
          err=>console.log(err)
        )
    }


    //enviar formulario
    enviarLocalizacionNueva1(){

      if(this.nuevaLocalizacion4.codigoPais.trim() == '' || this.nuevaLocalizacion4.codigoPais == null){
        this.snack.open("El código del país es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion4.nombrePais.trim() == '' || this.nuevaLocalizacion4.nombrePais == null){
        this.snack.open("El nombre del país es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion4.codigoProvincia.trim() == '' || this.nuevaLocalizacion4.codigoProvincia == null){
        this.snack.open("El código del provincia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion4.nombreProvincia.trim() == '' || this.nuevaLocalizacion4.nombreProvincia == null){
        this.snack.open("El nombre del provincia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion4.codigoCanton.trim() == '' || this.nuevaLocalizacion4.codigoCanton == null){
        this.snack.open("El código del cantón es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion4.nombreCanton.trim() == '' || this.nuevaLocalizacion4.nombreCanton == null){
        this.snack.open("El nombre del cantón es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion4.codigoParroquia.trim() == '' || this.nuevaLocalizacion4.codigoParroquia == null){
        this.snack.open("El código del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion4.nombreParroquia.trim() == '' || this.nuevaLocalizacion4.nombreParroquia == null){
        this.snack.open("El nombre del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarCodigoPais(this.nuevaLocalizacion4.codigoPais)==false){
        this.snack.open("El código del pais ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarNombrePais(this.nuevaLocalizacion4.nombrePais)==false){
        this.snack.open("El nombre del pais ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      this.nuevaLocalizacion4.codigoPais=this.nuevaLocalizacion4.codigoPais.toUpperCase();
          this.nuevaLocalizacion4.codigoProvincia=this.nuevaLocalizacion4.codigoProvincia.toUpperCase();
          this.nuevaLocalizacion4.codigoCanton=this.nuevaLocalizacion4.codigoCanton.toUpperCase();
          this.nuevaLocalizacion4.codigoParroquia=this.nuevaLocalizacion4.codigoParroquia.toUpperCase();
          this.nuevaLocalizacion4.nombrePais=this.nuevaLocalizacion4.nombrePais.toUpperCase();
          this.nuevaLocalizacion4.nombreProvincia=this.nuevaLocalizacion4.nombreProvincia.toUpperCase();
          this.nuevaLocalizacion4.nombreCanton=this.nuevaLocalizacion4.nombreCanton.toUpperCase();
          this.nuevaLocalizacion4.nombreParroquia=this.nuevaLocalizacion4.nombreParroquia.toUpperCase();
      this.ubicacionService.guardar(this.nuevaLocalizacion4).subscribe(
        (dato:any) => {
          this.nuevaLocalizacion4.codigoPais='';
          this.nuevaLocalizacion4.codigoProvincia='';
          this.nuevaLocalizacion4.codigoCanton='';
          this.nuevaLocalizacion4.codigoParroquia='';
          this.nuevaLocalizacion4.nombrePais='';
          this.nuevaLocalizacion4.nombreProvincia='';
          this.nuevaLocalizacion4.nombreCanton='';
          this.nuevaLocalizacion4.nombreParroquia='';
          Swal.fire('Localización agregada','La localización ha sido agregada con éxito','success');
        },
        (error) => {
          console.log(error);
          Swal.fire('Error !!','Error al guardar la localización','error')
        }
      )
    }

   
    enviarLocalizacionNueva2(){

      if(this.nuevaLocalizacion3.codigoPais.trim() == '' || this.nuevaLocalizacion3.codigoPais == null){
        this.snack.open("El país es requerido !!",'',{
          duration:3000
        })
        return ;
      }
      if(this.nuevaLocalizacion3.codigoProvincia.trim() == '' || this.nuevaLocalizacion3.codigoProvincia == null){
        this.snack.open("El código del provincia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion3.nombreProvincia.trim() == '' || this.nuevaLocalizacion3.nombreProvincia == null){
        this.snack.open("El nombre del provincia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion3.codigoCanton.trim() == '' || this.nuevaLocalizacion3.codigoCanton == null){
        this.snack.open("El código del cantón es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion3.nombreCanton.trim() == '' || this.nuevaLocalizacion3.nombreCanton == null){
        this.snack.open("El nombre del cantón es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion3.codigoParroquia.trim() == '' || this.nuevaLocalizacion3.codigoParroquia == null){
        this.snack.open("El código del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion3.nombreParroquia.trim() == '' || this.nuevaLocalizacion3.nombreParroquia == null){
        this.snack.open("El nombre del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarCodigoProvincia(this.nuevaLocalizacion3.codigoProvincia)==false){
        this.snack.open("El código de la provincia ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarNombreProvincia(this.nuevaLocalizacion3.nombreProvincia)==false){
        this.snack.open("El nombre de la provincia ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      this.nuevaLocalizacion3.codigoPais=this.nuevaLocalizacion3.codigoPais.toUpperCase();
          this.nuevaLocalizacion3.codigoProvincia=this.nuevaLocalizacion3.codigoProvincia.toUpperCase();
          this.nuevaLocalizacion3.codigoCanton=this.nuevaLocalizacion3.codigoCanton.toUpperCase();
          this.nuevaLocalizacion3.codigoParroquia=this.nuevaLocalizacion3.codigoParroquia.toUpperCase();
          this.nuevaLocalizacion3.nombrePais=this.nuevaLocalizacion3.nombrePais.toUpperCase();
          this.nuevaLocalizacion3.nombreProvincia=this.nuevaLocalizacion3.nombreProvincia.toUpperCase();
          this.nuevaLocalizacion3.nombreCanton=this.nuevaLocalizacion3.nombreCanton.toUpperCase();
          this.nuevaLocalizacion3.nombreParroquia=this.nuevaLocalizacion3.nombreParroquia.toUpperCase();
      this.ubicacionService.guardar(this.nuevaLocalizacion3).subscribe(
        (dato:any) => {
          this.nuevaLocalizacion3.codigoProvincia='';
          this.nuevaLocalizacion3.codigoCanton='';
          this.nuevaLocalizacion3.codigoParroquia='';
          this.nuevaLocalizacion3.nombreProvincia='';
          this.nuevaLocalizacion3.nombreCanton='';
          this.nuevaLocalizacion3.nombreParroquia='';
          Swal.fire('Localización agregada','La localización ha sido agregada con éxito','success');
        },
        (error) => {
          console.log(error);
          Swal.fire('Error !!','Error al guardar la localización','error')
        }
      )
    }


    enviarLocalizacionNueva3(){

      if(this.nuevaLocalizacion2.codigoPais.trim() == '' || this.nuevaLocalizacion2.codigoPais == null){
        this.snack.open("El país es requerido !!",'',{
          duration:3000
        })
        return ;
      }
      if(this.nuevaLocalizacion2.codigoProvincia.trim() == '' || this.nuevaLocalizacion2.codigoProvincia == null){
        this.snack.open("La provincia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion2.codigoCanton.trim() == '' || this.nuevaLocalizacion2.codigoCanton == null){
        this.snack.open("El código del cantón es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion2.nombreCanton.trim() == '' || this.nuevaLocalizacion2.nombreCanton == null){
        this.snack.open("El nombre del cantón es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion2.codigoParroquia.trim() == '' || this.nuevaLocalizacion2.codigoParroquia == null){
        this.snack.open("El código del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion2.nombreParroquia.trim() == '' || this.nuevaLocalizacion2.nombreParroquia == null){
        this.snack.open("El nombre del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarCodigoCanton(this.nuevaLocalizacion2.codigoCanton)==false){
        this.snack.open("El código del cantón ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarNombreCanton(this.nuevaLocalizacion2.nombreCanton)==false){
        this.snack.open("El nombre del cantón ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      this.nuevaLocalizacion2.codigoPais=this.nuevaLocalizacion2.codigoPais.toUpperCase();
          this.nuevaLocalizacion2.codigoProvincia=this.nuevaLocalizacion2.codigoProvincia.toUpperCase();
          this.nuevaLocalizacion2.codigoCanton=this.nuevaLocalizacion2.codigoCanton.toUpperCase();
          this.nuevaLocalizacion2.codigoParroquia=this.nuevaLocalizacion2.codigoParroquia.toUpperCase();
          this.nuevaLocalizacion2.nombrePais=this.nuevaLocalizacion2.nombrePais.toUpperCase();
          this.nuevaLocalizacion2.nombreProvincia=this.nuevaLocalizacion2.nombreProvincia.toUpperCase();
          this.nuevaLocalizacion2.nombreCanton=this.nuevaLocalizacion2.nombreCanton.toUpperCase();
          this.nuevaLocalizacion2.nombreParroquia=this.nuevaLocalizacion2.nombreParroquia.toUpperCase();

      this.ubicacionService.guardar(this.nuevaLocalizacion2).subscribe(
        (dato:any) => {
          
          this.nuevaLocalizacion2.codigoCanton='';
          this.nuevaLocalizacion2.codigoParroquia='';
          this.nuevaLocalizacion2.nombreCanton='';
          this.nuevaLocalizacion2.nombreParroquia='';
          Swal.fire('Localización agregada','La localización ha sido agregada con éxito','success');
        },
        (error) => {
          console.log(error);
          Swal.fire('Error !!','Error al guardar la localización','error')
        }
      )
    }
    enviarLocalizacionNueva4(){

      if(this.nuevaLocalizacion1.codigoPais.trim() == '' || this.nuevaLocalizacion1.codigoPais == null){
        this.snack.open("El país es requerido !!",'',{
          duration:3000
        })
        return ;
      }
      if(this.nuevaLocalizacion1.codigoProvincia.trim() == '' || this.nuevaLocalizacion1.codigoProvincia == null){
        this.snack.open("La provincia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion1.codigoCanton.trim() == '' || this.nuevaLocalizacion1.codigoCanton == null){
        this.snack.open("El cantón es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion1.codigoParroquia.trim() == '' || this.nuevaLocalizacion1.codigoParroquia == null){
        this.snack.open("El código del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.nuevaLocalizacion1.nombreParroquia.trim() == '' || this.nuevaLocalizacion1.nombreParroquia == null){
        this.snack.open("El nombre del parroquia es requerido !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarCodigoParroquia(this.nuevaLocalizacion1.codigoParroquia)==false){
        this.snack.open("El código de la parroquia ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      if(this.validarNombreParroquia(this.nuevaLocalizacion1.nombreParroquia)==false){
        this.snack.open("El nombre de la parroquia ya esta registrado !!",'',{
          duration:3000
        })
        return ;
      }

      this.nuevaLocalizacion1.codigoPais=this.nuevaLocalizacion1.codigoPais.toUpperCase();
          this.nuevaLocalizacion1.codigoProvincia=this.nuevaLocalizacion1.codigoProvincia.toUpperCase();
          this.nuevaLocalizacion1.codigoCanton=this.nuevaLocalizacion1.codigoCanton.toUpperCase();
          this.nuevaLocalizacion1.codigoParroquia=this.nuevaLocalizacion1.codigoParroquia.toUpperCase();
          this.nuevaLocalizacion1.nombrePais=this.nuevaLocalizacion1.nombrePais.toUpperCase();
          this.nuevaLocalizacion1.nombreProvincia=this.nuevaLocalizacion1.nombreProvincia.toUpperCase();
          this.nuevaLocalizacion1.nombreCanton=this.nuevaLocalizacion1.nombreCanton.toUpperCase();
          this.nuevaLocalizacion1.nombreParroquia=this.nuevaLocalizacion1.nombreParroquia.toUpperCase();

      this.ubicacionService.guardar(this.nuevaLocalizacion1).subscribe(
        (dato:any) => {
          
          this.nuevaLocalizacion1.codigoParroquia='';
          this.nuevaLocalizacion1.nombreParroquia='';
          Swal.fire('Localización agregada','La localización ha sido agregada con éxito','success');
        },
        (error) => {
          console.log(error);
          Swal.fire('Error !!','Error al guardar la localización','error')
        }
      )
    }


    //filtrar
    listaPaisesFiltro : any = []
    listaProvinciasFiltro : any = []
    listaCantonesFiltro : any = []
    listaParroquiasFiltro : any = []

    validarCodigoPais(codigo:any){
      console.log("codigo pais")
      let aux=true;
      for (const ubicacion of this.listaPaises) {
        if(ubicacion.codigoPais.toUpperCase()==codigo.toUpperCase()){
          aux=false;
          break;
        }
      }
      return aux;
    }
    validarNombrePais(nombre:any){
      console.log("nombre pais")
      let aux=true;
      for (const ubicacion of this.listaPaises) {
        if(ubicacion.nombrePais.toUpperCase()==nombre.toUpperCase()){
          aux=false;
          break;
        }
      }
      return aux;
    }

    validarCodigoProvincia( codigoProvincia:any){
      console.log("codigo provincia")
      let aux=true;
      
      for (const ubicacion of this.listaProvincias3) {
        if(ubicacion.codigoProvincia.toUpperCase()==codigoProvincia.toUpperCase()){
          aux=false;
        }
      }
      return aux;
    }
    validarNombreProvincia(nombre:any){
      console.log("nombre provincia")
      let aux=true;
      for (const ubicacion of this.listaProvincias3) {
        if(ubicacion.nombreProvincia.toUpperCase()==nombre.toUpperCase()){
          aux=false;
        }
      }
      return aux;
    }

    validarCodigoCanton(codigoCanton:any ){
      console.log("codigo canton")
      let aux=true;
      for (const ubicacion of this.listaCantones2) {
        if(ubicacion.codigoCanton.toUpperCase()==codigoCanton.toUpperCase()){
          aux=false;
        }
      }
      return aux;
    }
    validarNombreCanton(nombre:any){
      console.log("nombre canton")
      let aux=true;
      for (const ubicacion of this.listaCantones2) {
        if(ubicacion.nombreCanton.toUpperCase()==nombre.toUpperCase()){
          aux=false;
        }
      }
      return aux;
    }

    validarCodigoParroquia(codigoParroquia:any ){
      console.log("codigo parroquia")
      let aux=true;
      for (const ubicacion of this.listaParroquias1) {
        if(ubicacion.codigoParroquia.toUpperCase()==codigoParroquia.toUpperCase()){
          aux=false;
        }
      }
      return aux;
    }
    validarNombreParroquia(nombre:any){
      console.log("nombre parroquia")
      let aux=true;
      for (const ubicacion of this.listaParroquias1) {
        if(ubicacion.nombreParroquia.toUpperCase()==nombre.toUpperCase()){
          aux=false;
        }
      }
      return aux;
    }
}
