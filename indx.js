var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write("Hello World!");
  res.write("Our first server");
  res.end();
}
).listen(5000 , console.log("localhost is running on http://localhost:5000"));