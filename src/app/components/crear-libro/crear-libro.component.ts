import { Component, OnInit } from '@angular/core';
import { ListarlibrosComponent } from '../listarlibros/listarlibros.component';
import { LibrosServicioService } from '../../services/libros-servicio.service';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  imports: [ ListarlibrosComponent ],
  providers: [LibrosServicioService],
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.css'
})
export class CrearLibroComponent {

  constructor(private librosService: LibrosServicioService) {}

  ngOnInit() {}

  addLibro(titulo:HTMLInputElement,isbn:HTMLInputElement, primerautor:HTMLInputElement, segundoautor:HTMLInputElement, tercerautor:HTMLInputElement, fechapublicacion:HTMLInputElement, editorial:HTMLInputElement, genero:HTMLInputElement, paginas:HTMLInputElement,descripcion:HTMLTextAreaElement) {
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


}
