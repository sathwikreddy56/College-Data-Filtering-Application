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
  collegesf!: tile[];
  dataSource =this.colleges;

  statesarr !: string[] ;
  citiesarr !: string[] ;
  facilities !:string[];
  filterFacilities !:[];

  result !:string []
  state :string;
  city :string;
  search :any;
  tables = [0];
  constructor(private http: HttpClient,private router: Router) {
    this.state= "***";
    this.city = "***";
    this.result  = [];
   }
  ngOnInit(): void {
    this.get_dashboard();
  }
  searchf()
  {
    if(this.search ==""){
      this.colleges = this.collegesf;
    }else{
      this.colleges = this.collegesf.filter(college=>{
        return college.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase())
      })
    }
  }
  onSearch(item:any){
    this.search = item.target.value;
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    this.filter({state:this.state,city:this.city,facilities:this.result,search:this.search},headers).subscribe(info=>{
      this.colleges = info.table_data;
      this.statesarr = info.state_data;
      this.citiesarr = info.city_data;
    },(error) => { console.error('error caught in Facilities toggle : '+error.message)})
  }
  toggleSelection1(li : MatChipList) {
    this.result =[]
    for(const c in li.selected){
      console.log(li.selected[c].value)
      if(li.selected[c]){ if(!this.result.includes(li.selected[c])) this.result.push(li.selected[c].value)}
    }
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    this.filter({state:this.state,city:this.city,facilities:this.result},headers).subscribe(info=>{
      this.colleges = info.table_data;
      this.collegesf = info.table_data;
      this.statesarr = info.state_data;
      this.citiesarr = info.city_data;
    },(error) => { console.error('error caught in Facilities toggle : '+error.message)})
}
  toggleSelection(chip: MatChip,li:MatChipList) {
      chip.toggleSelected();
      this.toggleSelection1(li)
  }
  onState(state:any){
    this.state = state.value;
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    console.log(this.state,this.city,this.result);
    this.filter({state:this.state,city:this.city,facilities:this.result},headers).subscribe(info=>{
      this.colleges = info.table_data;
      this.collegesf = info.table_data;
      this.citiesarr = info.city_data;
      this.filterFacilities = info.facilities_data;
      console.log(info)
    },(error) => { console.error('error caught in onStateChange : '+error.message)})
    
  }
  oncity(city:any){
    this.city = city.value;
    var request = {"state":this.state,"city":this.city,"facilities":this.result};
    var token = localStorage.getItem('token')||"a"
    var headers =new HttpHeaders().set('auth-token',token);
    //fetch colleges filtered such that they are present only in that state
    this.filter(request,headers).subscribe(info=>{
      console.log("on city fetched")
      this.colleges = info.table_data;
      this.collegesf = info.table_data;
      this.citiesarr = info.city_data;
      this.filterFacilities = info.facilities_data;
    },(error) => { console.error('error caught in onCityChange : '+error.message) })
  }
  get_dashboard():void{
    var token = localStorage.getItem('token')||"a"
    console.log(token)
    var headers =new HttpHeaders().set('auth-token',token);
    this.populate_data(headers).subscribe(h=>{
      console.log(h)
      //Intital check for login
      if(!h.auth){
        alert("Unauthorized Access")
        this.router.navigateByUrl('/user/login');
      }else{
        this.colleges  =h.table_data;
        this.collegesf = h.table_data;
        this.citiesarr = h.city_data;
        this.statesarr = h.state_data;
        this.facilities = h.facilities_data;
      }
    },(error) => {                              
      console.error('error caught while intializing',error)
      this.router.navigateByUrl('/user/login');
      alert("Unauthorized Access")
    })
  }
  reset():void{
    console.log("Hard Reset")
    this.state="***"
    this.city = "***"
    this.ngOnInit()
  }
  logout():void{
    console.log("logout")
    localStorage.clear();
    this.router.navigateByUrl('/user/login');
    alert("logged out!")
  }
  populate_data(headers:HttpHeaders){
    return this.http.get
    <{"auth" :boolean,"table_data":tile[],"city_data":[],"state_data":[],"facilities_data":[]}>
    ('http://localhost:8080/user/render',{headers})
  }
  //

  //fetch Filtered DATA
  filter(body,headers:HttpHeaders){
    return this.http.post<{"table_data":tile[],"city_data":[],"state_data":[],"facilities_data":[]}>('http://localhost:8080/user/filter',body,{headers})
  }
  //fetch list of cities from the provided state
  state_cities(state:string,headers:HttpHeaders){
    return this.http.post<{"data":[]}>('http://localhost:8080/user/cities',{data:state},{headers})
  }


}
