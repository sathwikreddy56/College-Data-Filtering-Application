const router = require('express').Router();
const auth = require('./verifyToken')
var data = require('../Data/College_details Task.json');
var mydata =[];
var cities = [];
var state = [];
var state_city=[];
console.log("Processed")
data.forEach(Element=>{
    var temp = Element;
    var flist = temp.facilities.split(",");
    temp.facilities = flist;
    mydata.push(temp);
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
})
// console.log(state)
router.get('/dashboard',auth,(req,res)=>{
    res.json({"auth":true,data:mydata})
})
router.get('/colleges',auth,(req,res)=>{
    res.json({"auth":true,data:mydata})
})

router.get('/states',auth,(req,res)=>{
    console.log("states data sent")
    res.json({data:state.sort()})
})
router.post('/states',auth,(req,res)=>{
    console.log("states data sent")
    console.log(req.body.data)
    res.json({data:state.sort()})
})

router.post('/cities',auth,(req,res)=>{
    console.log(req.body.data)
    res.json({data:state_city[req.body.data]})
})
router.get('/cities',auth,(req,res)=>{
    res.json({data:cities})
})
module.exports = router;