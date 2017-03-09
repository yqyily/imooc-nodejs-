var express = require('express');
var port = Number(process.env.PORT) || 7000;
var app = express();
// 设置视图的根目录
app.set('views', './views');
// 设置默认的模板引擎
app.set('view engine', 'jade');
app.listen(port);
console.log('imooc started on port' + port);

// index page
app.get('/', function(req, res){
	res.render('index',{
		title:'imooc 首页'
	});
})
// list page
app.get('/admin/list', function(req, res){
	res.render('list',{
		title:'imooc 列表页'
	});
})
// detail page
app.get('/movie/:id', function(req, res){
	res.render('detail',{
		title:'imooc 详情页'
	});
})
// admin page
app.get('/admin/movie', function(req, res){
	res.render('admin',{
		title:'imooc 后台录入页'
	});
})