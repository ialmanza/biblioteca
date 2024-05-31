import {Component, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventana-modal-editar-libro',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './ventana-modal-editar-libro.component.html',
  styleUrl: './ventana-modal-editar-libro.component.css'
})
export class VentanaModalEditarLibroComponent {

  constructor(public dialog: MatDialog) {}
  openEditDialog(libro: Libro) {
    const dialogRef = this.dialog.open(DialogContentEditExampleDialog, {
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  }

  @Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'editar-libro.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, CommonModule],
  })
  export class DialogContentEditExampleDialog {

    @Input() libros: Libro | undefined;
    constructor (@Inject(MAT_DIALOG_DATA) public data: Libro) {

    }

  }

