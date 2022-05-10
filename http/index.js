/* Http */
const http = require('http');
const fs = require('fs');
const path = require('path');

const showMainPage = (res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
  <html>
    <head>
      <title> HTTP Example</title>
      <style>h1{ color: blue} body{ background-color: black}</style>
    </head>
    <body>
      <h1>CORE CODE</h1>
      <form action="/send_message" method="POST">
        <input type="text" name="msg" placeholder="Add input...">
        <button type="submit">Send Message</button>
      </form>
    </body>
  </html>
`);
  res.end();
};

const pageNotFound = (res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
  <html>
    <head>
      <title> Not Found </title>
      <style>h1{ color: yellow} body{ background-color: black}</style>
    </head>
    <body>
      <h1>The page you are looking for is not here</h1>
    </body>
  </html>
`);
  res.end();
};

const logInteraction = (req) => {
  const logPath = path.join('.', path.sep, 'files', 'log.txt');
  // place to store chunks
  const reqBody = [];
  // event to get all chunks
  req.on('data', (chunk) => {
    console.log(chunk);
    reqBody.push(chunk);
  });
  // end of client transmission
  req.on('end', () => {
    const parseBody = Buffer.concat(reqBody).toString('utf-8');
    console.log(parseBody);
    const msg = parseBody.split('=')[1];
    fs.writeFileSync(logPath, `${new Date()} - ${msg} \n`, { flag: 'a' });
  });
};

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === '/') {
    return showMainPage(res);
  } else if (url === '/send_message' && method === 'POST') {
    logInteraction(req);
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  return pageNotFound(res);
};

const server = http.createServer(requestHandler);

server.listen(8500);
