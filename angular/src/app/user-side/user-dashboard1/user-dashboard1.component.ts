import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';
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
  state :string;
  city :string;
  tables = [0];
  constructor(private http: HttpClient,private router: Router) {
    this.state= "***";
    this.city = "***";
   }
  ngOnInit(): void {
    this.get_dashboard();
  }
  toggleSelection1(li : MatChipList) {
    var result : string[] = [];
    for(const c in li.selected){
      console.log(li.selected[c].value)
      
      if(li.selected[c]){ result.push(li.selected[c].value)}
    }
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    this.filter({state:this.state,city:this.city,facilities:result},headers).subscribe(info=>{
      this.colleges = info.data;
    },(error) => {                              
      console.error('error caught in onStateChange : '+error.message)
    })
}
  toggleSelection(chip: MatChip,li:MatChipList) {
      chip.toggleSelected();
      this.toggleSelection1(li)
  }
  onState(state:any){
    this.state = state.value;
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    console.log(state.value)
    //Fetch list of cities in that state
    this.state_cities(state.value,headers).subscribe(cities=>{
      this.citiesarr=cities.data;
      console.log(cities.data)
    },(error) => {                              
      console.error('error caught in onStateChange : '+error.message)
    })
    //fetch colleges filtered such that they are present only in that state
    this.filter({state:this.state},headers).subscribe(info=>{
      this.colleges = info.data;
    },(error) => {                              
      console.error('error caught in onStateChange : '+error.message)
    })
  }
  oncity(city:any){
    this.city = city.value;
    var request = {"state":this.state,"city":this.city};
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    //fetch colleges filtered such that they are present only in that state
    this.filter(request,headers).subscribe(info=>{
      console.log("on city fetched")
      console.log(info.data)
      this.colleges = info.data;
    },(error) => {                              
      console.error('error caught in onStateChange : '+error.message)
    })
  }
  get_dashboard():void{
    var token = localStorage.getItem('token')||"a"
    console.log(token)
    var headers =new HttpHeaders().set('auth-token',token);
    this.populate_data(headers).subscribe(h=>{
      console.log(h)
      //Intital check for login
      if(!h.auth){
        this.router.navigateByUrl('/user/login');
        alert("Unauthorized Access")
      }else{
        this.colleges=h.table_data;
        this.citiesarr = h.city_data;
        this.statesarr = h.state_data;
        this.facilities = h.facilities_data;
      }
    },(error) => {                              
      console.error('error caught in component',error)
      this.router.navigateByUrl('/user/login');
    })
  }
  
  populate_data(headers:HttpHeaders){
    return this.http.get
    <{"auth" :boolean,"table_data":tile[],"city_data":[],"state_data":[],"facilities_data":[]}>
    ('http://localhost:8080/user/render',{headers})
  }
  //

  //fetch Filtered DATA
  filter(body,headers:HttpHeaders){
    return this.http.post<{"data":[]}>('http://localhost:8080/user/filter',body,{headers})
  }
  //fetch list of cities from the provided state
  state_cities(state:string,headers:HttpHeaders){
    return this.http.post<{"data":[]}>('http://localhost:8080/user/cities',{data:state},{headers})
  }


}
