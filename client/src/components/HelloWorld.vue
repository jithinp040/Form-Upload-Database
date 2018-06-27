<template>
  <div class="hello">
    <div class=".container">
    <form action="/insert" @submit.prevent="addit()" method="POST" name="form1">
     <label class="label label-default">Name:</label>
     <input class="form-group" v-model.lazy="user.name" name="name" type="text"  >
     <br>
      <label class="label label-default">Age:</label>
     <input class="form-group" v-model.lazy="user.age" name="age" type="number"  />
     <br>
     <br>
     <label class="label label-default">Class:</label>
     <input class="form-group" v-model.lazy="user.class" name="amount" type="text"  />
     <br>
     <br>
     <label class="label label-default">Dob:</label>
     <input class="form-group" v-model.lazy="user.dob" name="amount" type="text"  />
     <br>
     <br>
   <button class="button btn-add" type="submit">Add</button>
    </form>
  <form action="/search" @submit.prevent="listit()" method="GET" name="form1">
    <button class="button btn-add" type="submit">Search</button>
  </form> 
  <table class ="table table-bordered" width="80%" >
  <thead class="thead-dark">
    <tr>
      <th width="10%">Name</th>
      <th width="10%">Roll No</th>
      <th width="5%">Class</th>
      <th width="30%">Dob</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="use in userlist">
      <td >{{use.name}}</td>
      <td >{{use.age}}</td>
      <td >{{use.Class}}</td>
      <td >{{use.ndob}}</td>
    </tr>
  </tbody>
  </table>
</div>
</div>
</template>

<script>
import axios from "axios" 
export default {  
  data () {
    return {
  user : {
    name:'',
    age:'',
    Class:'',
    ndob:''
  },
  userlist:[]
  }
  },  
  mounted(){
  },
  methods:{
    addit(){
      let finuser={
        name:this.user.name,
        age:this.user.age,
        class:this.user.class,
        dob:this.user.dob,
      }
      console.log(finuser)
      alert("this is called" + finuser)
      axios.post('http://192.168.1.7:8000/addstudent/insert',JSON.stringify(finuser)).then((response)=>{
        console.log(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
      location.reload()
    },
    listit(){
        axios.get('http://192.168.1.7:8000/liststudent/list').then((response)=>{
          this.userlist=JSON.parse(JSON.stringify(response.data))
        console.log(this.userlist)
      })  
      .catch((error)=>{
        console.log(error)
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
button{
  margin:10px;
  padding:5px;
}
select{
  width:200px
}
table{
  width:80px
}
</style>
