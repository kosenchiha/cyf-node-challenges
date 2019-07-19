const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const messages = [];
function messageNotFound(message, res) {
  if (!message)
    return res
      .status(404)
      .send("Sorry! Message with the given ID was not found");
}
function validateName(req, res) {
  if (!req.body.from || req.body.from.length < 3)
    return res
      .status(400)
      .send("Name is required and should be minimum 3 characters");
}
function validateMessage(req, res) {
  if (!req.body.text) return res.status(400).send("Please, write a message");
}

app.post("/messages", (req, res) => {
  const message = {
    id: messages.length + 1,
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date().toLocaleString()
  };
  // 400 bad request
  validateName(req, res);
  validateMessage(req, res);
  messages.push(message);
  res.send(message);
});

app.get("/messages", (req, res) => {
  if (req.query.text) {
    const messagesContainText = messages.filter(mes =>
      mes.text.includes(req.query.text)
    );
    res.send(messagesContainText);
  } else {
    res.send(messages);
  }
});

app.get("/messages/search", (req, res) => {
  const messagesContainText = messages.filter(mes =>
    mes.text.includes(req.query.text)
  );
  res.send(messagesContainText);
});

app.get("/messages/latest", (req, res) => {
  const topTenMessages = messages.slice(0, 10);
  res.send(topTenMessages);
});

app.get("/messages/:id", (req, res) => {
  const message = messages.find(mes => mes.id === parseInt(req.params.id));
  messageNotFound(message, res);
  res.send(message);
});

app.put("/messages/:id", (req, res) => {
  const message = messages.find(mes => mes.id === parseInt(req.params.id));
  messageNotFound(message, res);
  validateName(req, res);
  validateMessage(req, res);
  message.from = req.body.from;
  message.text = req.body.text;
  res.send(message);
});

app.delete("/messages/:id", (req, res) => {
  const message = messages.find(mes => mes.id === parseInt(req.params.id));
  messageNotFound(message, res);
  const index = messages.indexOf(message);
  messages.splice(index, 1);
  res.send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}...`);
});
