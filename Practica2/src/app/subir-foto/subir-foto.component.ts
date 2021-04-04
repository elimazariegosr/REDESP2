import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['../styles_forms.css']
})
export class SubirFotoComponent implements OnInit {

  sesion: any
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("sesion") == ""){
      this.router.navigate(['/Users/Login'])
    }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
    
  }
  agregar(titulo : string, autor : string, descripcion : string, precio : string, cantidad : string){
    if(titulo != "" && autor != "" && descripcion != "" && precio != "" && cantidad != ""){
      let agregar_l = this.conexion.agregar_libro({"titulo" : titulo, "autor" : autor,
      "descripcion" : descripcion, "precio" : precio,
        "cantidad" : cantidad, "user" : this.sesion.codigo_usuario});

      agregar_l.subscribe(resp=>{
        if(resp == null){
          this.router.navigate(['/Users'])
          alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          this.router.navigate(['/Users/Libros'])
        }
      })
    }else{
      alert("Datos erroneos, porfavor intente de nuevo")
    }
    
  }

  ngOnInit(): void {
  }

}
