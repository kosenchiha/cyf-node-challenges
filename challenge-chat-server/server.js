const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const messages = [];

app.post("/messages", (req, res) => {
  const message = {
    id: messages.length + 1,
    from: req.body.from,
    text: req.body.text
  };
  // 400 bad request
  if (!req.body.from || req.body.from < 3) {
    res.status(400).send("Name is required and should be minimum 3 characters");
    return;
  }
  if (!req.body.text) {
    res.status(400).send("Please, write a message");
    return;
  }
  messages.push(message);
  res.send(message);
});

app.get("/messages", (req, res) => {
  console.log("im working");
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  const message = messages.find(mes => mes.id === parseInt(req.params.id));
  if (!message)
    res.status(404).send("Sorry! User with the given ID was not found");
  res.send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}...`);
});
