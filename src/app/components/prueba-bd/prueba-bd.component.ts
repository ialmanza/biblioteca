import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LibrosServicioService } from '../../services/libros-servicio.service';

@Component({
  selector: 'app-prueba-bd',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  providers: [ LibrosServicioService ],
  templateUrl: './prueba-bd.component.html',
  styleUrl: './prueba-bd.component.css'
})
export class PruebaBDComponent {
  libro: any = {
    Titulo: '',
    ISBN: null,
    Primer_autor: '',
    Segundo_autor: '',
    Tercer_autor: '',
    Fecha_de_publicacion: '',
    Editorial: '',
    Genero: '',
    Paginas: null,
    Campo_adicional: '',
    Descargar: null
  };

  constructor( private router: Router, private libroService: LibrosServicioService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        this.libro.Descargar = reader.result;
      };
    }
  }

  onSubmit(): void {
    this.libroService.addLibro(this.libro)
      this.router.navigate(['/listar-tabla']);

  }
}
