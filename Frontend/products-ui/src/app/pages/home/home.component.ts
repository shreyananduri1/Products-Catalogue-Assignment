import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/products.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  products: IProduct[] = [];
  filteredProducts: any;

  constructor (private productService: ProductsService, private dialog: MatDialog, private router: Router){}

  ngOnInit(): void {
    this.fetchProducts(); 
  }

  fetchProducts() {
    this.productService.getAllProducts().subscribe(
      response => {
        this.products = response.data;
        this.filteredProducts = this.products;
      },
      error => {
        console.error("Error fetching products:", error);
      }
    );
  }

  openAddProductForm() {
    const dialogRef = this.dialog.open(ProductAddEditComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchProducts()
    })
  }

  openDetailsPage(id: any) {
    this.router.navigate(['/product-details', id]);
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue){
    this.filteredProducts = this.products.filter ((product: IProduct) => 
      product.productName.toLowerCase().includes(filterValue.toLowerCase()))
  }
  else{
    this.filteredProducts = this.products;
  }
    }
}
