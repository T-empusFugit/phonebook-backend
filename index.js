require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

// morgan.token("body", function (req, res) {
//   return JSON.stringify(req.body);
// });
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  const amountPersons = persons.length;
  const info = `<p>Phonebook has info for ${amountPersons} people</p>`;
  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // if (!person.name) {
  //   return response.status(400).json({
  //     error: "name missing",
  //   });
  // }

  // if (!person.number) {
  //   return response.status(400).json({
  //     error: "number missing",
  //   });
  // }

  // if (persons.map((person) => person.name).includes(person.name)) {
  //   return response.status(400).json({
  //     error: "name already in phonebook",
  //   });
  // }

  // const id = Math.floor(Math.random() * 100);
  // person.id = String(id);

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// persons = persons.concat(person);

// response.json(person);
// });

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
