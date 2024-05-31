import {Component, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventana-modal-mostrar-libro',
  standalone: true,
  imports: [ MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './ventana-modal-mostrar-libro.component.html',
  styleUrl: './ventana-modal-mostrar-libro.component.css'
})
export class VentanaModalMostrarLibroComponent {

  constructor(public dialog: MatDialog) {}


openDialog(libro: Libro) {
  const dialogRef = this.dialog.open(DialogContentExampleDialog, {
    data: libro
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'mostrar-libro.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
})
export class DialogContentExampleDialog {

  @Input() libros: Libro | undefined;
  constructor (@Inject(MAT_DIALOG_DATA) public data: Libro) {

  }


}

