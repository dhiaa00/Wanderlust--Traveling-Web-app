const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Agency = require('./mongooseagencyuser');

const app = express();
const port = 3000;
// Middleware pour analyser les données POST
app.use(bodyParser.json());

// Route POST pour la création d'une agence de voyage
app.post('/agencies', async (req, res) => {
    try {
        // Créer une nouvelle instance de l'agence de voyage avec les données reçues
        const newAgency = new Agency({
            agencyName: req.body.agencyName,
            registrationNumber: req.body.registrationNumber,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            website: req.body.website,
            location: req.body.location,
            // Autres champs spécifiques à l'agence de voyage...
        });

        // Enregistrer l'agence de voyage dans la base de données
        const savedAgency = await newAgency.save();

        res.status(201).json("L'agence a été sauvgarder avec succès"); // Répondre avec l'agence de voyage créée
    } catch (error) {
        res.status(400).json({ message: error.message }); // Gérer les erreurs
    }
});

app.get('/agencies', async (req, res) => {
    try {
        // Récupérer toutes les agences de voyage de la base de données
        const agencies = await Agency.find();

        res.json(agencies); // Répondre avec la liste des agences de voyage
    } catch (error) {
        res.status(500).json({ message: error.message }); // Gérer les erreurs
    }
});

// Connectez-vous à MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Démarrer le serveur Express
        app.listen(port, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
