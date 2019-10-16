import React,{Component} from 'react';
import './App.css';

class App extends Component {
  
constructor(props)
{
  super(props);
  this.state={
    route:"rest",
    mode:"insert",
    deleteids:[],
    headers:  [{id:0,name:'',address:'',open:'',dist:''}],
    restaurants: [  
    ]
  }
}

fetchRest(){
        fetch('').then(res=> res.json())
        .then(data=>{this.setState({restaurants:data})})
        .then(xy=>console.log("Fetching AGAIN"))
        .then(y=>console.log(this.state))
        .catch((err)=>{console.log(err);})
}

 componentDidMount() {
  this.fetchRest();
    }


renderTableHeader() {
  let header = Object.keys(this.state.headers[0])
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}

renderDeleteTableHeader() {
  let header = Object.keys(this.state.headers[0])
  header.unshift("Check");
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}

renderInsertTableHeader() {
  let header = Object.keys(this.state.headers[0])
  header.push("Insert/Cancel");
  return header.map((key, index) => {
     return <th key={index}>{key.toUpperCase()}</th>
  })
}




renderInsertTableData() {
  
  var p= this.state.restaurants.map((restaurant, index) => {
     const { id, name, address, open,dist } = restaurant //destructuring
     return (
    
        <tr key={id}>
           <td>{id}</td>
           <td>{name}</td>
           <td>{address}</td>
           <td>{open}</td>
           <td>{dist}</td>
           <td></td>
        </tr>
    
     )
   
  })
  p.push(
        <tr key={this.state.restaurants.length+1}>
           <td>{this.state.restaurants.length+1}</td>
           <td><input type="text" name="name" style={{width:"250px",height:"50px"}} onChange={(e)=>{this.setState({newName:e.target.value})}} /></td>
           <td><input type="text" name="address" style={{width:"350px",height:"100px"}} onChange={(e)=>{this.setState({newAddress:e.target.value})}} /></td>
           <td><input type="text" name="open" style={{width:"250px",height:"50px"}} onChange={(e)=>{this.setState({newOpen:e.target.value})}} /></td>
           <td><input type="text" name="dist" style={{width:"250px",height:"50px"}} onChange={(e)=>{this.setState({newDist:e.target.value})}} /></td>
           <td>
            <input type="button" value="Insert" style={{width:"60px",marginRight:"2px",height:"40px"}} onClick={this.onTick}/><br/>
            <input type="button" value="Cancel" style={{width:"60px",height:"40px"}} onClick={()=>{this.setState({mode:"home"})}}/>
           </td>
        </tr>
    
    )
  return p;
}


onTick=(e)=>
{
  this.setState({newId:(this.state.restaurants.length+1).toString()},function(){
    console.log(this.state)
    this.handleInsert(e);
  })
  
  
}

renderTableData() {
  return this.state.restaurants.map((restaurant, index) => {
     const { id, name, address, open,dist } = restaurant //destructuring
     return (
        <tr key={id}>
           <td>{id}</td>
           <td>{name}</td>
           <td>{address}</td>
           <td>{open}</td>
           <td>{dist}</td>
        </tr>
     )
  })
}

funct=(e)=>
{
  this.state.deleteids.includes(e.target.name)?
      this.state.deleteids= this.state.deleteids.filter(item => item !== e.target.name) :
      this.state.deleteids.push(e.target.name)
      console.log(this.state)
}

renderDeleteTableData() {
  return this.state.restaurants.map((restaurant, index) => {
     const { id, name, address, open,dist } = restaurant //destructuring
     return (
        <tr key={id}>

           <td><input type="checkbox" name={id} onChange={(e)=>{this.funct(e)}}/></td>
           <td>{id}</td>
           <td>{name}</td>
           <td>{address}</td>
           <td>{open}</td>
           <td>{dist}</td>
        </tr>
     )
  })
}

handleDelete = (event) =>{
  // event.preventDefault();
console.log(this.state.deleteids)
  console.log("DELETING")
  this.state.deleteids.map((id, index) => {
    const url=""+id;
    console.log(url);

     fetch(url,{
      method:'delete'
      }).then(res=> res.json())
      .then(data=>alert((data.success?"Success":"Failed to Delete")))
      .then(xy=>this.fetchRest())
      .then(yz=>this.setState({mode:"home"}) )
        
      .catch((err)=>{console.log(err);})
        console.log(this.state);
  
});
console.log("DELETING ENDS")
}



handleInsert = (event) =>{
  event.preventDefault();


    const url="";
    console.log(url);
    var length=this.state.restaurants.length;
    
    fetch(url,{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
            id:this.state.newId,
            name:this.state.newName,
            address:this.state.newAddress,
            open:this.state.newOpen,
            dist:this.state.newDist

        })
      }).then(res=> res.json())
        .then(data=>console.log((data)))
        .then(xy=>this.fetchRest())
        .then(yz=>this.setState({mode:"home"}) )
        .catch((err)=>{console.log(err);})
        
    console.log(this.state);
    
}

