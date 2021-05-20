import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tile } from './tile';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  colleges!: tile[];
  constructor(private http: HttpClient,private router: Router) {

   }
  ngOnInit(): void {
    this.getColleges();
  }
  getColleges():void {
    var token = localStorage.getItem('token')||"a"
    console.log(token)
    const headers = new HttpHeaders().set('auth-token',token);
     this.fetch(headers).subscribe(h=>{
      if(!h.auth){
        this.router.navigateByUrl('/user/login');
        alert("Unauthorized Access")
      }else{
        this.colleges=h.data;
      }
    })
  }
  public fetch(headers:HttpHeaders) {
    return this.http.get<{"auth" :string,"data":tile[]}>('http://localhost:8080/user/dashboard',{headers});
  }
}
