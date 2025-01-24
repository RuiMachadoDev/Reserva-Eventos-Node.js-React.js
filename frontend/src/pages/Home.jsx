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
        <div>
            <h1>Restaurants</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        {restaurant.name} - {restaurant.location} ({restaurant.cuisine}){' '}
                        <Link to={`/restaurant/${restaurant.id}`}>Reservar</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
