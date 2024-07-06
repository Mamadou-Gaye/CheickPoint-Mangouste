// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialiser l'application Express
const app = express();

// Utiliser CORS pour permettre les requêtes cross-origin
app.use(cors());

// Middleware pour parser le JSON
app.use(express.json());

// Se connecter à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB', err));

// Définir le schéma et le modèle de la personne
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// Route pour créer une personne
app.post('/api/people', (req, res) => {
  const newPerson = new Person(req.body);
  newPerson.save((err, savedPerson) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(savedPerson);
  });
});

// Route pour obtenir toutes les personnes
app.get('/api/people', (req, res) => {
  Person.find({}, (err, people) => {
    if (err) return res.status(500).send(err);
    res.json(people);
  });
});

// Route pour obtenir une personne par son ID
app.get('/api/people/:id', (req, res) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return res.status(500).send(err);
    if (!person) return res.status(404).send('Personne non trouvée');
    res.json(person);
  });
});

// Route pour mettre à jour une personne par son ID
app.put('/api/people/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPerson) => {
    if (err) return res.status(500).send(err);
    res.json(updatedPerson);
  });
});

// Route pour supprimer une personne par son ID
app.delete('/api/people/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, deletedPerson) => {
    if (err) return res.status(500).send(err);
    res.json(deletedPerson);
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});