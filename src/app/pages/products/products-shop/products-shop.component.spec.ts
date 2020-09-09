import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsShopComponent } from './products-shop.component';

describe('ProductsShopComponent', () => {
  let component: ProductsShopComponent;
  let fixture: ComponentFixture<ProductsShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
