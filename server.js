const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');

const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'comments'
  }
});

let app = express();
app.use(express.static('static'));
app.use(bodyParser.json());


app.get('/home', (req,res)=>{
	db.select('*').from('comments')
	.then(comments => {
		//comments = JSON.stringify(data);
		res.json(comments);
	})
	.catch(err => res.status(400).json('failed to load comments'))
});

app.post('/comment', (req,res)=>{
	const {username, comment} = req.body;
	db('comments')
	.returning('userName')
	.insert({				
		userName: username,
		comment: comment
	})
	.then(name => {
		res.json(name);
	})
	.catch(err => res.status(400).json('failed to load comments'))
});


let server = app.listen(3000, function(){
	console.log('listening to requests on port 3000');
});

//loadcomments -->GET = home
//username -->POST = username
//comment --> POST = comment
