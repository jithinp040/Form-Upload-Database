<template>
  <div class="hello">
    <form action="/insert" method="post" name="form1">
     <label class="home">Customer Name:</label>
     <input v-model.lazy="user.name" class="detail" name="name" type="text"  >
     <br>
     <label class="home">Age:</label>
     <input v-model.lazy="user.age" class="detail" name="age" type="text"  />
     <br>
     <label class="home">Amount:</label>
     <input v-model.lazy="user.amount" name="amount" class="detail" type="text"  />
     <br>
     <label class="home">Address:</label>
     <textarea v-model.lazy="user.address" class="detail" name="address" type="text"  ></textarea>
     <br>
     <select width="20px" v-model.lazy="user.product" name="product" class="detail">
      <option class="home" disabled value="">Please select one</option>
      <option>Colgate</option>
      <option>pepsodent</option>
      <option>Patanjali</option>
    </select>
    <button class="buton" type="submit">Add</button>
  </form>
  <form method="get" action="/list" type="form2"> 
    <button class="buton" @click="searchit()">Search</button>
  </form>
  <table width="80%" id="firstTable">
  <thead>
    <tr>
      <th  width="10%">Name</th>
      <th width="10%">Product</th>
      <th width="5%">Age</th>
      <th width="30%">Address</th>
      <th width="15%">Amount</th>
      <th width="5%">Edit</th>
      <th width="5%">Remove</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="use in user">
      <td >{{use.name}}</td>
      <td >{{use.product}}</td>
      <td >{{use.age}}</td>
      <td >{{use.address}}</td>
      <td >{{use.amount}}</td>
      <form method="GET" action="/edit" name="form3">
      <td ><button @click="editit()">Edit</button></td>
      </form>
      <form method="POST" action="/delete" name="form4">
      <td><button @click="deleteit()">Delete</button></td>
      </form>
    </tr>
  </tbody>
  </table>
</div>
</template>

<script>
import axios from "axios" 
export default {
  name: 'HelloWorld',
  data () {
    return {
  user : {
      name:'',
      product:'',
      address:'',
      amount:'',
      age:''
      }    
      }
  },
  created(){
    this.searchit();
  },
  methods:{
    addit(){
      axios.post('http://localhost:3000/insert',user).then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    deleteit(){
      axios.post('http://localhost:3000/delete',user).then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    searchit(){
      axios.get('http://localhost:3000/list',user).then((response)=>{
        this.user=response.data
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    },
      editit(){
      axios.get('http://localhost:3000/edit',user).then((response)=>{
        this.user=response.data
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home{
  text-align:"right";
  display: block;
}
.detail{
  margin: 10px 10px 10px;
}
.buton{
  margin:right;
  size:100px;
  display:inline-flex;
}
</style>
