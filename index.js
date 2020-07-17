const URL_PREFIX = 'http://hot-xhx.61.com';

const mime = require('mime')
const buffer = require('buffer');
const fs = require('fs');
const http = require('http');
const app = require('express')();
app.get('/js/*',(req,res)=>{
	http.get(`${URL_PREFIX}${req.path}`,r=>{
		if(r.statusCode !== 200){
			r.resume();
			throw new Error(`Cannot get:${URL_PREFIX}${req.path}`);
		}
		let src = ''
		r.on('data',d=>{src += d});
		r.on('end',()=>{
			src = src.replace(new RegExp('channel.ChannelConfig.channelId','gm'),'channel.ChannelEnum.IOS');
			src = src.replace(`url = clientCore.GlobalConfig.isApp ? "js/" + packName + ".js" : "js/" + packName + ".js?" + Math.random();`,`url = clientCore.GlobalConfig.isApp ? "js/" + packName + ".js" : "js/" + packName + ".js";`);
			src = src.replace(`return window.location.href.indexOf('61.com') == -1;`,'return false;')
			res.send(src);
			console.log(`GET ${URL_PREFIX}${req.path}`);
		});
	});
});
app.all('/index.html',(req,res)=>{
        res.set('Content-type',mime.getType('index.html'));
        res.send(fs.readFileSync('./index.html'));
});
app.all('/*',(req,res)=>{
	http.get(`${URL_PREFIX}${req.path}`,r=>{
		let chunks = [];
		r.on('data',chunk=>{chunks.push(chunk)});
		r.on('end',()=>{
			console.log(`GET ${URL_PREFIX}${req.path}`);
			res.set('content-type',mime.getType('req.path'))
			res.send(buffer.Buffer.concat(chunks))
		})
	});
});
app.listen(8080)
