import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/config';

function Restaurant() {
    const { id } = useParams();
    const [formData, setFormData] = useState({ date: '', time: '', people: '' });
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
            setErrorMessage('Não foi possível completar a reserva. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Faça sua Reserva</h1>
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="number"
                        placeholder="Número de pessoas"
                        value={formData.people}
                        onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                        required
                        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                        Reservar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Restaurant;
