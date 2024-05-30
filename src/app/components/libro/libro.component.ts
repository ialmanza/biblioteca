import { Component, OnInit, Input } from '@angular/core';
import { Libro } from '../../models/Libro';
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {
  @Input() libros: Libro | undefined;

  constructor(private librosService: LibrosServicioService) {}

  deleteLibro(libro: Libro) {
    if(confirm('Are you sure you want to delete this book?')) {
     this.librosService.deleteLibro(libro.id);
    }
  }

}
