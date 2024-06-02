import { Component, Input, OnInit } from '@angular/core';
import { LibroComponent } from "../libro/libro.component";
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { DialogContentExampleDialog } from "../ventana-modal-mostrar-libro/ventana-modal-mostrar-libro.component";
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-libro/ventana-modal-editar-libro.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-listar-con-tabla',
  standalone: true,
  imports: [ LibroComponent, CommonModule, FormsModule, FilterPipe, DialogContentExampleDialog],
  templateUrl: './listar-con-tabla.component.html',
  styleUrl: './listar-con-tabla.component.css'
})
export class ListarConTablaComponent {

  libros: Libro[] = [];
  filteredLibros: Libro[] = [];
  searchTerm: string = '';

  constructor(private librosServicio: LibrosServicioService, private dialog: MatDialog) {}

  ngOnInit() {
    this.librosServicio.getLibros().subscribe((libros: Libro[]) => {
      this.libros = libros;
      this.filteredLibros = libros
    });
  }

  filter(query: string) {
    this.filteredLibros = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(query.toLowerCase()) ||
      libro.primerautor.toLowerCase().includes(query.toLowerCase()) ||
      libro.genero.toLowerCase().includes(query.toLowerCase())
    );
  }

  openEditDialog(libro: Libro) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.librosServicio.updateLibro(libro);
      }
    });
  }

  deleteLibro(libro: Libro) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.librosServicio.deleteLibro(libro.id);
      }
    });
  }
}
