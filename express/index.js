const express = require('express');
const app = express();

// middelware
app.use((req, res, next) => {
  console.log('M1');
  res.send(`
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
  next();
});

app.use((req, res, next) => {
  console.log('M2');
});

app.use((req, res, next) => {
  console.log('M3');
});

app.listen(8500, () => {
  console.log(`Server is running on port: 8500`);
});

// [C]----->[S]
//               ()M1
//     <---------()M2
