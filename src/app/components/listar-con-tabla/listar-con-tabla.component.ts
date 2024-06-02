import { Component} from '@angular/core';
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
// import * as XLSX from 'xlsx';

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
  displayedLibros: Libro[] = [];

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;

  constructor(private librosServicio: LibrosServicioService, private dialog: MatDialog) {}

  ngOnInit() {
    this.librosServicio.getLibros().subscribe((libros: Libro[]) => {
      this.libros = libros;
      this.filteredLibros = libros;
      this.totalItems = libros.length;
      this.updateDisplayedLibros();
    });
  }

  filter(query: string) {
    this.filteredLibros = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(query.toLowerCase()) ||
      libro.primerautor.toLowerCase().includes(query.toLowerCase()) ||
      libro.genero.toLowerCase().includes(query.toLowerCase())
    );
    this.totalItems = this.filteredLibros.length;
    this.currentPage = 0;
    this.updateDisplayedLibros();
  }
  updateDisplayedLibros() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedLibros = this.filteredLibros.slice(start, end);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.updateDisplayedLibros();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedLibros();
  }

  nextPage() {
    if (this.currentPage < this.totalPages() - 1) {
      this.currentPage++;
      this.updateDisplayedLibros();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedLibros();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
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


  // exportToExcel(): void {
  //   const filteredData = this.libros.map(libro => {
  //     const { titulo, isbn, primerautor, segundoautor, tercerautor, fechapublicacion, editorial, genero, paginas, descripcion, ...rest } = libro;
  //     return {
  //       Título: titulo,
  //       ISBN: isbn,
  //       'Primer autor': primerautor,
  //       'Segundo autor': segundoautor,
  //       'Tercer autor': tercerautor,
  //       'Fecha de publicación': fechapublicacion,
  //       Editorial: editorial,
  //       Género: genero,
  //       Páginas: paginas,
  //       'Campo adicional': descripcion
  //     };
  //   });
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Libros');
  //   XLSX.writeFile(wb, 'Libros.xlsx');
  // }
}
