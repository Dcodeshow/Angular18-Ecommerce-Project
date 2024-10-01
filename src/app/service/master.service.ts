import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addToCartModel,
  APIResponseModel,
  LoginModel,
  RegisterModel,
} from '../model/Product';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/BigBasket/';

  constructor(private http: HttpClient) {}

  getAllProduct(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}GetAllProducts`);
  }

  getAllCategory(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}GetAllCategory`);
  }

  getAllCategoryById(productId: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      `${this.apiUrl}GetAllProductsByCategoryId?id=${productId}`
    );
  }

  registerNewCustomer(obj: RegisterModel): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      `${this.apiUrl}RegisterCustomer`,
      obj
    );
  }

  loginCustomer(obj: LoginModel): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}Login`, obj);
  }

  addToCart(obj: addToCartModel): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}AddToCart`, obj);
  }
}
