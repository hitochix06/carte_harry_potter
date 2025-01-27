import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPanierComponent } from './product-panier.component';

describe('ProductPanierComponent', () => {
  let component: ProductPanierComponent;
  let fixture: ComponentFixture<ProductPanierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPanierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
