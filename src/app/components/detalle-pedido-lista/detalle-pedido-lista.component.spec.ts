import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePedidoListaComponent } from './detalle-pedido-lista.component';

describe('DetallePedidoListaComponent', () => {
  let component: DetallePedidoListaComponent;
  let fixture: ComponentFixture<DetallePedidoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePedidoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePedidoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
