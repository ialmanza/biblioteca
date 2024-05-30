import { Routes } from '@angular/router';
import { CrearLibroComponent } from './components/crear-libro/crear-libro.component';
import { ListarlibrosComponent } from './components/listarlibros/listarlibros.component';
import { LibroComponent } from './components/libro/libro.component';

export const routes: Routes = [

  { path: 'listar-libros', component: ListarlibrosComponent },
  { path: 'crear-libro', component: CrearLibroComponent },
  { path: 'libro', component: LibroComponent },
  { path: '', redirectTo: 'listarlibros', pathMatch: 'full' },

];
