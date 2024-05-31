import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaModalMostrarLibroComponent } from './ventana-modal-mostrar-libro.component';

describe('VentanaModalMostrarLibroComponent', () => {
  let component: VentanaModalMostrarLibroComponent;
  let fixture: ComponentFixture<VentanaModalMostrarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaModalMostrarLibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaModalMostrarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
