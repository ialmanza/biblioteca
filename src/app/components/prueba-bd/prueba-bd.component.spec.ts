import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaBDComponent } from './prueba-bd.component';

describe('PruebaBDComponent', () => {
  let component: PruebaBDComponent;
  let fixture: ComponentFixture<PruebaBDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaBDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaBDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
