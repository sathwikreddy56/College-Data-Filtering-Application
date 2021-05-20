import { HttpClient } from '@angular/common/http';
import {Injectable, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NgModel } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router) {}
  
  signup(username:NgModel,email:NgModel,password:NgModel): void { 
    console.log(username.value,email.value,password.value)
    this.postSignUp({"name":username.value,"email":email.value,"password":password.value})
      .subscribe(data=>{
        if(data.created){
          alert(data.message);
          this.router.navigateByUrl('user/login');
        }else{
          alert(data.message);
        }
      })
  }
  public postSignUp(request: any) {
    return this.http.post<{message:string,created:boolean}>("http://localhost:8080/api/user/register", request)
  }
  ngOnInit(): void {}
}
