import { Component, Inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { IProduct } from '../../models/products.model';
import { ProductAddEditComponent } from '../product-add-edit/product-add-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  product: IProduct = {
    productCode: '',
    productName: '',
    color: '',
    stock: 0,
    description: '',
    category: '',
    seller:'',
    company: '',
    createdDate: new Date(),
    thumbnailURL: ''};
  id: any;

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog){}

  ngOnInit(){
    this.getProductDetails();
  }

  getProductDetails(){
    this.route.paramMap.subscribe(params => {
      this.id=params.get('id');
      this.productService.getProductById(this.id).subscribe((product) =>{
        console.log(product);
        this.product = product.data;
      })
    }
    )
    this.productService
  }

  openEditForm(data: any){
    const dialogRef = this.dialog.open(ProductAddEditComponent, {data});
    dialogRef.afterClosed().subscribe(() => {
      this.getProductDetails();
    })
  }

  deleteProduct(data: any){
    const dialogRef = this.dialog.open(DeleteProductComponent, {data});
    dialogRef.afterClosed().subscribe(() => {
      this.getProductDetails();
    })
    // this.route.paramMap.subscribe(params => {
    //   this.id=params.get('id');
    //   this.productService.deleteProductById(this.id).subscribe(() => {
    //     console.log('product deleted');
    //     this.router.navigate(['/home']);
    //   })
    // })
  }
}
