var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie')
var _ = require('underscore');
var port = Number(process.env.PORT) || 7000;
var app = express();
mongoose.connect('mongodb://localhost/imooc')
// 设置视图的根目录
app.set('views', './views/pages');
// 设置默认的模板引擎
app.set('view engine', 'jade');
//可以将表单数据进行格式化
var bodyParser = require('body-parser');
// app.use(express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.listen(port);
console.log('imooc started on port ' + port);

// index page
app.get('/', function(req, res){
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
				res.redirect('/movie' + movie._id)
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
			res.redirect('/movie' + movie._id)
		})
	}
})