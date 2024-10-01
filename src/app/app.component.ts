import { MasterService } from './service/master.service';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginModel, RegisterModel } from './model/Product';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Constant } from './constant/constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    TitleCasePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('register') registerModel!: ElementRef;
  @ViewChild('login') loginModel!: ElementRef;

  registerObj: RegisterModel = new RegisterModel();

  loginObj: LoginModel = new LoginModel();

  loggedUserData: RegisterModel = new RegisterModel();

  masterService = inject(MasterService);

  constructor() {
    console.log(this.registerObj);
  }

  ngOnInit(): void {
    let parseData: any = localStorage.getItem(Constant.LOCAL_KEY);
    if (parseData != null) {
      let data = JSON.parse(parseData);
      this.loggedUserData = data;
      console.log(data);
    }
  }

  //Register Process

  onRegister() {
    this.registerModel.nativeElement.style.display = 'block';
  }

  closeRegisterModel() {
    this.registerModel.nativeElement.style.display = 'none';
  }

  onSubmit() {
    this.masterService
      .registerNewCustomer(this.registerObj)
      .subscribe((data) => {
        if (data.result) {
          alert('Register successfully');
          this.closeRegisterModel();
        } else {
          alert(data.message);
        }
      });
  }

  //Login--------------------
  onLogin() {
    this.loginModel.nativeElement.style.display = 'block';
  }

  closeLoginModel() {
    this.loginModel.nativeElement.style.display = 'none';
  }

  onLoginUser() {
    this.masterService.loginCustomer(this.loginObj).subscribe((data) => {
      if (data.result) {
        alert('Login successfully');
        localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(data.data));
        this.closeLoginModel();
        this.loggedUserData = data.data;
      } else {
        alert(data.message);
      }
    });
  }

  //LogOut
  onLogOut() {
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedUserData = new RegisterModel();
  }
}

/*
## Reference
https://youtu.be/b9ne9HIQWnc?si=CKOuW_snpNT_EL2e
https://github.com/voidChetan/youTube_project_html_templates/tree/main/eCommerceApp

## API Reference
https://freeapi.miniprojectideas.com


## Convert Json to Ts
https://json-5.com
*/
