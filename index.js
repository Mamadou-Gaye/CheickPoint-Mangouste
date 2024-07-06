// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

// Importer mongoose
const mongoose = require('mongoose');

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

// Exporter le modèle Person pour l'utiliser dans d'autres fichiers
module.exports = Person;

// Fonction pour créer et sauvegarder une nouvelle personne
const createAndSavePerson = () => {
    const person = new Person({
      name: 'John Doe',
      age: 25,
      favoriteFoods: ['Pizza', 'Burger']
    });
  
    // Sauvegarder la personne dans la base de données
    person.save((err, data) => {
      if (err) {
        console.error('Erreur lors de la sauvegarde de la personne', err);
      } else {
        console.log('Personne sauvegardée avec succès', data);
      }
    });
  };
  
  // Appeler la fonction pour créer et sauvegarder la personne
  createAndSavePerson();

  // Fonction pour créer plusieurs personnes
const createManyPeople = () => {
    const arrayOfPeople = [
      { name: 'Ben Lahmer', age: 26, favoriteFoods: ['Couscous'] },
      { name: 'Kefi Seif', age: 15, favoriteFoods: ['Pizza'] },
      { name: 'Fatnassi Sarra', age: 40, favoriteFoods: ['Pasta'] },
      { name: 'Ben Yahia Rym', age: 4, favoriteFoods: ['Candy'] },
      { name: 'Cherif Sami', age: 3, favoriteFoods: ['Ice Cream'] }
    ];
  
    // Utiliser Model.create() pour insérer plusieurs documents en une seule fois
    Person.create(arrayOfPeople, (err, people) => {
      if (err) {
        console.error('Erreur lors de la création de personnes', err);
      } else {
        console.log('Personnes créées avec succès', people);
      }
    });
  };
  
  // Appeler la fonction pour créer plusieurs personnes
  createManyPeople();

  // Fonction pour trouver des personnes par leur nom
const findPeopleByName = (personName) => {
    // Utiliser Model.find() pour rechercher des documents correspondant au critère
    Person.find({ name: personName }, (err, people) => {
      if (err) {
        console.error('Erreur lors de la recherche de personnes par nom', err);
      } else {
        console.log('Personnes trouvées par nom', people);
      }
    });
  };
  
  // Appeler la fonction pour trouver des personnes par nom
  findPeopleByName('Ben Lahmer');

  // Fonction pour trouver une personne par un aliment favori
const findOneByFavoriteFood = (food) => {
    // Utiliser Model.findOne() pour rechercher un document correspondant au critère
    Person.findOne({ favoriteFoods: food }, (err, person) => {
      if (err) {
        console.error('Erreur lors de la recherche de personne par nourriture favorite', err);
      } else {
        console.log('Personne trouvée par nourriture favorite', person);
      }
    });
  };
  
  // Appeler la fonction pour trouver une personne par nourriture favorite
  findOneByFavoriteFood('Pizza');

  // Fonction pour trouver une personne par son ID
const findPersonById = (personId) => {
    // Utiliser Model.findById() pour rechercher un document par son ID
    Person.findById(personId, (err, person) => {
      if (err) {
        console.error('Erreur lors de la recherche de personne par ID', err);
      } else {
        console.log('Personne trouvée par ID', person);
      }
    });
  };
  
  // Remplacez <person_id> par un ID réel
  // Appeler la fonction pour trouver une personne par ID
  findPersonById('<person_id>');

  // Fonction pour trouver, éditer et sauvegarder une personne par son ID
const findEditThenSave = (personId) => {
    // Utiliser Model.findById() pour rechercher un document par son ID
    Person.findById(personId, (err, person) => {
      if (err) {
        console.error('Erreur lors de la recherche de personne par ID', err);
      } else {
        // Ajouter 'hamburger' à la liste des aliments préférés
        person.favoriteFoods.push('hamburger');
  
        // Sauvegarder la personne mise à jour dans la base de données
        person.save((err, updatedPerson) => {
          if (err) {
            console.error('Erreur lors de la sauvegarde de la personne mise à jour', err);
          } else {
            console.log('Personne mise à jour avec succès', updatedPerson);
          }
        });
      }
    });
  };
  
  // Remplacez <person_id> par un ID réel
  // Appeler la fonction pour trouver, éditer et sauvegarder une personne par ID
  findEditThenSave('<person_id>');

  // Fonction pour trouver et mettre à jour une personne par son nom
const findAndUpdate = (personName) => {
    // Utiliser Model.findOneAndUpdate() pour rechercher et mettre à jour un document
    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }, // Renvoie le document mis à jour
      (err, updatedPerson) => {
        if (err) {
          console.error('Erreur lors de la mise à jour de la personne', err);
        } else {
          console.log('Personne mise à jour avec succès', updatedPerson);
        }
      }
    );
  };
  
  // Appeler la fonction pour trouver et mettre à jour une personne par nom
  findAndUpdate('Kefi Seif');

  // Fonction pour supprimer une personne par son ID
const removeById = (personId) => {
    // Utiliser Model.findByIdAndRemove() pour rechercher et supprimer un document par son ID
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
      if (err) {
        console.error('Erreur lors de la suppression de la personne par ID', err);
      } else {
        console.log('Personne supprimée avec succès', removedPerson);
      }
    });
  };
  
  // Remplacez <person_id> par un ID réel
  // Appeler la fonction pour supprimer une personne par ID
  removeById('<person_id>');

  // Fonction pour supprimer plusieurs personnes par leur nom
const removeManyPeople = () => {
    // Utiliser Model.remove() pour supprimer des documents correspondant au critère
    Person.remove({ name: 'Mary' }, (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression de personnes par nom', err);
      } else {
        console.log('Personnes supprimées avec succès', result);
      }
    });
  };
  
  // Appeler la fonction pour supprimer de nombreuses personnes par nom
  removeManyPeople();

  // Fonction pour rechercher, trier, limiter et sélectionner des personnes par critère
const queryChain = () => {
    Person.find({ favoriteFoods: 'burritos' }) // Rechercher les personnes qui aiment les burritos
      .sort({ name: 1 }) // Trier par nom (ordre croissant)
      .limit(2) // Limiter les résultats à deux documents
      .select('-age') // Masquer le champ age
      .exec((err, data) => {
        if (err) {
          console.error('Erreur lors de la recherche de personnes', err);
        } else {
          console.log('Résultats de la recherche', data);
        }
      });
  };
  
  // Appeler la fonction pour exécuter la chaîne de requêtes
  queryChain();

  