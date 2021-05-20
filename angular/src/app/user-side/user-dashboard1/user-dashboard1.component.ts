import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tile } from './tile';

@Component({
  selector: 'app-user-dashboard1',
  templateUrl: './user-dashboard1.component.html',
  styleUrls: ['./user-dashboard1.component.css']
})
export class UserDashboard1Component implements OnInit {
  colleges!: tile[];
  dataSource =this.colleges;

  statesarr !: string[] ;
  citiesarr !: string[] ;
  facilities !:string[];

  tables = [0];
  constructor(private http: HttpClient,private router: Router) {
   }
  ngOnInit(): void {
    this.get_intial();
  }
  onState(state){
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    console.log(state.value)
    this.populate_cities(state.value,headers).subscribe(cities=>{
      this.citiesarr=cities.data;
      console.log(cities.data)
    },(error) => {                              
      console.error('error caught in onStateChange : '+error.message)
    })
  }
  get_intial():void {
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    
    this.fetch(headers).subscribe(h=>{
      // console.log(h)
      if(!h.auth){
        this.router.navigateByUrl('/user/login');
        alert("Unauthorized Access")
      }else{
        this.colleges=h.data;
      }
    },(error) => {                              
      console.error('error caught in component')
      this.router.navigateByUrl('/user/login');
    })
    this.populate_states(headers).subscribe(states=>{
        this.statesarr=states.data;
    },(error) => {                              
      console.error('error caught in component : '+error)
      this.router.navigateByUrl('/user/login');
    })
  }
  
  populate_data():void{

  }
  populate_cities(state:string,headers:HttpHeaders){
    return this.http.post<{"data":[]}>('http://localhost:8080/user/cities',{data:state},{headers})
  }
  populate_states(headers:HttpHeaders){
    return this.http.post<{"data":[]}>('http://localhost:8080/user/states',{data:"testing"},{headers})
  }
  public fetch(headers:HttpHeaders){
    return this.http.get<{"auth" :boolean,"data":tile[]}>('http://localhost:8080/user/colleges',{headers})
  }
}
