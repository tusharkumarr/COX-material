const express=require('express');

const  Person  = require('./Person');
const bodyParser = require('body-parser');

const cors = require('cors');
const  Sql  = require('./sql');
var a=new Sql();





app=express();
app.use(bodyParser.json());
app.use(cors());
var person;
tablelist=[];
person = new Person('1',"John Doe", 30, "123 Main St");
tablelist.push(person);
person = new Person('2',"Sam", 30, "Wall Street");
tablelist.push(person);
person = new Person('3',"Ravi", 30, "California");
tablelist.push(person);


app.get("",async(req,respo)=>{
    await a.getData().then(data => {
       
        respo.send(data);
   
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
     
});
app.post("/postData",(req,resp)=>{
    // console.log(req.body);
    tablelist.push(req.body);
    resp.send(tablelist);

})
app.delete("/deleteRow",async (req, res) => {
    const itemIdToDelete = req.body.key; 
    a.deleteUser(itemIdToDelete);
    // console.log(itemIdToDelete);
    // tablelist = tablelist.filter(function(item) {
    //     return item.key !== itemIdToDelete;
    // });
    
    // tablelist=tablelist.map((item, idx) => {
        
    //         return { ...item, key: idx};
       
    // })
 
    
    await a.getData().then(data => {
        // return data;
        res.send(data);
   
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
     
});
app.put("/updateRow",async (req,resq)=>{
    // console.log(req.body);

    // tablelist[req.body.ind]= req.body.newobj;
    
    a.updateUser(req.body.newobj.key,req.body.newobj.name,req.body.newobj.age,req.body.newobj.address)
    await a.getData().then(data => {
        // return data;
        resq.send(data);
     
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    
    // resq.send(tablelist);
    
})
app.put("/addDataFromCSV",async (req,resq)=>{
    // console.log(req.body.data);
    for(let i=0;i<req.body.data.length;i++){
       await a.insertData(req.body.data[i].key,req.body.data[i].name,req.body.data[i].age,req.body.data[i].address);
    }
    
    // tablelist = [...tablelist, ...req.body.data];
    await a.getData().then(data => {
        // return data;
        resq.send(data);
      
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    
    
})
const server = app.listen(PORT=5000, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
//for error
  server.on('error', (err) => {
    console.error('Server error:', err);
  });