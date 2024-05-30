import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarlibrosComponent } from './listarlibros.component';

describe('ListarlibrosComponent', () => {
  let component: ListarlibrosComponent;
  let fixture: ComponentFixture<ListarlibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarlibrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarlibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
