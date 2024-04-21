const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware pour analyser les données POST
app.use(bodyParser.json());


// Routes pour les événements de voyage
const Event = require('./mongoosecreationevent');
app.post('/events', async (req, res) => {
    try {
        const eventData = req.body;
        
        // Création d'un nouvel événement avec les données reçues
        const newEvent = new Event({
            about: eventData.about,
            name: eventData.name,
            startdate: eventData.startdate,
            enddate: eventData.enddate,
            startTime: eventData.startTime,
            endTime: eventData.endTime,
            location:eventData.location,
            place: {
                from: eventData.placeFrom,
                to: eventData.placeTo,
            }
        });
        
        // Enregistrer l'événement dans la base de données
        await newEvent.save();

        res.status(201).json({ message: 'Événement créé avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/events', async (req, res) => {
    try {
        // Récupérer tous les événements de la base de données
        const events = await Event.find();
        
        // Répondre avec la liste des événements
        res.json(events);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ message: error.message });
    }
});

// Route PUT pour modifier un événement de voyage
app.put('/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const eventData = req.body;

        // Rechercher l'événement par ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Événement introuvable' });
        }

        // Mettre à jour les champs modifiables de l'événement
        if (eventData.about) {
            event.about = eventData.about;
        }
        if (eventData.name) {
            event.name = eventData.name;
        }
        if (eventData.startdate) {
            event.startdate = eventData.startdate;
        }
        if (eventData.enddate) {
            event.enddate = eventData.enddate;
        }
        if (eventData.startTime) {
            event.startTime = eventData.startTime;
        }
        if (eventData.endTime) {
            event.endTime = eventData.endTime;
        }
        if (eventData.location) {
            event.location = eventData.location;
        }
        if (eventData.placeFrom) {
            event.place.from = eventData.placeFrom;
        }
        if (eventData.placeTo) {
            event.place.to = eventData.placeTo;
        }

        // Enregistrer les modifications dans la base de données
        const updatedEvent = await event.save();

        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route GET pour récupérer un événement par son ID
app.get('/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Rechercher l'événement par ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Événement introuvable' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Connexion à MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Démarrer le serveur Express
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });