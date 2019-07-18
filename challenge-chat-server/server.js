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
  if (!req.body.from || req.body.from < 3)
    return res
      .status(400)
      .send("Name is required and should be minimum 3 characters");
  if (!req.body.text) return res.status(400).send("Please, write a message");
  messages.push(message);

  res.send(message);
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages/:id", (req, res) => {
  const message = messages.find(mes => mes.id === parseInt(req.params.id));
  if (!message)
    return res
      .status(404)
      .send("Sorry! Message with the given ID was not found");
  res.send(message);
});

app.delete("/messages/:id", (req, res) => {
  const message = messages.find(mes => mes.id === parseInt(req.params.id));
  if (!message)
    return res
      .status(404)
      .send("Sorry! Message with the given ID was not found");
  const index = messages.indexOf(message);
  messages.splice(index, 1);
  res.send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listen on port ${port}...`);
});
