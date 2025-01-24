const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');
const db = require('../models/db');

// Rota para listar todos os restaurantes
router.get('/', authenticateToken, (req, res) => {
    db.query('SELECT * FROM restaurants', (err, results) => {
        if (err) {
            console.error('Erro ao buscar restaurantes:', err);
            return res.status(500).json({ error: 'Erro ao buscar restaurantes' });
        }
        res.status(200).json(results);
    });
});

// Rota para fazer uma reserva
router.post('/:id/reservations', authenticateToken, (req, res) => {
    const restaurantId = req.params.id;
    const { date, time, people } = req.body;
    const userId = req.user.id;

    db.query(
        'INSERT INTO reservations (restaurant_id, customer_name, date, time, people) VALUES (?, ?, ?, ?, ?)',
        [restaurantId, req.user.email, date, time, people],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Reservation created successfully' });
        }
    );
});

module.exports = router;
