import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/restaurants')
            .then((response) => setRestaurants(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Restaurants</h1>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <Link to={`/restaurant/${restaurant.id}`}>
                            {restaurant.name} - {restaurant.location}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
