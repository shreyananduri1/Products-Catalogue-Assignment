import { Component, Inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
  product: any;
  id: any;

  constructor(private productService: ProductsService, private dialogRef: MatDialogRef<DeleteProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.product = this.data;
  }

  onDelete(){
        this.id = this.product._id;
        this.productService.deleteProductById(this.id).subscribe(() => {
          console.log('product deleted');
          this.router.navigate(['/home']);
        })
      }
  }
