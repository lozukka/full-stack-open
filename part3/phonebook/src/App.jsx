import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "../components/Notification";
import "./index.css";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleInputChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleInputChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => removePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newMessage, setNewMessasge] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    console.log("effect");
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      if (
        !window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        return;
      }

      const changedPerson = { ...existingPerson, number: newNumber };

      personService
        .replace(existingPerson.id, changedPerson)
        .then((response) => {
          setPersons(
            persons.map((p) =>
              p.id !== existingPerson.id ? p : response.data,
            ),
          );
          setNewName("");
          setNewNumber("");

          setNewMessasge(`${response.data.name} number replaced.`);
          setTimeout(() => {
            setNewMessasge(null);
          }, 5000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${existingPerson.name} has already been removed from server`,
          );
          setPersons(persons.filter((p) => p.id !== existingPerson.id));
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      return;
    }

    const personObject = { name: newName, number: newNumber };

    personService.create(personObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");

      setNewMessasge(`${response.data.name} added to phonebook.`);
      setTimeout(() => {
        setNewMessasge(null);
      }, 50000);
    });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()),
  );

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const removePerson = (id) => {
    console.log("person " + id + " needs to be removed");
    const person = persons.find((p) => p.id === id);

    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    personService.remove(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <div>
        <Filter value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
