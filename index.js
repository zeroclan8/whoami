'use strict';

var http = require("http");
var url = require("url");
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("pathname:" + pathname);
    if(pathname == "/api/whoami"){
        // {"ipaddress":"107.178.195.199","language":"zh-CN","software":"Windows NT 10.0; WOW64"}
        var resultObj = { };
        resultObj.ipaddress = request.connection.remoteAddress.substr(7);
        resultObj.language = request.headers["accept-language"].substr(0, request.headers["accept-language"].indexOf(","));
        resultObj.software = request.headers["user-agent"].substring(request.headers["user-agent"].indexOf("(") + 1, request.headers["user-agent"].indexOf(")"));
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(resultObj));
        response.end();
    }
}).listen(8080);
