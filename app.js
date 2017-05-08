var express = require('express'),
	querystring = require("querystring"),
	http = require("http"),
	app     = express(),
	port    = process.env.PORT || 8000,
	handlebars  =   require('express3-handlebars'),
	_  = require('underscore'),
	bodyParser = require('body-parser'),
	// exec = require('exec'),
	hbs = handlebars.create({
		partialsDir: 'views/partials/', //复用模块
		layoutsDir: "views/layouts/",  
		defaultLayout: 'main', 
		extname: '.handlebars'
	}),
	routes = require('./routes/index');



app.engine('handlebars', hbs.engine );
app.set('view engine', 'handlebars');

//配置相对顶级路径
app.use(express.static(__dirname + '/dist'));   //文件引用位置
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/consultant-api/*", (req, res) => {
	//console.log(req.body)
	var postData = querystring.stringify(req.body)
	var proxyRequest = http.request({
		host: process.env.NODE_URL || "121.43.173.118",
		port: process.env.NODE_PORT || 8888,
		path: req.path,
		method: req.method,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": Buffer.byteLength(postData)
		}
	}, (proxyResponse) => {
		res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

		var str = ""
		proxyResponse.on("data", (data) => {
			str +=  data
		})

		proxyResponse.on("end", (data) => {
			//str +=    data
			//console.log(str)
		})

		proxyResponse.pipe(res)
	})

	proxyRequest.write(postData)
	proxyRequest.end()
})

app.listen(port);
routes(app);