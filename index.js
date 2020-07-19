const URL_PREFIX = 'http://hot-xhx.61.com';
const PORT = 8080;

const mime = require('mime')
const buffer = require('buffer');
const fs = require('fs');
const http = require('http');
const app = require('express')();

let clientCore_code = ''

console.log('Download clientCore.js and patch it.')
http.get(`${URL_PREFIX}/js/clientCore.js`,r=>{
	if(r.statusCode !== 200){
		r.resume();
		throw new Error(`Cannot get:${URL_PREFIX}${req.path}`);
	}
	let src = ''
	r.on('data',d=>{src += d});
	r.on('end',()=>{
		src = src.replace(new RegExp('channel.ChannelConfig.channelId','gm'),'channel.ChannelEnum.IOS');
		src = src.replace(`Object.defineProperty(GlobalConfig, "isInnerNet", {
            /* 是内网吗？ */
            get: function () {
                return window.location.href.indexOf('61.com') == -1 || window.location.href.indexOf('huamtest.61.com.tw') > -1; //台湾测试域名也算内网
            },
            enumerable: true,
            configurable: true
        });`,`Object.defineProperty(GlobalConfig, "isInnerNet", {
            /* 是内网吗？ */
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });`)
		//src = src.replace(`url = clientCore.GlobalConfig.isApp ? "js/" + packName + ".js" : "js/" + packName + ".js?" + Math.random();`,`url = clientCore.GlobalConfig.isApp ? "js/" + packName + ".js" : "js/" + packName + ".js";`);
		clientCore_code = src
		console.log(`Done.`);
		app.listen(PORT,()=>{console.log(`Server is listening on port ${PORT}.`)})
	});
});
app.get('/js/*',(req,res)=>{
	if(req.path.indexOf('clientCore.js') > - 1){
		res.send(clientCore_code);
		return;
	}
	if(req.path.indexOf('login2.js') > - 1){
		res.send(fs.readFileSync('login2.js'));
		return;
	}
	http.get(`${URL_PREFIX}${req.path}`,r=>{
		if(r.statusCode !== 200){
			r.resume();
			throw new Error(`Cannot get:${URL_PREFIX}${req.path}`);
		}
		let src = ''
		r.on('data',d=>{src += d});
		r.on('end',()=>{
			src = src.replace(new RegExp('channel.ChannelConfig.channelId','gm'),'channel.ChannelEnum.IOS');
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

