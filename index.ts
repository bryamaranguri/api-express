import express, { Request, Response } from 'express';
const app = express();
const PORT = 3001;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

interface Person {
  id: number;
  name: string;
  number: string;
}

let persons: Person[] = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
];



app.get('/api/persons', (req: Request, res: Response) => {
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

app.get('/api/persons/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});


app.delete('/api/persons/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});




