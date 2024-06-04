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
import 'flowbite';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Editorial',
    children: [{name: 'Fantastic World'}, {name: 'Gente Nueva'}, {name: 'Sonando'}],
  },
  {
    name: 'Genero',
    children: [
      {
        name: 'Terror'
      },
      {
        name: 'Comedia'
      },
      {
        name: 'Fantasia'
      },
      {
        name: 'Novelas',
        children: [{name: 'Novela Inglesa'}, {name: 'Otras'}],
      },
      {
        name: 'Fruta',
        children: [{name: 'Manzana'}, {name: 'Pera'}, {name: 'Naranja'}],
      }

    ],
  },
];


@Component({
    selector: 'app-busqueda-de-libros-campo',
    standalone: true,
    templateUrl: './busqueda-de-libros-campo.component.html',
    styleUrl: './busqueda-de-libros-campo.component.css',
    imports: [LibroComponent, CommonModule, FormsModule, FilterPipe, DialogContentExampleDialog, DialogContentEditExampleDialog, DialogAnimationsExampleDialog,
      MatTreeModule, MatIconModule, MatButtonModule],
})
export class BusquedaDeLibrosCampoComponent {
  libros: Libro[] = [];
  filteredLibros: Libro[] = [];
  searchTerm: string = '';
  displayedLibros: Libro[] = [];
  searchTitulo: string = '';

  pageSizeOptions = [5, 10, 20];
  pageSize = this.pageSizeOptions[0];
  currentPage = 0;
  totalItems = 0;
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(private librosServicio: LibrosServicioService, private dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }

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
      // libro.titulo.toLowerCase().includes(query.toLowerCase()) ||
      // libro.primerautor.toLowerCase().includes(query.toLowerCase()) ||
      // libro.genero.toLowerCase().includes(query.toLowerCase()) ||
      libro.editorial.toLowerCase().includes(query.toLowerCase())  /*||
    libro.fechapublicacion.toLowerCase().includes(query.toLowerCase()));*/);
    this.totalItems = this.filteredLibros.length;
    this.currentPage = 0;
    this.updateDisplayedLibros();
  }

  filterTitulo(query: string) {
    this.filteredLibros = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(query.toLowerCase())
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

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  onNodeClick(event: MouseEvent,node: FoodNode) {
    const lastWord = node.name.split(' ').pop();
    if (lastWord) {
      this.search(lastWord);
    }
  }

  search(term: string) {
    console.log(`Searching for: ${term}`);
    // this.filteredLibros = this.libros.filter(libro =>libro.editorial.toLowerCase().includes(term.toLowerCase()));

    // this.totalItems = this.filteredLibros.length;
    // this.currentPage = 0;
    // this.updateDisplayedLibros();
    this.filteredLibros = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(term.toLowerCase()) ||
      libro.primerautor.toLowerCase().includes(term.toLowerCase()) ||
      libro.genero.toLowerCase().includes(term.toLowerCase()) ||
      libro.editorial.toLowerCase().includes(term.toLowerCase()) ||
    libro.fechapublicacion.toLowerCase().includes(term.toLowerCase()));
    this.totalItems = this.filteredLibros.length;
    this.currentPage = 0;
    this.updateDisplayedLibros();
  }
}
