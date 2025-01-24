import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/config';

function Restaurant() {
    const { id } = useParams(); // Obtém o ID do restaurante da URL
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        people: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/restaurants/${id}/reservations`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSuccessMessage('Reserva feita com sucesso!');
            setFormData({ date: '', time: '', people: '' });
        } catch (err) {
            console.error('Erro ao fazer reserva:', err);
            setErrorMessage('Não foi possível completar a reserva. Tente novamente.');
        }
    };

    return (
        <div>
            <h1>Faça a sua Reserva</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
                <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Número de pessoas"
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    required
                />
                <button type="submit">Reservar</button>
            </form>
        </div>
    );
}

export default Restaurant;
