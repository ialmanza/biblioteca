import { Component } from '@angular/core';
import { LibroComponent } from "../libro/libro.component";
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-listarlibros',
    standalone: true,
    templateUrl: './listarlibros.component.html',
    styleUrl: './listarlibros.component.css',
    imports: [LibroComponent, CommonModule],
})
export class ListarlibrosComponent {
  libros: Libro[];
  constructor(private librosServicio: LibrosServicioService) {
    this.libros = [];
  }

  ngOnInit() {
    this.librosServicio.getLibros().subscribe((libros: Libro[]) => {
      this.libros = libros;
    });
  }
}
