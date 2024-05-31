import { Component, OnInit, Input, Inject } from '@angular/core';
import { Libro } from '../../models/Libro';
import { LibrosServicioService } from '../../services/libros-servicio.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogAnimationsExampleDialog, DialogComponent } from '../ventana-modal/ventana-modal.component';
import {MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogContentExampleDialog, VentanaModalMostrarLibroComponent } from '../ventana-modal-mostrar-libro/ventana-modal-mostrar-libro.component';
import { DialogContentEditExampleDialog } from '../ventana-modal-editar-libro/ventana-modal-editar-libro.component';


@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [ CommonModule, FormsModule, DialogComponent, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {

  @Input() libros: Libro | undefined;
  editing: boolean = false;

  constructor(private librosService: LibrosServicioService, private dialog: MatDialog) {}

  // deleteLibro(libro: Libro) {
  //   if(confirm('Are you sure you want to delete this book?')) {
  //    this.librosService.deleteLibro(libro.id);
  //   }
  // }



deleteLibro(libro: Libro) {
  const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
    width: '250px',
    data: libro
  });

  dialogRef.afterClosed().subscribe(result => {
    // if (result === true) {

    // }
    this.librosService.deleteLibro(libro.id);
  });
}

editarLibro(libro: Libro) {
  this.editing = true;
  this.libros = libro;
}


  openDialog(libro: Libro): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '250px',
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  saveChanges() {
    if (this.libros) {
      this.librosService.updateLibro(this.libros);
    }
    this.toggleEdit(); // Desactiva la edición después de guardar

  }

  openEditDialog(libro: Libro) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
