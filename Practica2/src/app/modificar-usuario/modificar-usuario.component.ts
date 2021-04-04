import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['../styles_forms.css']
})
export class ModificarUsuarioComponent implements OnInit {

  sesion: any;
  constructor(private router: Router,
    private conexion: ConexionService) {
    
    if(localStorage.getItem("sesion") == ""){
      this.router.navigate(['/Users/Login'])
    }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
  }

  ngOnInit(): void {
  }

  modificar(user:string, name:string, pass:string){
    let sesion = this.conexion.modificar_usuario({"user" : this.sesion.codigo_usuario, "newu": user, 
                                      "name" : name, "pass" : pass});
    let buscar = this.conexion.login({"user" : user, "pass": pass});

      sesion.subscribe(resp=>{
        if(resp == null){
            alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          alert("Se modifico correctamente el usuario")
      
          buscar.subscribe(logi=>{
              if(logi == null){
              }else{
                localStorage.setItem("sesion", JSON.stringify(logi));
                this.router.navigate(['/Users'])
              }
            })
        }
       })
  }
}
