const router = require('express').Router();
const auth = require('./verifyToken')
var data = require('../Data/College_details Task.json');
var mydata =[];
var cities = [];
var state = [];
var facilities =[];
var state_city=[];
var filter_data = [];
console.log("Processed")
data.forEach(Element=>{
    var temp = Element;
    var flist = temp.facilities.split(",");
    temp.facilities = flist;
    mydata.push(temp);
    filter_data.push(temp);
    var city_name = Element.city
    var state_name = Element.state

    if(state.includes(Element.state)==false){
        state.push(state_name)
        state_city[state_name]=[]
        state_city[state_name].push(city_name)
    }
    if(cities.includes(Element.city)==false){
        cities.push(city_name)
        if(state_city[state_name].includes(Element.city)==false){
            state_city[state_name].push(city_name)
        }
    }
    flist.forEach(facility=>{
        if(facilities.includes(facility)==false && facility!=""){
            facilities.push(facility);
        }
    })
})
router.get('/render',auth,(req,res)=>{
    res.json({"auth":true,
        table_data:mydata,
        "city_data":cities.sort(),
        "state_data":state.sort(),
        "facilities_data":facilities.sort(function(a, b){return b.length - a.length;})
    })
})

//RESPOND WITH LIST OF CITIES IN THAT STATE
router.post('/cities',auth,(req,res)=>{
    console.log(req.body.data)
    res.json({data:state_city[req.body.data]})
})
//FILTERING
router.post('/filter',auth,(req,res)=>{
    console.log("filter data ",req.body)
    if(req.body.state && req.body.state!="***"){
        console.log("state filter")
        var temp =[]
        filter_data.forEach(ele=>{
            if(ele.state==req.body.state) temp.push(ele);
        })
        filter_data=temp;
    }
    if(req.body.city && req.body.city!="***"){
        console.log("city filter")
        var temp =[]
        filter_data.forEach(ele=>{ if(ele.city==req.body.city)  temp.push(ele); })
        filter_data=temp;
    }
    if(req.body.facilities && req.body.facilities.length != 0){
        console.log("facilities filter")
        var temp =[]
        filter_data.forEach(ele=>{ 
            var flag = true;
            req.body.facilities.forEach(facility=>{   
                if(ele.facilities.includes(facility)==false) flag = false
                
            })
         if(temp.includes(ele) ==false && flag==true ) temp.push(ele);
    })
        filter_data=temp;
    }
    res.json({data:filter_data})
    filter_data = mydata;
})
module.exports = router;