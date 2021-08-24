# 项目已停止维护
项目已归档，请使用Chromium系游览器调试工具的Overrride功能，手动给clientCore.js和login2.js打补丁  
方法：  
将两个文件中所有`channel.ChannelConfig.channelId` 改为`channel.ChannelEnum.IOS`  
将clientCore.js中`url = clientCore.GlobalConfig.isApp ? "js/" + packName + ".js" : "js/" + packName + ".js?" + Math.random();`改为`url = clientCore.GlobalConfig.isApp ? "js/" + packName + ".js" : "js/" + packName + ".js`
# xhx_desktopify
让小花仙手游在游览器中运行  
此工具可以让小花仙手游在电脑游览器中运行。  
## 使用
克隆仓库 `npm install && node .`  
在hosts中加一行`127.0.0.1 aaaa.61.com`
在游览器中访问http://aaaa.61.com:8080/index.html

