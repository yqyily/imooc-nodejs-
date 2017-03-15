var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie')
var port = Number(process.env.PORT) || 7000;
var app = express();
// mongoose.connect('mongodb://localhost/imooc')
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
	res.render('index',{
		title:'imooc 首页',
		movies:[{
			title: '机械战警',
			_id: 1,
			poster: 'https://creditmanager.b0.upaiyun.com/724bb3efe4c954a835f74f06dec2d4be'
		},{
			title: '机械战警',
			_id: 1,
			poster: 'https://creditmanager.b0.upaiyun.com/724bb3efe4c954a835f74f06dec2d4be'
		}]
	});
})
// list page
app.get('/admin/list', function(req, res){
	res.render('list',{
		title:'imooc 列表页',
		movies: [{
			title: '机械战警',
			_id: 1,
			doctor: '',
			country: '',
			year: 2014,
			poster: 'http://',
			language: 'english',
			flash: '',
			summary: ''
		}]
	});
})
// detail page
app.get('/movie/:id', function(req, res){
	res.render('detail',{
		title:'imooc 详情页',
		movie:{
			doctor:'dddd ',
			country:'dddd ',
			title:'机械战警',
			year: 2014,
			poster: 'http:www',
			language: 'english',
			flash: '',
			summary: ''
		}
	});
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