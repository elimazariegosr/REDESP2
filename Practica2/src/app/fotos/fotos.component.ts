import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {ElementRef,ViewChild } from '@angular/core';
import { Console } from 'console';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['../styles_forms.css']
})

export class FotosComponent implements OnInit {
  libros : any;
  sesion : any;
  codigo_actual :any
  
  constructor(private router: Router,private conexion: ConexionService) {
    
    if(localStorage.getItem("sesion") == ""){
      this.router.navigate(['/Users/Login'])
    }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
      let libros = this.conexion.obtener_libros();

      libros.subscribe(resp=>{
        if(resp == null){

        }else{
          this.libros = resp
          
          console.log(libros)
        }
       })  
  }

  ngOnInit(): void {
  }
  mostrar(libro:any){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'block';
    const div_image = document.getElementById('div_image');
    if(div_image) div_image.innerHTML = "<img src=\"https://image.flaticon.com/icons/png/512/2015/2015041.png\" class=\"fadeIn second\"  style=\"max-height: 270px;\">"; 
    const titulo = document.getElementById('titulo') as HTMLInputElement
    titulo.value = libro.titulo
    const autor = document.getElementById('autor') as HTMLInputElement
    autor.value = libro.autor
    const descripcion = document.getElementById('descripcion') as HTMLInputElement
    descripcion.value = libro.descripcion
    const precio = document.getElementById('precio') as HTMLInputElement
    precio.value = libro.precio
    const cantidad = document.getElementById('cantidad') as HTMLInputElement
    cantidad.value = libro.cantidad
    this.codigo_actual = libro.codigo_libro
  }

  modificar(titulo : string, autor : string, descripcion : string, precio : string, cantidad : string){
    if(this.codigo_actual == null){
      return
    }
    if(titulo != "" && autor != "" && descripcion != "" && precio != "" && cantidad != ""){
      let modificar_l = this.conexion.modificar_libro({"id": this.codigo_actual, "titulo" : titulo, "autor" : autor,
      "descripcion" : descripcion, "precio" : precio,
        "cantidad" : cantidad});

        modificar_l.subscribe(resp=>{
        if(resp == null){
          this.router.navigate(['/Users/Libros'])
          alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          alert("Se modifico correctamente el libro")
          this.codigo_actual = null
          location.reload()
        }
      })
    }else{
      alert("Datos erroneos, porfavor intente de nuevo")
    }
    
  }

  eliminar(){
    if(this.codigo_actual == null){
      return
    }
    let eliminar = this.conexion.eliminar_libro({"id" : this.codigo_actual});

    eliminar.subscribe(resp=>{
      console.log(resp)
      if(resp == null){
      }else{
        alert("Se elimino correctamente el libro")
        this.codigo_actual = null
        location.reload()
      }
     })  
  }

  ocultar(){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'none';  
  }
}
