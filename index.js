var express = require('express')
var fs = require('fs')
var path = require('path')
var child_process = require('child_process')
var app = express()

app.get('/:bot', function (req, res) {
	var file = path.join(__dirname, req.params.bot)
	fs.stat(file, function(err, stats) {
		if (!err && stats.isFile()) {
			var child = child_process.spawn(file)
			res.status(200).set('Content-Type', 'application/json; charset=utf-8')
			child.stdout.pipe(res)
			child.stderr.pipe(process.stderr)
			child.stdin.write(JSON.stringify(req.query))
			child.stdin.end()
		}else{
			res.status(404).json({status: 'error', text: 'bot doesnt exist'})
		}

	})
})

app.listen(3000)
