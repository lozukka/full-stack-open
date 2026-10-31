require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();

// --- Mongo part: connection + model
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

// --- Middleware

app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (request) => JSON.stringify(request.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.use(cors());

// --- Routes

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = Person.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${Person.length} people.</p>
    <p>${new Date()}</p>`);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = Person.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
