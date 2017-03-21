var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(express)
var Movie = require('./models/movie')
var User = require('./models/user')
var _ = require('underscore');
var port = Number(process.env.PORT) || 7000;
var app = express();
var dbUrl = 'mongodb://localhost/imooc'
mongoose.connect('mongodb://localhost/imooc')
// 设置视图的根目录
app.set('views', './views/pages');
// 设置默认的模板引擎
app.set('view engine', 'jade');
//可以将表单数据进行格式化
var bodyParser = require('body-parser');
// app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session({
	user:'imooc',
	store:new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}))
app.listen(port);
console.log('imooc started on port ' + port);

// index page
app.get('/', function(req, res){

	var _user = req.session.user;
	if(_user){
		app.locals.user = _user;
	}
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'imooc ' + movie.title,
			movies:movies
		});

	})
})
// list page
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'imooc ' + movie.title,
			movies:movies
		});

	})
})
// userlist page
app.get('/admin/userlist', function(req, res){
	Movie.fetch(function(err, users){
		if(err){
			console.log(err);
		}
		res.render('userlist',{
			title:'imooc用户列表页 ',
			users:users
		});

	})
})
// detail page
app.get('/movie/:id', function(req, res){
	var id = req.params.id;
	Movie.findById(id, function(err, movie){
		res.render('detail',{
			title:'imooc ' + movie.title,
			movie: movie
		});
	})
	
})
// admin page
app.get('/admin/movie', function(req, res){
	res.render('admin',{
		title:'imooc 后台录入页',
		movie:{
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	});
})
//admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id;
	if(id){
		Movie.findById(id, function(err, movie){
			res.render('admin',{
				title: 'imooc后台更新页',
				movie: movie
			})
		})
	}
})
//admin post movie
app.post('/admin/movie/new', function(req, res){
	var id = res.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	if(id !== 'undefined'){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err);
			}
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/' + movie._id)
			})
		})
	}
	else{
		_movie = new Movie({
			title: movieObj.title,
			doctor: movieObj.doctor ,
			country: movieObj.country,
			year: movieObj.year,
			poster: movieObj.poster,
			flash: movieObj.flash,
			summary: movieObj.summary,
			language: movieObj.language
		})
		_movie.save(function(err, movie){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/' + movie._id)
		})
	}
})

//list delete movie
app.delete('/admin/list', function(req, res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id: id}, function(err, movie){
			if(err){
				console.log(err);
			}
			else{
				res.json({success: 1})
			}
		})
	}
})
//signup
app.post('/user/signup',function(){
	var _user = req.body.user
	var user = new User(_user)
	//是否已经注册过
	User.find({name: _user.name}, function(err, user){
		if(err){
			console.log(err)
		}
		if(user){
			req,redirect('/');
		}else{
			var user = new User(_user)
			user.save(function(err, user){
				if(err){
					console.log(err)
				}
				res.redirect('/admin/userlist')
			})

		}
	})
	
})
//signin
app.post('/user/signin', function(req, res){
	var _user = req.body.user
	var name = _user.name;
	var password = _user.password;
	User.findOne({name: name}, function(err, user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/')
		}
		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				req.session.user = user;
				return res.redirect('/')
			}else{
				console.log('Password is not matched')
			}
		})
	})
})
//logout
app.get('/logout', function(req, res){

})