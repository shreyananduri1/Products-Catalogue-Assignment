import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss'
})
export class ProductAddEditComponent {
  productForm = new FormGroup({
    productCode: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    color: new FormControl(''),
    stock: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    seller: new FormControl(''),
    company: new FormControl(''),
    createdDate: new FormControl(''),
    thumbnailURL: new FormControl('')
  })

  categories: string[] = [
    'Electronics',
    'Beauty',
    'Home',
    'Kitchen'
  ]

  ngOnInit(){
    this.productForm.patchValue(this.data);
  }

  constructor(private productService: ProductsService, private dialogRef: MatDialogRef<ProductAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data:any){}

  onFormSubmit(){

    if(this.productForm.invalid){
      return;
    }
    if(this.data){
      return this.productService.editProduct(this.data._id, this.productForm.value).subscribe(() =>{
        console.log('product updated')
        this.dialogRef.close(true)
      })
    }
    else{
    return this.productService.addProduct(this.productForm.value).subscribe(() => {
      console.log('product added');
    this.dialogRef.close(true);
    })
  }
  }

  onCancel(){
    this.dialogRef.close(true);
  }
}
