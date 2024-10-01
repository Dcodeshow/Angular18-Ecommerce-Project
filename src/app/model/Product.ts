export interface APIResponseModel {
  message: string;
  result: boolean;
  data: any;
}

export interface ProductList {
  productId: number;
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  createdDate: string;
  deliveryTimeSpan: string;
  categoryId: number;
  productImageUrl: string;
  categoryName: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  parentCategoryId: number;
  userId?: number;
}

export class RegisterModel {
  custId: number;
  name: string;
  mobileNo: string;
  password: string;
  constructor() {
    this.custId = 0;
    this.name = '';
    this.mobileNo = '';
    this.password = '';
  }
}

export class LoginModel {
  UserName: string;
  UserPassword: string;
  constructor() {
    this.UserName = '';
    this.UserPassword = '';
  }
}

export class addToCartModel {
  cartId: number;
  custId: number;
  productId: number;
  quantity: number;
  addedDate: string;
  constructor() {
    this.cartId = 0;
    this.custId = 0;
    this.productId = 0;
    this.quantity = 1;
    this.addedDate = '';
  }
}
