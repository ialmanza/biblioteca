import { Component, OnInit } from '@angular/core';
import { ListarlibrosComponent } from '../listarlibros/listarlibros.component';
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  imports: [ ListarlibrosComponent, CommonModule ],
  providers: [LibrosServicioService],
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.css'
})
export class CrearLibroComponent {
  errorMessage: string = '';
  mostrar: boolean;

  constructor(private librosService: LibrosServicioService, private router: Router) {
    this.mostrar = false;
  }

  ngOnInit() {}

  addLibro(titulo:HTMLInputElement,isbn:HTMLInputElement, primerautor:HTMLInputElement, segundoautor:HTMLInputElement, tercerautor:HTMLInputElement, fechapublicacion:HTMLInputElement, editorial:HTMLSelectElement, genero:HTMLSelectElement, paginas:HTMLInputElement,descripcion:HTMLTextAreaElement) {
    let editorialValue = editorial.value === "seleccione"? "" : editorial.value;
    let generoValue = genero.value === "seleccione"? "" : genero.value;

    if (editorialValue === "" || generoValue === "") {
      this.errorMessage = ("No se pueden dejar campos vacíos para 'Editorial' o 'Género'.");
      return; // Retorna temprano si alguna de estas condiciones es verdadera
    }
    const id = Date.now().toString();
      this.librosService.addLibro({
        id,
        titulo: titulo.value,
        isbn: isbn.value,
        primerautor: primerautor.value,
        segundoautor: segundoautor.value,
        tercerautor: tercerautor.value,
        fechapublicacion: fechapublicacion.value,
        editorial: editorial.value,
        genero: genero.value,
        paginas: paginas.value,
        descripcion: descripcion.value,
        hide: true,
      });

      titulo.value = '';
      isbn.value = '';
      primerautor.value = '';
      segundoautor.value = '';
      tercerautor.value = '';
      fechapublicacion.value = '';
      editorial.value = '';
      genero.value = '';
      paginas.value = '';
      descripcion.value = '';
      titulo.focus();
      return false;

    }

    onSubmit(event: Event, titulo: HTMLInputElement, isbn: HTMLInputElement, primerautor: HTMLInputElement, segundoautor: HTMLInputElement, tercerautor: HTMLInputElement, fechapublicacion: HTMLInputElement, editorial: HTMLSelectElement, genero: HTMLSelectElement, paginas: HTMLInputElement, descripcion: HTMLTextAreaElement) {
      event.preventDefault(); //previene el comportamiento por defecto del formulario
      this.addLibro(titulo, isbn, primerautor, segundoautor, tercerautor, fechapublicacion, editorial, genero, paginas, descripcion);
      this.router.navigate(['/listar-tabla']);


    }
}
