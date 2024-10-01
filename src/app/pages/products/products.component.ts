import { AsyncPipe, SlicePipe } from '@angular/common';
import {
  addToCartModel,
  APIResponseModel,
  Category,
  ProductList,
  RegisterModel,
} from '../../model/Product';
import { MasterService } from './../../service/master.service';
import { Component, inject, signal } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SlicePipe, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  masterService = inject(MasterService);

  productList = signal<ProductList[]>([]);

  subscriptions: Subscription[] = [];
  categoriesList: Observable<Category[]> = new Observable<Category[]>();
  loggedUserData: RegisterModel = new RegisterModel();
  constructor() {
    let parseData = localStorage.getItem(Constant.LOCAL_KEY);
    if (parseData != null) {
      let data = JSON.parse(parseData);
      this.loggedUserData = data;
      console.log(data);
    }
  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoriesList = this.masterService
      .getAllCategory()
      .pipe(map((res: APIResponseModel) => res.data));
  }

  loadAllProducts() {
    this.subscriptions.push(
      this.masterService.getAllProduct().subscribe((res: APIResponseModel) => {
        console.log(res.data);
        this.productList.set(res.data);
      })
    );
  }

  getCategoryById(productID: number) {
    this.masterService
      .getAllCategoryById(productID)
      .subscribe((res: APIResponseModel) => {
        this.productList.set(res.data);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onaddToCart(id: number) {
    const newObj: addToCartModel = new addToCartModel();
    newObj.productId = id;
    newObj.custId = this.loggedUserData.custId;
    this.masterService.addToCart(newObj).subscribe((data: APIResponseModel) => {
      if (data.result) {
        alert('Product added successfully');
      } else {
        alert(data.message);
      }
    });
    console.log(newObj);
  }
}