handlePost2 = (event) =>{
  // event.preventDefault();

console.log("INS")
    const url="";
    console.log(this.state);
    var length=this.state.restaurants.length;
    
    fetch(url,{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
            id:this.state.updatedId,
            name:this.state.updatedName,
            address:this.state.updatedAddress,
            open:this.state.updatedOpen,
            dist:this.state.updatedDist

        })
      }).then(res=> res.json())
        .then(data=>console.log((data)))
        .then(xy=>this.fetchRest())
        .then(yz=>this.setState({mode:"home"}) )
        .catch((err)=>{console.log(err);})
        
    console.log(this.state);
    
 
console.log("INS DONE")
}

handlePut = (event) =>{
  event.preventDefault();

this.state.deleteids.push(this.state.updatedId)  
  this.handleDelete();
  this.handlePost2();
    

    }


handleStart= (event) =>
{
  event.preventDefault();
  this.setState({route:"rest"});
}

onRouteChange = (route) =>
{
  this.setState({route})
}

render()
{
  return (
<div>
{ (this.state.route==="rest")?

                            (
                              <div>
                                        <nav>
                                        <div style={{display:"flex"}}>
                                          <p style={{height:"30px",width:"13%",background:"#ffffff"}} onClick={() => this.setState({mode:"update"})} className="f3 b blue hover-black bg-animate bg-white hover-bg-gold dim pa3 pointer">Update Restaurants </p>
                                          <p style={{height:"30px",width:"13%",background:"#ff0000"}} onClick={() => this.setState({mode:"insert"})} className="f3 b blue hover-black bg-animate bg-white hover-bg-gold dim pa3 pointer">Insert Restaurants </p>
                                          <p style={{height:"30px",width:"13%",background:"#ffffff"}} onClick={() => this.setState({mode:"delete"})} className="f3 b blue hover-black bg-animate bg-white hover-bg-gold dim pa3 pointer">Delete Restaurants </p>
                                        </div>
                                        </nav>
                                             {
                                              
                                              ((this.state.mode==="home")?
                                          
                                              <table id='students'>
                                                  <tbody>

                                                {this.renderTableHeader()}
                                                {this.renderTableData()}

                                                  </tbody>
                                                </table>

                                             
                                            :(this.state.mode==="delete")?
                                            <div>
                                              <table id='students'>
                                                <tbody>
                                        
                                                {this.renderDeleteTableHeader()}
                                                {this.renderDeleteTableData()}
                                            
                                                </tbody>
                                              </table>
                                              <input className="ma2 pa2 tc pointer" onClick={this.handleDelete} style={{marginBottom:"20px"}} type="button" value="Delete Selected"/>
                                             </div> 
                                            :(this.state.mode==="insert")?
                                              <div>
                                                <table id='students'>
                                                  <tbody>
                                          
                                                  {this.renderInsertTableHeader()}
                                                  {this.renderInsertTableData()}
                                              
                                                  </tbody>
                                                </table>
                                                
                                              </div>
                                              : (this.state.mode==="update")?
                                              <div>
                                              <table id='students'>
                                                  <tbody>

                                                {this.renderTableHeader()}
                                                {this.renderTableData()}

                                                  </tbody>
                                                </table>
                                                <br/>
                                                <div className="tc ma2 pa3 bg-black">
                                                <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedId:e.target.value})}} type="text" name="updateid" placeholder="Enter ID" autoComplete="off"/><br/>
                                                <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedName:e.target.value})}} type="text" name="updatename" placeholder="Enter Name" autoComplete="off"/><br/>
                                                <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedAddress:e.target.value})}} type="text" name="updateaddr" placeholder="Enter Address" autoComplete="off"/><br/>
                                                <input style={{width:"300px"}} onChange={(e)=>{this.setState({updatedOpen:e.target.value})}} type="text" name="updateopen" placeholder="Open Now?" autoComplete="off"/><br/>
                                                <input type="button" name="btn" value="Confirm Update" onClick={this.handlePut}/><br/>
                                                </div>
                                               </div>                  
                                            :
                                              <p>ERROR 404</p>
                                              )
                                            }
                                            
                                    
                               </div> 
                            )                                       :
                                              <p>ERROR 404</p>
                                              
     
                                
                          }
               </div>

);
}
}

export default App;




// withAuthenticator(App, true);


