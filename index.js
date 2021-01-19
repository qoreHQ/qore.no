var express = require('express')
var http = require('http')
var path = require('path')
var port = 3000

var app = express()

// Server static resources
app.use(express.static(__dirname + '/public'))

// Set route for `/`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Handle 404
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '/public/404.html'))
})

// Handle 500
app.use(function (error, req, res, next) {
    res.sendFile(path.join(__dirname, '/public/50x.html'))
})

var server = http.createServer(app)
server.listen(port, () => {
    console.log('Server is running on http://localhost:' + port)
})
