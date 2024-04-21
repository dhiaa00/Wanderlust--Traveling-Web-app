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
