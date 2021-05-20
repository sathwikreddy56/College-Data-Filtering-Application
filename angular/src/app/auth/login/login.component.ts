import { Injectable,Component, OnInit } from '@angular/core';
import {  NgModel } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router,) {}
  
  login(email:NgModel,password:NgModel): void { 
    console.log(email.value,password.value)
    this.generateToken({"email":email.value,"password":password.value})
      .subscribe(data=>{
        console.log(data);
        if(data.token){
          let tokenStr = data.token;
          console.log(tokenStr);
          localStorage.setItem('token',tokenStr)
          this.router.navigateByUrl('/user/dashboard');
        }else{
          
          this.router.navigateByUrl('/user/login');
        }
        alert(data.message)
      }
    );
  }
  public generateToken(request: any) {
    return this.http.post<{message:string,token:string}>("http://localhost:8080/api/user/login", request)
  }
  ngOnInit(): void { }
}
