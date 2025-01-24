import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api/config';

function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/restaurants`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRestaurants(response.data);
            } catch (err) {
                console.error('Erro ao buscar restaurantes:', err);
                setError('Não foi possível carregar os restaurantes.');
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Restaurantes</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                    <li
                        key={restaurant.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-bold text-gray-800">{restaurant.name}</h2>
                        <p className="text-gray-600">{restaurant.location}</p>
                        <p className="text-gray-600 italic">{restaurant.cuisine}</p>
                        <Link
                            to={`/restaurant/${restaurant.id}`}
                            className="block mt-4 text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Reservar
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
