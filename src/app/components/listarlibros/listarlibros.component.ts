
import { Component, OnInit } from '@angular/core';
import { LibroComponent } from "../libro/libro.component";
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
    selector: 'app-listarlibros',
    standalone: true,
    templateUrl: './listarlibros.component.html',
    styleUrl: './listarlibros.component.css',
    imports: [LibroComponent, CommonModule, FormsModule, FilterPipe]
})
export class ListarlibrosComponent implements OnInit {
  libros: Libro[] = [];
  filteredLibros: Libro[] = [];
  searchTerm: string = '';

  constructor(private librosServicio: LibrosServicioService) {}

  ngOnInit() {
    this.librosServicio.getLibros().subscribe((libros: Libro[]) => {
      this.libros = libros;
      this.filteredLibros = libros
    });
  }

  filter(query: string) {
    this.filteredLibros = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(query.toLowerCase()) ||
      libro.primerautor.toLowerCase().includes(query.toLowerCase())
    );
  }
}
