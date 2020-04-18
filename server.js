// using mysql knex
const express=require("express");
var bodyParser=require("body-parser")
  

//this is the framework app express 
var app=express();										

//use of ejs file ejs convert data and fronted
// app.use(express.static(__dirname + '/routes/views'))
// app.use(express.static(__dirname + '../public'));
app.set('view engine', 'ejs') 								
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
	

//mysql connect database syntax
var conn={
	host: "localhost",										
	user: "root",
	password: "aijaj123",
	database: "blog"
}

//knex mysql connect using module of knex
var knex=require("knex")({
	client: "mysql", connection: conn
});  

//create users table
knex.schema.hasTable('users')
.then((exists)=>{		
	if (!exists){
		knex.schema.createTable('users',(table2)=>{
		table2.increments('id').primary();
		table2.string('name').notNullable();
		table2.string('email').unique();
		table2.string('password');
		console.log("user table allready exists")
		})
		.catch((err)=>{console.log(err.message)})
	}
	else{
		console.log("users table is allready exists")
	}
});

//this is only for routes or routers
const user=express.Router();
app.use('/',user)
require('./routes/user')(user, knex)


var port=process.env.Port || 2050 ;
app.listen(port,()=>{
	console.log("server is running",port);
});