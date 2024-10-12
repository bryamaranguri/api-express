import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(morgan('tiny'));


morgan.token('body', (req: Request) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});


// Ruta para obtener información sobre la agenda
app.get('/info', (req, res) => {
  const date = new Date();  // Obtiene la fecha y hora actual
  res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = persons.findIndex(p => p.id === id);

  if (index !== -1) {
    persons.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});


app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  const personExists = persons.some(p => p.name === name);
  if (personExists) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 100000),
    name,
    number
  };

  persons.push(newPerson);
  res.json(newPerson);
});

